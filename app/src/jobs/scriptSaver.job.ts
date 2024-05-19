import fs from "fs";
import { rosStoragePath } from "../global/variables.global";

export default async function scriptSaver() {
  const py = await fs.readFileSync("./app/src/scripts/waypoint.py", "utf8");

  await fs.writeFileSync(`${rosStoragePath}/waypoint.py`, py);
}
