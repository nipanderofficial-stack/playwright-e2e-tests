import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

function readCSV(filePath: string): any[] {
  const csvDataStr = fs.readFileSync(filePath, { encoding: "utf-8" });

  const csvDataArr = parse(csvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return csvDataArr;
}

export default readCSV;