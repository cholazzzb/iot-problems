import { config } from "dotenv";
config();
import express from "express";
import httpStatusCode from "http-status-codes";
import { getMergedSalary } from "./manager.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
  const response = await getMergedSalary();
  res.status(httpStatusCode.StatusCodes.OK).json(response);
});

app.listen(port, () => {
  console.log(`ready - problem1 is running on http://localhost:${port}`);
});