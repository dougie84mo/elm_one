import path from "path";
import fs from "fs";



export class FileHandler {
    static ASSET_DIRECTORY = "../../../../../../../../assets/";
    static C = "configs";

    static getConfigFile(fileName) {
        return path.join(__dirname, FileHandler.ASSET_DIRECTORY, FileHandler.C, fileName);
    }

    static getScrapersJson() {
        return SYNC_ELMFILE.ReadFileToJson(FileHandler.getConfigFile('scrapers.json'));
    }

    static getScraperJson(id) {
        const scrapers =  FileHandler.getScrapersJson();
        // eslint-disable-next-line no-prototype-builtins
        return typeof scrapers === "object" && scrapers.hasOwnProperty(id) ? scrapers[id] : false;
    }
}

export const SYNC_ELMFILE = {
    "ReadFileToJson" : (filePathName) => {
        // console.log(filePathName); let fileContents = await fs.readFile(filePathName); return
        // JSON.parse(fileContents);
        const i = fs.readFileSync(filePathName, (err, data) => {
            return data;
        });
        if (typeof i === "object") {
            return JSON.parse(i.toString());
        }
    },
};

