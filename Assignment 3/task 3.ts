import { stat, readdir } from "fs/promises";
import pathM from "path";

/**
 * the getFileType() returns the path type like "FILE" | "DIRECTORY" | "OTHER". Here we use the async/await with try and catch.
 * @param path takes in the absolute path of a file or a folder
 * @returns the path is a File or a folder
 */
async function getFileType(
  path: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  try {
    const stats = await stat(path);
    if (stats.isFile()) return "FILE";
    if (stats.isDirectory()) return "DIRECTORY";
    return "OTHER";
  } catch (error) {
    throw new Error("file system error", { cause: error });
  }
}

/**
 * the getContens() returns the folder contents or the path of the file. Here we use the async/await with try and catch.
 * @param path takes in the absolute path of a file or a folder
 * @returns if the path is a file then it returns the path, if it is directory it acts like the 'ls' command used in linux systems
 */
async function getContents(path: string): Promise<string | string[]> {
  try {
    const type = await getFileType(path);
    if (type === "FILE") return path;
    if (type === "DIRECTORY") {
      const files = await readdir(path);
      return files;
    }
    return path;
  } catch (error) {
    throw new Error("file system error", { cause: error });
  }
}

/**
 * the getSize() returns the size of the file or the folder of the given path in bytes.Here we use the async/await with try and catch.
 * @param path takes in the absolute path of a file or a folder
 * @returns returns the size of the file or the folder of the given path in bytes
 */
async function getSize(path: string): Promise<number> {
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    throw new Error("file system error", { cause: error });
  }
  if (stats.isFile()) {
    return stats.size;
  }
  if (stats.isDirectory()) {
    try {
      const files = await readdir(path);
      let tSize = 0;
      for (const file of files) {
        const fpath = pathM.join(path, file);
        tSize += await getSize(fpath);
      }

      return tSize;
    } catch (error) {
      throw new Error("file system error", { cause: error });
    }
  }
  return 0;
}

//console based testing
const tpath =
  "/mnt/c/Users/Tejas/Desktop/internship/task/cc-7-Tejas/Assignment 3/task 1.ts";
getFileType(tpath)
  .then((type) => {
    console.log("Type:", type);
    return getContents(tpath);
  })
  .then((contents) => {
    console.log(contents);
    return getSize(tpath);
  })
  .then((size) => {
    console.log("Total Size: ", size);
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
