import express, { Request, Response, NextFunction } from "express";
import env from "./src/providers/environmentProvider";
import appRouters from "./src/routes/app.routes";
import bodyParser from "body-parser";
import cors from "cors";

function app() {
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

  const server = app.listen(env.robot.port, async function () {
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
