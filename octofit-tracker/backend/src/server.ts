import cors from 'cors';
import express from 'express';
import './config/database.js';
import { apiBaseUrl, frontendOrigins } from './config/api.js';
import { activities, leaderboard, teams, users, workouts } from './models/index.js';
import { createCollectionRouter } from './routes/collections.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors({ origin: frontendOrigins }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/', (_request, response) => {
  response.json({
    baseUrl: apiBaseUrl,
    endpoints: ['users', 'teams', 'activities', 'leaderboard', 'workouts'].map(
      (resource) => `${apiBaseUrl}/api/${resource}/`,
    ),
  });
});

app.use('/api/users', createCollectionRouter(users));
app.use('/api/teams', createCollectionRouter(teams));
app.use('/api/activities', createCollectionRouter(activities));
app.use('/api/leaderboard', createCollectionRouter(leaderboard));
app.use('/api/workouts', createCollectionRouter(workouts));

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});