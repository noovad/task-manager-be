import express from "express";
import registerRoutes from "./routes/routes";
import cors from 'cors';
import { PORT } from "./configs/env";

const app = express();

app.use(cors());
app.use(express.json());

registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
