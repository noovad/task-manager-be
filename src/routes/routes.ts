import express from 'express';
import taskRoute from './taskRoute';
import projectRoute from './projectRoute';

export default function registerRoutes(app: express.Application) {
  app.use('/hello', (req, res) => {
    res.status(200).json({
      message: 'Hello World',
    });
  });
  app.use('/', taskRoute);
  app.use('/', projectRoute);
  app.use((req, res) => {
    res.status(404).json({
      message: `Cannot find ${req.originalUrl} on this server`,
    });
  });
}
