import mongoose from 'mongoose';
import { activities, leaderboard, teams, users, workouts } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedData = {
  users: [
    {
      username: 'maya.rivera',
      name: 'Maya Rivera',
      email: 'maya.rivera@mergington.edu',
      role: 'student',
      team: 'Octo Ninjas',
      fitnessLevel: 'advanced',
      points: 520,
    },
    {
      username: 'jordan.lee',
      name: 'Jordan Lee',
      email: 'jordan.lee@mergington.edu',
      role: 'student',
      team: 'Cardio Crew',
      fitnessLevel: 'intermediate',
      points: 430,
    },
    {
      username: 'sam.patel',
      name: 'Sam Patel',
      email: 'sam.patel@mergington.edu',
      role: 'student',
      team: 'Flex Force',
      fitnessLevel: 'beginner',
      points: 310,
    },
    {
      username: 'paul.octo',
      name: 'Paul Octo',
      email: 'paul.octo@mergington.edu',
      role: 'coach',
      team: 'Octo Ninjas',
      fitnessLevel: 'advanced',
      points: 0,
    },
  ],
  teams: [
    {
      name: 'Octo Ninjas',
      mascot: 'Octopus',
      coach: 'Paul Octo',
      memberCount: 12,
      weeklyGoalMinutes: 1800,
      totalPoints: 1840,
    },
    {
      name: 'Cardio Crew',
      mascot: 'Lightning Bolt',
      coach: 'Jessica Cat',
      memberCount: 10,
      weeklyGoalMinutes: 1500,
      totalPoints: 1605,
    },
    {
      name: 'Flex Force',
      mascot: 'Kettlebell',
      coach: 'Alex Morgan',
      memberCount: 9,
      weeklyGoalMinutes: 1350,
      totalPoints: 1320,
    },
  ],
  activities: [
    {
      username: 'maya.rivera',
      type: 'trail run',
      durationMinutes: 42,
      intensity: 'high',
      pointsEarned: 95,
      completedAt: new Date('2026-09-23T16:30:00Z'),
    },
    {
      username: 'jordan.lee',
      type: 'cycling',
      durationMinutes: 55,
      intensity: 'moderate',
      pointsEarned: 85,
      completedAt: new Date('2026-09-24T15:45:00Z'),
    },
    {
      username: 'sam.patel',
      type: 'strength circuit',
      durationMinutes: 30,
      intensity: 'moderate',
      pointsEarned: 60,
      completedAt: new Date('2026-09-25T14:20:00Z'),
    },
    {
      username: 'maya.rivera',
      type: 'yoga recovery',
      durationMinutes: 25,
      intensity: 'low',
      pointsEarned: 35,
      completedAt: new Date('2026-09-26T12:00:00Z'),
    },
  ],
  leaderboard: [
    {
      rank: 1,
      username: 'maya.rivera',
      team: 'Octo Ninjas',
      totalPoints: 520,
      activeDays: 6,
    },
    {
      rank: 2,
      username: 'jordan.lee',
      team: 'Cardio Crew',
      totalPoints: 430,
      activeDays: 5,
    },
    {
      rank: 3,
      username: 'sam.patel',
      team: 'Flex Force',
      totalPoints: 310,
      activeDays: 4,
    },
  ],
  workouts: [
    {
      name: 'Starter Cardio Builder',
      level: 'beginner',
      focusArea: 'cardio endurance',
      durationMinutes: 25,
      exercises: ['brisk walk', 'step-ups', 'jumping jacks', 'cooldown stretch'],
    },
    {
      name: 'Balanced Strength Circuit',
      level: 'intermediate',
      focusArea: 'full-body strength',
      durationMinutes: 35,
      exercises: ['squats', 'push-ups', 'lunges', 'plank holds'],
    },
    {
      name: 'Advanced Agility Challenge',
      level: 'advanced',
      focusArea: 'speed and agility',
      durationMinutes: 45,
      exercises: ['shuttle runs', 'box jumps', 'burpees', 'ladder drills'],
    },
  ],
};

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      users.deleteMany({}),
      teams.deleteMany({}),
      activities.deleteMany({}),
      leaderboard.deleteMany({}),
      workouts.deleteMany({}),
    ]);

    await Promise.all([
      users.insertMany(seedData.users),
      teams.insertMany(seedData.teams),
      activities.insertMany(seedData.activities),
      leaderboard.insertMany(seedData.leaderboard),
      workouts.insertMany(seedData.workouts),
    ]);

    console.log(
      `Database seeding complete: ${seedData.users.length} users, ${seedData.teams.length} teams, ${seedData.activities.length} activities, ${seedData.leaderboard.length} leaderboard entries, ${seedData.workouts.length} workouts`,
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
