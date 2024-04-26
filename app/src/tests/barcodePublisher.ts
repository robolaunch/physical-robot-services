/* eslint-disable no-useless-escape */
import { exec } from "child_process";

const initialData = {
  robotId: 1,
  fleetId: 1,
  sensorId: 1,
  taskId: "1",
  waypoint: {
    x: 0,
    y: 0,
    z: 0,
    yaw: 0.0,
  },
};

let barcodes: string[] = [];

function commandGenerator(commandData: {
  robotId?: number;
  fleetId?: number;
  sensorId?: number;
  taskId?: string;
  x: number;
  y: number;
  z: number;
}) {
  return `ros2 topic pub --once /barcode std_msgs/msg/String '{\"data\": \"{\\\"robotId\\\": \\\"${
    commandData.robotId || initialData.robotId
  }\\\", \\\"fleetId\\\": \\\"${
    commandData.fleetId || initialData.fleetId
  }\\\", \\\"sensorId\\\": \\\"${
    commandData.sensorId || initialData.sensorId
  }\\\", \\\"barcode\\\": \\\"${randomBarcodeGenerator()}\\\", \\\"waypoint\\\": {\\\"x\\\": ${
    commandData.x
  }, \\\"y\\\": ${commandData.y}, \\\"z\\\": ${
    commandData.z
  }, \\\"yaw\\\": 0.0}, \\\"taskId\\\": \\\"${
    commandData.taskId || initialData.taskId
  }\\\"}\"}'`;
}

function randomBarcodeGenerator() {
  return Math.random().toString(36).substr(2, 8);
}

for (let x = 1; x < 1300; x++) {
  for (let y = 1; y < 1300; y++) {
    for (let z = 0; z < 6; z++) {
      const command = commandGenerator({
        x: initialData.waypoint.x + x,
        y: initialData.waypoint.y + y * 0.4,
        z: initialData.waypoint.z + z,
      });
      barcodes.push(command);
    }
  }
}

function runCommands() {
  if (barcodes.length === 0) {
    console.log("All commands executed!");
    return;
  }

  const command = barcodes.shift();

  console.log("WORK:", command);
  exec(command!, (error, stdout, stderr) => {
    if (error) {
      console.error(`JSERR: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
      return;
    }
    console.log(`STDOUT: ${stdout}`);
  });

  setTimeout(runCommands, 100);
}

runCommands();
