import { type FullConfig } from "@playwright/test";
import {exec} from "child_process";

export default async function globalTeardown(config: FullConfig) {
    //executed after all the workers complete. Cleanup tasks..
    console.log(`[INFO]: Starting the Global TearDown process...`);
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[INFO]: Detecting local run`);
    // await exec("allure serve",(error,stdout,stderr) => {
    //     if(error){
    //         console.log('ERROR: Starting Allure Serve:',error.message)
    //     }
    // });
  }
  console.log(`[INFO]: Global TearDown completed ...`)
}
