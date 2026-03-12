import { stat, readdir } from "fs/promises";
import pathM from "path";

/**
 * the getFileType() returns the path type like "FILE" | "DIRECTORY" | "OTHER". This uses the promise api enabling the chaining of methods like then and catch. This achieves asynchronous flow without using `async/await`.
 * @param path takes in the absolute path of a file or a folder
 * @returns the path is a File or a folder
 */
function getFileType(path: string): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return stat(path)
    .then((stats) => {
      if (stats.isFile()) return "FILE";
      if (stats.isDirectory()) return "DIRECTORY";
      return "OTHER";
    })
    .catch(() => {
      throw new Error("file system Error");
    });
}

/**
 * the getContens() returns the folder contents or the path of the file. This uses the promise api enabling the chaining of methods like then and catch. This achieves asynchronous flow without using `async/await`.
 * @param path takes in the absolute path of a file or a folder
 * @returns if the path is a file then it returns the path, if it is directory it acts like the 'ls' command used in linux systems
 */
function getContents(path: string): Promise<string | string[]> {
  return getFileType(path)
    .then<string | string[]>((type) => {
      if (type === "FILE") return path;
      if (type === "DIRECTORY") {
        return readdir(path);
      }
      return path;
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * the getSize() returns the size of the file or the folder of the given path in bytes.This uses the promise api enabling the chaining of methods like then and catch. This achieves asynchronous flow without using `async/await`.
 * @param path takes in the absolute path of a file or a folder
 * @returns returns the size of the file or the folder of the given path in bytes
 */
function getSize(path: string): Promise<number> {
  return stat(path)
    .then((stats) => {
      if (stats.isFile()) return stats.size;
      if (stats.isDirectory()) {
        return readdir(path).then((files) => {
          const sPromises = files.map((file) => {
            const fpath = pathM.join(path, file);
            return getSize(fpath);
          });
          return Promise.all(sPromises).then((sizes) => {
            return sizes.reduce((total, cSize) => total + cSize, 0);
          });
        });
      }
      return 0;
    })
    .catch(() => {
      throw new Error("file system error");
    });
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
