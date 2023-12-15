import rosBarcodeListenerJob from "./src/jobs/rosBarcodeListener.job";
import express, { Request, Response, NextFunction } from "express";
import rosTopicListenerJob from "./src/jobs/rosTopicListener.job";
import env from "./src/providers/environment.provider";
import logRouters from "./src/routes/log.routes";
import appRouters from "./src/routes/app.routes";
import bodyParser from "body-parser";
import cors from "cors";

async function app(): Promise<void> {
  const app = express();

  app.all("/*", function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.use(
    bodyParser.json(),
    cors({
      origin: "*",
    })
  );

  app.use("/", appRouters);

  app.use("/log", logRouters);

  const server = app.listen(env.robot.port, async function () {
    rosBarcodeListenerJob();
    setInterval(rosTopicListenerJob, 10000);
    console.log(
      `[Physical Robot Services] Service is running on port ${env.robot.port}`
    );
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("[Physical Robot Services] Service is shutting down");
      process.exit(0);
    });
  });
}

app();
