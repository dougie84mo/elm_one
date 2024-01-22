import path from "path";
// import {fileURLToPath} from "url";
// import ObjectsToCsv from "objects-to-csv";
import fs from "fs/promises";
// import crypto from "crypto";

export const INVIFILE = {
    "CreateDir": async  (d) => {
        try {
            await fs.mkdir(d);
        } catch (e) {
            console.log(`The directory ${d} was probably already created`);
        }
    },
    "CreateDirCheck": async (d) => {
        try {
            await fs.mkdir(d);
        } catch (e) {
            console.log(`The directory ${d} was probably already created`);
            return false;
        }
        return true;
    }
}



class FileParsingHandler {
    __ASSET_DIRECTORY = "../assets/"
    __DIRS = [
        'scraper',
        'profile'

    ]
    currentDir = false;

    constructor(directoryId=0) {
        if (typeof directoryId === "number" && this.__DIRS.length > directoryId) {
            this.currentDir = this.__DIRS[directoryId]
        }
    }

    get currentDirectory() {
        if (typeof this.currentDir === 'string' && "" !== this.currentDir) {
            return path.join(this.__ASSET_DIRECTORY, this.currentDir)
        }
        return this.__ASSET_DIRECTORY;
    }

    getDirectoryFilePath(fileName, subDirectory=false) {
        let currentDir = this.currentDirectory;
        if (typeof subDirectory === 'string' && "" !== subDirectory) {
            return path.join(currentDir, subDirectory, fileName)
        }
        return path.join(currentDir, fileName)
    }

    // static async asyncStringify(content) {
    //     return JSON.stringify(content);
    // }


}

export class SettingsHandler extends FileParsingHandler {


    getSettingsConfig() {

    }

    setSettingsConfig() {

    }

}


export class ConfigurationHandler extends FileParsingHandler{
    __ASSET_DIRECTORY = "../assets/configs/"
    constructor(directoryId) {
        super(directoryId)
    }


}

export class UploadHandler extends FileParsingHandler {
    __ASSET_DIRECTORY = "../assets/uploads/"
    currentBuildId;

    constructor(directoryId, currentBuildId = false) {
        super(directoryId)
        if (currentBuildId && typeof currentBuildId === "number") {
            this.currentBuildId = currentBuildId
        }
    }

    get currentBuildDirectory() {
        return path.join(this.currentDirectory, this.currentBuildId)
    }

}


