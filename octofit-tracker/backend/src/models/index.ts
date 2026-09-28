import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'coach'], default: 'student' },
  team: { type: String, required: true },
  fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  points: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  mascot: { type: String, required: true },
  coach: { type: String, required: true },
  memberCount: { type: Number, required: true },
  weeklyGoalMinutes: { type: Number, required: true },
  totalPoints: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });

const activitySchema = new Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, enum: ['low', 'moderate', 'high'], required: true },
  pointsEarned: { type: Number, required: true },
  completedAt: { type: Date, required: true },
}, { timestamps: true, versionKey: false });

const leaderboardSchema = new Schema({
  rank: { type: Number, required: true },
  username: { type: String, required: true },
  team: { type: String, required: true },
  totalPoints: { type: Number, required: true },
  activeDays: { type: Number, required: true },
}, { timestamps: true, versionKey: false });

const workoutSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  focusArea: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String, required: true }],
}, { timestamps: true, versionKey: false });

export const users = mongoose.model('User', userSchema, 'users');
export const teams = mongoose.model('Team', teamSchema, 'teams');
export const activities = mongoose.model('Activity', activitySchema, 'activities');
export const leaderboard = mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard');
export const workouts = mongoose.model('Workout', workoutSchema, 'workouts');