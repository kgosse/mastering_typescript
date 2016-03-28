// Example showing a test file for a definition file
import * as rimraf from "rimraf";

rimraf("C:\\Temp", (error: Error) => {});
rimraf.sync("C:\\Temp");
