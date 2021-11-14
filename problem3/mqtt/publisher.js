// MQTT publisher
import mqtt from "mqtt";

// SETUP
const PUSH_RATE = 0.1; // minutes

// INIT
var client = mqtt.connect("mqtt://localhost:1883");
const topics = [
  "room1/temperature",
  "room1/humidity",
  "room2/temperature",
  "room2/humidity",
  "room3/temperature",
  "room3/humidity",
  "room4/temperature",
  "room4/humidity",
  "room5/temperature",
  "room5/humidity",
];

client.on("connect", () => {
  setInterval(() => {
    topics.forEach((topic) => {
      const message = (20 + Math.floor(Math.random() * 5)).toString();
      client.publish(topic, message);

      console.log(`Message sent! topic:${topic}, message:${message}`);
    });
  }, PUSH_RATE * 60 * 1000);
});
