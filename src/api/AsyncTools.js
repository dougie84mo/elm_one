import path from "path";
// import {fileURLToPath} from "url";
// import ObjectsToCsv from "objects-to-csv";
import fs from "fs/promises";
import {createWriteStream} from "fs";
import Axios from "axios";
import {FileHandler} from "@/api/FileTools";
// import crypto from "crypto";

export const TEMPUS = {
    "S": (seconds) => {new Promise(r => setTimeout(r, 1000*seconds))},
    "MS": (milliseconds) => {new Promise(r => setTimeout(r, milliseconds))},
    "NowSecond": () => Date.now(),
    "NowMilliSeconds": () => Math.floor(Date.now() /1000),
    "TimestampSeconds": (t) => Date.now() - t,
    "TimestampMilliseconds": (t) => Math.floor(Date.now() /1000) - t,
}

export const ELMFILE = {
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
    },
    "Exists": async (path) => {
        try {
            await fs.access(path);
        } catch {
            return false;
        }
        return true;
    },
    "ReadFileToJson" : async (filePathName) => {
        // console.log(filePathName); let fileContents = await fs.readFile(filePathName); return
        // JSON.parse(fileContents);
        const i = await fs.readFile(filePathName);
        if (typeof i === "object") {
            return JSON.parse(i.toString());
        }
    },
    "WriteToJsonFile": async (content, filePathName) => {
        // console.log(typeof content);
        if (typeof content === "object") {
            content = JSON.stringify(content);
        }
        await fs.writeFile(filePathName, content);
    },
    "ReadDirFilePushToDataJsonArray": async (directoryPath) => {
        let someArray = [];
        const fileList =  await fs.readdir(directoryPath);
        // if empty?
        for (const fileName of fileList) {
            try {
                let fullFilePath = path.join(directoryPath, fileName);
                someArray.push(await ELMFILE.ReadFileToJson(fullFilePath));
            } catch (e) {console.error(e);}
        }
        return someArray;
    },
    "StreamImageToDisk": async (url, filePath) => {
        const writer = createWriteStream(filePath),
            responseOptions = {url, method: 'GET', responseType: 'stream'},
            response = await Axios(responseOptions);

        if (response.status !== 404) {
            await TEMPUS.S(2);
            response.data.pipe(writer);
        }

        return new Promise((resolve, reject) => {
            response.data.on('end', resolve);
            response.data.on('error', reject);
        });

    }
}


export class BasicFileHandler {
    static ASSET_DIRECTORY = "../../../../../../../../assets/";
    static C = "configs";
    static async getScrapersJson() {
        return await ELMFILE.ReadFileToJson(FileHandler.getConfigFile('scrapers.json'));
    }
    static async getSpecificScrapersJson(id) {
        const scrapers = await BasicFileHandler.getScrapersJson();
        // eslint-disable-next-line no-prototype-builtins
        return typeof scrapers === "object" && scrapers.hasOwnProperty(id) ? scrapers[id] : false;
    }
    static async addToScraperFile(id, scraperArray) {
        let oldFileInfo = await BasicFileHandler.getScrapersJson();
        oldFileInfo[id] = scraperArray;
        // if (oldFileInfo.hasOwnProperty(id)) { // TODO if data is the same dont worry }
        await ELMFILE.WriteToJsonFile(oldFileInfo, FileHandler.getConfigFile('scrapers.json'))
    }



}



class FileParsingHandler {
    __ASSET_DIRECTORY = "../../../../../../../../assets/";
    __MAIN_SUB_DIRECTORIES = ['configs', 'runs', 'uploads'];
    __SUB_DIRECTORY = "";
    _contents;
    _filePath;


    getDirectoryFilePath(fileName, subDirectory= "") {
        let currentDir = super.__ASSET_DIRECTORY;
        if (typeof subDirectory === 'string' && "" !== subDirectory) {
            return path.join(currentDir, subDirectory, fileName)
        }
        return path.join(currentDir, fileName)
    }

    set setFileContents(contents) {
        this._contents = contents;
    }

    get getFileContents() {
        return this._contents;
    }

    setCurrentFile(fileName, subDirectory="") {
        if (subDirectory !== "") {
            this._filePath = path.join(__dirname, this.__ASSET_DIRECTORY, this.__SUB_DIRECTORY, subDirectory, fileName);
        } else {
            this._filePath = path.join(__dirname, this.__ASSET_DIRECTORY, this.__SUB_DIRECTORY, fileName);
        }
    }
    get filePath() {
        return this._filePath;
    }

