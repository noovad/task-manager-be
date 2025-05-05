import express from "express";
import registerRoutes from "./src/routes/routes";
import dotenv from 'dotenv'

const app = express();
const port = process.env.PORT ;

dotenv.config()
app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
