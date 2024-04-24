import { getConfig } from "./config.function";
import fs from "fs/promises";
import path from "path";
import { IConfigLog } from "../types/types";

export default async function getRosLogs(): Promise<IConfigLog[] | null> {
  try {
    const allPaths = (await getConfig()).log.paths;
    const allFiles: IConfigLog[] = [];

    for (const folderPath of allPaths) {
      const files = await fs.readdir(folderPath);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileStat = await fs.stat(filePath);
        const isDirectory = fileStat.isDirectory();

        allFiles.push({
          name: file,
          isDirectory: isDirectory,
          path: filePath,
          size: isDirectory ? 0 : fileStat.size,
          createdAt: fileStat.birthtime.getTime(),
          updatedAt: fileStat.mtime.getTime(),
        });
      }
    }

    return allFiles;
  } catch (err) {
    console.error("[getRosLogs] Error while getting ROS logs.", err);
    return null;
  }
}
