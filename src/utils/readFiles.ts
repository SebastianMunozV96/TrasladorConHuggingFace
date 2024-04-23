import { readFile } from "fs/promises";

export async function readMyFile(filePath: string){
  return await readFile(filePath);
}