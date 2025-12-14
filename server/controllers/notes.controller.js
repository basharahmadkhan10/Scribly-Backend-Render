import { Note } from "../models/notes.models.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { google } from "googleapis";
import { oauth2Client } from "../googleAuth.js";


const createNote = asyncHandler(async (req, res) => {
  const { title, content, isPublic = false, startTime, endTime } = req.body;
  const userId = req.user._id;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  // 1. Create note in DB
  const note = await Note.create({
    title,
    content,
    isPublic,
    user: userId,
    startTime,
    endTime,
  });

  // 2. Fetch user from DB to get Google tokens
  const user = await User.findById(userId);

  if (
    user &&
    user.googleAccessToken &&
    user.googleRefreshToken &&
    startTime &&
    endTime
  ) {
    try {
      // Set credentials on oauth2Client
      oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken,
      });

      // Refresh token if needed
      const newToken = await oauth2Client.getAccessToken();
      if (newToken?.token) {
        await User.findByIdAndUpdate(userId, {
          googleAccessToken: newToken.token,
        });
      }

      const calendar = google.calendar({ version: "v3", auth: oauth2Client });

      const event = {
        summary: title,
        description: content,
        start: {
          dateTime: new Date(startTime).toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: new Date(endTime).toISOString(),
          timeZone: "Asia/Kolkata",
        },
      };

      const createdEvent = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
      });

      console.log("✅ Google Calendar event added:", createdEvent.data);
    } catch (error) {
      console.error("❌ Failed to sync with Google Calendar:", error.message);
    }
  } else {
    console.log("⚠️ Google sync skipped (missing tokens or start/end time).");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { note }, "Note created successfully"));
});

// ----------------------------------------------------
// GET MY NOTES
// ----------------------------------------------------
const getMyNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
  return res.status(200).json(new ApiResponse(200, notes));
});

// ----------------------------------------------------
// GET PUBLIC NOTES
// ----------------------------------------------------
const getPublicNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ isPublic: true }).sort({ updatedAt: -1 });
  return res.status(200).json(new ApiResponse(200, notes));
});

// ----------------------------------------------------
// GET SINGLE NOTE
// ----------------------------------------------------
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) throw new ApiError(404, "Note not found");
  return res.status(200).json(new ApiResponse(200, note));
});

// ----------------------------------------------------
// UPDATE NOTE
// ----------------------------------------------------
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, isPublic } = req.body;
  let note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) throw new ApiError(404, "Note not found");

  note.title = title ?? note.title;
  note.content = content ?? note.content;
  note.isPublic = isPublic ?? note.isPublic;

  await note.save();
  return res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

// ----------------------------------------------------
// DELETE NOTE + DELETE EVENT FROM GOOGLE CALENDAR
// ----------------------------------------------------
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) throw new ApiError(404, "Note not found");

  const user = await User.findById(req.user._id);

  if (user?.googleAccessToken && user?.googleRefreshToken && note.startTime) {
    try {
      oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken,
      });

      const calendar = google.calendar({ version: "v3", auth: oauth2Client });

      const searchRes = await calendar.events.list({
        calendarId: "primary",
        q: note.title,
        timeMin: new Date(note.startTime).toISOString(),
        maxResults: 5,
        singleEvents: true,
      });

      const eventToDelete = searchRes.data.items.find((event) => {
        const eventStart = new Date(
          event.start.dateTime || event.start.date
        ).getTime();
        const noteStart = new Date(note.startTime).getTime();
        return Math.abs(eventStart - noteStart) < 2000;
      });

      if (eventToDelete) {
        await calendar.events.delete({
          calendarId: "primary",
          eventId: eventToDelete.id,
        });
        console.log("🗑️ Deleted Google Calendar event");
      }
    } catch (err) {
      console.log(
        "⚠️ Google Calendar delete skipped (event not found or token expired)"
      );
    }
  }

  await Note.findByIdAndDelete(req.params.id);
  return res.status(200).json(new ApiResponse(200, null, "Note deleted"));
});

export {
  createNote,
  getMyNotes,
  getPublicNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
