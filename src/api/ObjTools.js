export const DEFAULT_FIELDS = {
    's': (tone = -2, msg='') => {return {tone, msg};},
    'message': (tone = -2, msg='') => {return {tone, msg};},
    'scraperFields': {'htmlFields': [], 'attrFields': [], 'fileFields': []},
    'secondScrapeOptions': {'scraperId': null, 'scraperUrlValue': '', 'isSecondaryScraper': false},
    'scraperUrl': (urls="https://", tags="") => { return {urls, tags};},
    'tags': (tagName="", tagType=0, tagValueCss="") => { return {tagName, tagType, tagValueCss};},
}
export const DEFAULT_OBJS = {
    'RunScraper': {
        name: "Full Scrape",
        id: "",
        scraperTags: [],
        scraperUrls: [],
        firstScraperRunScraper: {},
        scraperId: "",
        scrapersSnapshot: [],
        data: {},
    },
    'WebScraper': {
        name: 'New Scraper',
        id: "",
        type: 0,
        baseUrl: "https://",
        websiteName: "",
        scrapeContainer: "",
        hasApi: {apiUrlSchema: "https://", apiToken: ""},
        scraperTags : [DEFAULT_FIELDS.tags()],
        scraperUrls : [DEFAULT_FIELDS.scraperUrl()],
    },
    'Monitor': {
        name: 'New Monitor',
        id: "",
        details: "",
        type: 0,
        baseUrl: "https://",
        websiteName: "",
        scrapers: [],
        tasks: {}
    },
    'Task': {

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
            scraper.scraperTags.splice(++i, 0, DEFAULT_FIELDS.tags());
        },
        remove: (i) => {
            if (scraper.scraperTags.length > 1) scraper.scraperTags.splice(i, 1);
        },
        duplicate: (i, fields) => {
            console.log(fields);
            i++;scraper.scraperTags.splice(i, 0, fields);
        }
    };
}
