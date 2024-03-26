import path from "path";
import fs, {createWriteStream} from "fs";
import Axios from "axios";
import {TEMPUS} from "@/api/AsyncTools";





export class FileHandler {
    static ASSET_DIRECTORY = "../../../../../../../../assets/";
    static C = "configs";
    static __R = "runs";

    static getRunsDirectory(fileName) {
        return path.join(__dirname, FileHandler.ASSET_DIRECTORY, FileHandler.__R, fileName);
    }
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

    static saveNewScraperRun(id, fileConfig) {
        const runsFileName = FileHandler.getRunsDirectory(`${id}.json`);
        const runsFileDirectory = FileHandler.getRunsDirectory(id);
        if (!SYNC_ELMFILE.DirectoryExist(runsFileDirectory)) {
            SYNC_ELMFILE.CreateDir(runsFileDirectory)
        }
    }

    static getScraperRunInfo(id) {
        const runsFileName = FileHandler.getRunsDirectory(`${id}.json`);
        const runsFileDirectory = FileHandler.getRunsDirectory(id);

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
    "CreateDir": (dir, isDebug=false) => {
        try {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Creating directory ${dir}`)
            return true;
        } catch (e) {
            return false;
        }
    },
    "DirectoryExist": (dir, isDebug=false) => {
        try {
            fs.accessSync(dir, fs.constants.F_OK);
            return true;
        } catch (err) {
            return false;
        }
    }
};

/*export const SYNC_ELMFILE = {
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
*/

