import express from "express";
import registerRoutes from "./routes/routes";
import cors from 'cors';
import { PORT } from "./configs/env";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();

app.use(cors());
app.use(express.json());
registerRoutes(app);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
