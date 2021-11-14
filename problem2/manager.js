import fs from "fs";
import path from "path";
import { MedianFinder } from "./MedianFinder.js";

export const getAggregateData = async () => {
  try {
    let sensor_data = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "/problem2/sensor_data.json"))
    ).array;

    let roomData = {
      day: new Date(1593666000000).toLocaleDateString(),
      temperature: {
        min: Infinity,
        max: -Infinity,
        median: 0,
        numOfData: 0,
        sum: 0,
        avg: 0,
      },
      humidity: {
        min: Infinity,
        max: -Infinity,
        median: 0,
        numOfData: 0,
        sum: 0,
        avg: 0,
      },
    };

    let aggregate_data = {
      roomArea1: [],
      roomArea2: [],
      roomArea3: [],
    };
    for (let key in aggregate_data) {
      if (aggregate_data.hasOwnProperty(key)) {
        aggregate_data[key].push(roomData);
      }
    }

    let medianFinderTemp = new MedianFinder();
    let medianFinderHum = new MedianFinder();

    for (let dataIdx = 0; dataIdx < sensor_data.length; dataIdx++) {
      const data = sensor_data[dataIdx];

      const selectedData = aggregate_data[data.roomArea];

      let processedData = [...selectedData][selectedData.length - 1];

      if (processedData.day !== new Date(data.timestamp).toLocaleDateString()) {
        medianFinderTemp = new MedianFinder();
        medianFinderHum = new MedianFinder();

        medianFinderTemp.addNum(data.temperature);
        medianFinderHum.addNum(data.humidity);

        processedData = {
          day: new Date(data.timestamp).toLocaleDateString(),
          temperature: {
            min: data.temperature,
            max: data.temperature,
            median: medianFinderTemp.findMedian(),
            numOfData: 1,
            sum: data.temperature,
            avg: data.temperature,
          },
          humidity: {
            min: data.humidity,
            max: data.humidity,
            median: medianFinderHum.findMedian(),
            numOfData: 1,
            sum: data.humidity,
            avg: data.humidity,
          },
        };
        aggregate_data[data.roomArea].push(processedData);
      } else {
        // Temperature
        medianFinderTemp.addNum(data.temperature);
        processedData.temperature.min =
          data.temperature < processedData.temperature.min
            ? data.temperature
            : processedData.temperature.min;

        processedData.temperature.max =
          data.temperature > processedData.temperature.max
            ? data.temperature
            : processedData.temperature.max;

        processedData.temperature.numOfData += 1;
        processedData.temperature.sum =
          processedData.temperature.sum + data.temperature;
        processedData.temperature.avg =
          processedData.temperature.sum / processedData.temperature.numOfData;
        processedData.temperature.median = medianFinderTemp.findMedian();

        // Humidity
        medianFinderHum.addNum(data.humidity);

        processedData.humidity.min =
          data.humidity < processedData.humidity.min
            ? data.humidity
            : processedData.humidity.min;

        processedData.humidity.max =
          data.humidity > processedData.humidity.max
            ? data.humidity
            : processedData.humidity.max;
        processedData.humidity.numOfData += 1;

        processedData.humidity.sum = processedData.humidity.sum + data.humidity;
        processedData.humidity.avg =
          processedData.humidity.sum / processedData.humidity.numOfData;
        processedData.humidity.median = medianFinderTemp.findMedian();
        aggregate_data[data.roomArea][
          aggregate_data[data.roomArea].length - 1
        ] = processedData;
      }
    }
    return aggregate_data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
