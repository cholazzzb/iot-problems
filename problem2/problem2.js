import { config } from "dotenv";
config();
import express from "express";
import httpStatusCode from "http-status-codes";
import { getAggregateData } from "./manager.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
  console.info("GET /");
  const response = await getAggregateData();
  res.status(httpStatusCode.StatusCodes.OK).json(response);
});

app.listen(port, () => {
  console.log(`ready - problem2 is running on http://localhost:${port}`);
});