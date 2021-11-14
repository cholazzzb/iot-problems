import aedes from "aedes";
import { createServer } from "net";

const aedesObj = aedes();
const server = createServer(aedesObj.handle);
const port = 1883;

server.listen(port, function () {
  console.log("server started and listening on port ", port);
});

aedesObj.subscribe("room1", function (packet, cb) {
  console.log(`topic: room1, message: `, packet.payload.toString());
});

aedesObj.subscribe("room2", function (packet, cb) {
  console.log(`topic: room2, message: `, packet.payload.toString());
});

aedesObj.subscribe("room3", function (packet, cb) {
  console.log(`topic: room3, message: `, packet.payload.toString());
});

aedesObj.subscribe("room4", function (packet, cb) {
  console.log(`topic: room4, message: `, packet.payload.toString());
});

aedesObj.subscribe("room5", function (packet, cb) {
  console.log(`topic: room5, message: `, packet.payload.toString());
});
