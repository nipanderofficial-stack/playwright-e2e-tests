import { test } from "@playwright/test";
import chalk from "chalk";

type Level = "info" | "log" | "warn" | "error";

export async function log(level: Level, message:string){
    const plainLine = `[${level.toUpperCase()}]:${message}`;   //For allure
    let coloredLine = plainLine;

    //Pick color based on the log level
    switch(level){
        case "info":
            coloredLine = chalk.blue(plainLine);
            break;
        case "warn":
            coloredLine = chalk.yellow(plainLine);
            break;
        case "error":
            coloredLine = chalk.red(plainLine);
            break;
        default:
            coloredLine = chalk.white(plainLine);
    }

    //Print the colored line in terminal
    (console[level] || console.log)(coloredLine);

    //Send plain text to allure
    await test.step(plainLine, async() => {});
}
