import fs from "fs/promises";
import path from "path";

export default async function getRosLogs() {
  const directoryPath = `/home/${process.env.USER}/.ros/log/`;

  try {
    const files = await fs.readdir(directoryPath);

    const allFiles = await Promise.all(
      files.map(async (file: string) => {
        const filePath = path.join(directoryPath, file);
        const fileStat = await fs.stat(filePath);
        const isDirectory = fileStat.isDirectory();

        return {
          name: file,
          isDirectory: isDirectory,
          path: filePath,
          size: isDirectory ? 0 : fileStat.size,
          createdAt: fileStat.birthtime.getTime(),
          updatedAt: fileStat.mtime.getTime(),
        };
      })
    );

    return allFiles;
  } catch (err) {
    console.error("[getRosLogs] Error while getting ROS logs.");
    return null;
  }
}
