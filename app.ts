import express from "express";
import registerRoutes from "./src/routes/routes";
import cors from 'cors';
import { PORT } from "./src/configs/env";

const app = express();

app.use(cors());
app.use(express.json());

registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
