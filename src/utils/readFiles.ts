import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "fs/promises";
export async function readMyFile(filePath: string){
  return await readFile(filePath);
}