    async saveContents() {
        await ELMFILE.WriteToJsonFile(this._contents, this._filePath);
    }

    async writeJSONFileToContents() {
        this._contents = await ELMFILE.ReadFileToJson(this._filePath);
        // console.log(this.__ASSET_DIRECTORY);
        // return await ELMFILE.ReadFileToJson(this._filePath);
    }
    get contents() {
        return this._contents;
    }



}

export class ProcessHandler extends FileParsingHandler {
    __SUB_DIRECTORY = "runs"

    constructor() {
        super();
    }

    test () {
        super.setCurrentFile('settings.json');
        return this._filePath;
    }


}


export class ConfigHandler extends FileParsingHandler{
    __SUB_DIRECTORY = 'configs';
    __OBJ_DIRECTORIES = ['monitors', 'profiles', 'scrapers'];
    constructor(subDirectory="") {
        super();
        if (subDirectory !== "" && this.__OBJ_DIRECTORIES.includes(subDirectory)) {
            this._subDirectory = subDirectory;
        } else {
            this.isSettings();
        }
    }

    isSettings () {
        this.setCurrentFile("settings.json");
    }

    async getSettingsConfig() {
        return await ELMFILE.ReadFileToJson(this._filePath);
    }

}

export const DEFAULT_FIELDS = {
    'message': (tone = -2, msg='') => {return {tone, msg};},
    'scraperFields': {'htmlFields': [], 'attrFields': [], 'fileFields': []},
    'secondScrapeOptions': {'scraperId': null, 'scraperUrlValue': '', 'isSecondaryScraper': false},
    'scraperUrl': (urls="https://", tags="") => { return {urls, tags};},
    'tags': (tagName="", tagType=0, tagValueCss="") => { return {tagName, tagType, tagValueCss};},
}
export const DEFAULT_OBJS = {
    'WebScraper': {
        name: 'New Scraper',
        type: 0,
        baseUrl: "https://",
        websiteName: "",
        scrapeContainer: "",
        scrapeGeneralTags : [DEFAULT_FIELDS.tags()],
        scraperUrls : [DEFAULT_FIELDS.scraperUrl()],
        secondaryScrape: DEFAULT_FIELDS.secondScrapeOptions
    },
    'ApiScraper': {
        name: 'New Api Scraper',
        type: 1,
        apiUrl: "https://",
        apiToken: "",
        lookupParams: [],
        scrapeGeneralTags : [DEFAULT_FIELDS.tags()],
        secondaryScrape: DEFAULT_FIELDS.secondScrapeOptions
    }
}

export const URL_TABLE = (scraper) => {
    return {
        add: (i) => {
            scraper.scraperUrls.splice(++i, 0, DEFAULT_FIELDS.scraperUrl());
        },
        remove: (i) => {
            if (scraper.scraperUrls.length > 1) scraper.scraperUrls.splice(i, 1);
        },
        duplicate: (i, fields) => {
            i++;scraper.scraperUrls.splice(i, 0, fields);
        }
    };
}

export const UTILITIES = {
    "DROP": (label, value, loc) => {return {label, value, loc, tog:"modal"};}
}

export const SCRAPER_TAG_TABLE = (scraper) => {
    return {
        add: (i) => {
            scraper.scrapeGeneralTags.splice(++i, 0, DEFAULT_FIELDS.tags());
        },
        remove: (i) => {
            if (scraper.scrapeGeneralTags.length > 1) scraper.scrapeGeneralTags.splice(i, 1);
        },
        duplicate: (i, fields) => {
            console.log(fields);
            i++;scraper.scrapeGeneralTags.splice(i, 0, fields);
        }
    };
}

//
// export const MSG = () => {
//     return {
//
//     }
// };

// export class UploadHandler extends FileParsingHandler {
//     __ASSET_DIRECTORY = "../assets/uploads/"
//     currentBuildId;
//
//     constructor(directoryId, currentBuildId = false) {
//         super(directoryId)
//         if (currentBuildId && typeof currentBuildId === "number") {
//             this.currentBuildId = currentBuildId
//         }
//     }
//
//     get currentBuildDirectory() {
//         return path.join(this.currentDirectory, this.currentBuildId)
//     }
//
// }


