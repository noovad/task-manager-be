import express from "express";
import taskRoute from "./taskRoute";

export default function registerRoutes(app: express.Application) {
    app.use('/', taskRoute);
}
