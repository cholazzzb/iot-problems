import fs from "fs";
import path from "path";
import { topics } from "./constant.js";

// SETUP (Change these values to suit your needs)
const PUSH_RATE = 2; // minutes

// MAIN
topics.forEach((topic) => {
  fs.openSync(path.join(process.cwd(), `/problem3/${topic}.txt`), "w");
});

setInterval(() => {
  topics.forEach((topic) => {
    const value = (20 + Math.floor(Math.random() * 5)).toString();

    var stream = fs.createWriteStream(
      path.join(process.cwd(), `/problem3/${topic}.txt`),
      { flags: "a" }
    );
    stream.write(
      `time: ${new Date().toLocaleTimeString()}, value: ${value}` + "\n"
    );

    console.log(`Success Logging! topic:${topic}, value:${value}`);
  });
}, PUSH_RATE * 60 * 1000);
