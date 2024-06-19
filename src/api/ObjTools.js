export const DEFAULT_FIELDS = {
    "def": {"_n": "", "_i": ""},
    "html": {"_n": "", "_i": ""},
    "text": {"_n": "", "_i": ""},
    "attr": {"_n": "", "_i": "", "_attr": ""},
    "param": {"_n": "", "_i": "", "_val": ""},
    "input": {"_n": "", "_i": "", "_param": {}},
    "buttonClick": {"_n": "", "_i": ""},
    "scroll": {"_n": "", "_i": ""}
}

export const DEFAULT_ITEMS = {
    's': (tone = -2, msg='') => {return {tone, msg};},
    'message': (tone = -2, msg='') => {return {tone, msg};},
    'tags': (tagName="", tagType=0, tagValueCss="") => { return {tagName, tagType, tagValueCss};},
    "actionNames": ["Initializer", "Monitor", "Scraper", "Raffle"],
    'taskType': {"Initialization": 0, "Monitor": 1, "Scraper": 2, "Raffle": 3},
    "actionTypeData": [
        {urls : "https://", tags: ""},
        {tagName: "", tagType: "", tagValueCss: ""},
        {tagName: "", tagType: "", tagValueCss: ""},
        {tagName: "", tagType: "", tagValueCss: ""},
    ],
    'requestType': {"Api": 0, "Web": 1},
    "runGroups": [],
    "profilingTypeData": [
        {profileName : "", profile: {}},
        {proxiesGroupName: "", "proxiesFile": "", proxyArray: []},
        {profileGroup: "",proxyArray: []},
    ],
    "loginParams": {0: "", "usernameField": "", "passwordField": "", "submitField": ""},
}




export const TABLE_RULE = (taction) => {
    return {
        addUrlTag: (i) => {
            const l = ++i;
            taction.taskActionData.splice(l, 0, DEFAULT_ITEMS.actionTypeData[0]);
        },
        remove: (i) => {
            if (taction.taskActionData.length > 1) taction.taskActionData.splice(i, 1);
        },
        duplicate: (i, fields) => {
            i++;taction.taskActionData = taction.taskActionData.splice(i, 0, fields);
        }
    };
}


export const DEFAULT_OBJS = {
    'RunTaskStaticGroup': {
        id: "",
        name: "Full Scrape",
        baseUrl: "https://",
        requestType: 0,
        runTags: [],
        runActionList: [],
        requiredLogin: {
            "isLogin": false, "loginUrl": "",
            "loginParams": DEFAULT_ITEMS.loginParams,"secondLoginParams": DEFAULT_ITEMS.loginParams,
            "username": ["", ""], "password": ["", ""]
        },
        apiInfo: {apiUrlSchema: "https://", apiToken: ""}
    },
    "RunAction": {
        id: "",
        debugMode: true,
        customRequestOptions: {},
        actionSnapshot: {},
        actionMapping: {},
        initRun: {
            runGroupDataName: "",
            runGroupVariable: "",
        }
    },
    "RunGroupData": {
        runGroupId: "0",
        data: {},
    },
    'TaskTypeAction': (defaultAction = 0) => {
        const taskActionDefault = DEFAULT_ITEMS.actionTypeData[defaultAction];
        // console.log(taskActionDefault);
        return {
            id: "0",
            actionName: DEFAULT_ITEMS.actionNames[defaultAction],
            actionTags: "",
            action: defaultAction,
            taskActionData: [taskActionDefault]
        }
    },
}
