import fs from "fs";
import path from "path";
import { topics } from "./constant.js";
import { MedianFinder } from "./MedianFinder.js";
import { AverageFinder } from "./AverageFinder.js";

// SETUP (Change these values to suit your needs)
const TIME_INTERVAL = 15; // minutes

setInterval(() => {
  try {
    console.log(`TIME: ${new Date()}`);
    topics.forEach((topic) => {
      var data = fs
        .readFileSync(
          path.join(process.cwd(), `/problem3/${topic}.txt`),
          "utf8"
        )
        .toString();

      var processedData = data.split("\n");
      processedData.pop(); // remove text from creating file

      let min = Number(processedData[0].slice(-2));
      let max = Number(processedData[0].slice(-2));

      const medianFinder = new MedianFinder();
      const averageFinder = new AverageFinder();

      for (let dataIdx = 1; dataIdx < processedData.length; dataIdx++) {
        let data = Number(processedData[dataIdx].slice(-2));
        min = data < min ? data : min;
        max = data > max ? data : max;
        medianFinder.addNum(data);
        averageFinder.addNum(data);
      }
      console.log(
        `${topic}, Min: ${min}, Max: ${max}, Median: ${medianFinder.findMedian()}, Avg: ${averageFinder.findAverage()}`
      );
    });
    console.log("")
  } catch (e) {
    console.log("Error:", e.stack);
  }
}, TIME_INTERVAL * 60 * 1000);
