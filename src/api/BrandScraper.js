// const pup = require('puppeteer');
import puppeteer from "puppeteer";
import fs from "fs/promises";
import {Gmg_Async, URL_TYPE_CONFIG_CALLBACKS, PUPGMO, SAN, GmgBrowser} from "./SecondaryAsyncBackup.js";
import axios from "axios";
import path from "path";
import {fileURLToPath} from "url";
import * as process from "process";
import ObjectsToCsv from "objects-to-csv";
import csvToJson from "convert-csv-to-json";
import {ImageHelper} from "./ImageHelper.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename);
// console.log(__dirname);

const addAttr = function(title, value, i=0) {

    const ln = `Attribute ${i} name`,lv = `Attribute ${i} value(s)`,lis = `Attribute ${i} visible`,lg = `Attribute ${i} global`;
    return {[ln]: title, [lv]: value, [lis]: 1, [lg]: 1};
}

const addCat = function(parent, category) {
    return `${parent} > ${category}`;
}

export class GmgProductScraper {

    _products = [];
    _tempProducts = [];
    plistConfig;
    plistFields;
    ppageConfig;
    ppageFields;
    config;

    _UP_DIR = './uploads/';


    constructor(configurationJson, pargs) {
        this.processArguments = pargs;
        this.config = configurationJson;
        this.plistConfig = configurationJson["productList"];
        this.plistFields = Array.isArray(this.plistConfig) ? this.plistConfig[1] : this.plistConfig["fields"];
        if (configurationJson.hasOwnProperty("productPage")) {
            this.ppageConfig = configurationJson["productPage"] ;
            this.ppageFields = this.ppageConfig["fields"];
        }
    // TODO: CHANGE THIS TO ALLOW MULTIPLE CONFIGS and ALLOW JUST ARRAY IN productList etc
    }

    static launchOpts (headless=false) {
        return {headless: headless, ignoreHTTPSErrors: true, defaultViewport: null}
    }

    get BDIR () {
        return `${this._UP_DIR}${this.config["slug_name"]}`;
    }

    async init () {
        const browser = await puppeteer.launch(GmgProductScraper.launchOpts(false));
        const page = await browser.newPage();

        let BRAND_DIR = `${this._UP_DIR}/${this.config["slug_name"]}`;
        // console.log(`Brand Dir: ${BRAND_DIR}`);
        await Gmg_Async.createDir(BRAND_DIR);

        //TODO if the config file has baseUrls then go through each as a category,
        // Otherwise just us the baseUrl for each "wrapper"
        if (this.config.hasOwnProperty("baseUrls")) {
            let baseUrls = this.config["baseUrls"];
            console.log(baseUrls);
            for await (const [cat, url] of Object.entries(baseUrls)) {
                console.log(`Running category: ${cat} under URL: ${url}`);
                await this.productScrapeFromUrl(browser, page, this.plistConfig["wrapper"], url, cat);
            }
        } else {
            for (const category in this.plistConfig["wrapper"]) {
                await this.productScrapeFromUrl(browser, page, this.plistConfig["wrapper"][category], this.config["baseUrl"], category);
            }
        }

        if (this.config.hasOwnProperty('singleProductUrls')) {

        }

        await Gmg_Async._writeToFile(this._products, `${BRAND_DIR}/current_products.json`)
        if (this.processArguments.includes("--uploads")) {
            await this.initImages(false);
        }

        await this.importify(false);

        // TODO: Wrapper category used if baseUrls is not found
        process.exit();

        console.log(this._products);
    }

    async productScrapeFromUrl(browser, page, plistwrapper, url, cat) {

        // console.log(`Beginning Process: ${process.pid} PPID: ${process.ppid}`)

        await page.goto(url, {waitUntil: 'load', timeout: 0});
        await page.waitForSelector(plistwrapper);
        let productCards = await page.$$(plistwrapper);
        console.log(`Products found: ${productCards.length} in category ${cat}`);

        if (productCards.length !== 0) {
            let productCategories = await this.convertCategoryToTags(this.config, cat);

            // if (!this.plistFields.hasOwnProperty("productUrl")) {
            //     console.log("The product list config must have a productUrl Field");
            // }
            let BRAND_PATH = path.resolve(__dirname, this._UP_DIR, this.config["slug_name"]);
            console.log(`Brand Path: ${BRAND_PATH}`);


            let productNumber = 1;
            // let pathCallback = URL_TYPE_CONFIG_CALLBACKS[urlType];
            for (const e in productCards) {
                let productElement = productCards[e],
                    theProduct = {
                        "imageUrls": [],
                        "files": []
                    },
                    shouldGather = true;

                if (this.plistFields.hasOwnProperty("dont_gather")) {
                    //TODO: If there is a certain take that can stop you from gathering these items.
                    if (Array.isArray(this.plistFields["dont_gather"])) {
                        let no_gathers = this.plistFields["dont_gather"];
                        if (typeof no_gathers[0] === "string") {
                            shouldGather = await Gmg_Async.booleanCallback(productElement, this.plistFields["dont_gather"]);
                        } else if (typeof no_gathers[0] === "number") {
                            console.log(no_gathers);
                            if (no_gathers.includes(productNumber)) {
                                shouldGather = false;
                            }
                        }
                    }
                }

                if (shouldGather) {

                    // theProduct["name"] = await PUPGMO.innerText(productElement, this.plistFields["name"]);
                    if (this.plistFields.hasOwnProperty("name")) {
                        try {
                            theProduct["name"] = await PUPGMO.innerHtml(productElement, this.plistFields["name"]);
                            theProduct["slug"] = theProduct["name"].toLowerCase().replaceAll(" ", "-")
                                .replaceAll("™", "")
                                .replaceAll("®", "")
                                .replaceAll("/", "-")
                                .replaceAll(",", "_")
                                .replaceAll("\"", "")
                                .replaceAll("' ", " ft")
                            ;
                        } catch (e) {
                            theProduct["name"] = "None";
                        }
                    }

                    if (this.plistFields.hasOwnProperty("thumb")) {
                        // theProduct["thumbnailUrl"] = await Gmg_Async.propertyCallback(productElement, this.plistFields["thumb"])
                        try {
                            let thumbnailUrl = await Gmg_Async.propertyCallback(productElement, this.plistFields["thumb"]);
                            theProduct["imageUrls"].push(thumbnailUrl);
                            console.log(theProduct);
                        } catch (e) {
                            console.log(e)
                        }
                    }

                    if (this.plistFields.hasOwnProperty("short_tags")) {
                        theProduct["short_tags"] = await Gmg_Async.propertyCallback(productElement, this.plistFields["short_tags"]);
                    }
                    if (this.plistFields.hasOwnProperty("productId")) {
                        theProduct["productId"] = await Gmg_Async.propertyCallback(productElement, this.plistFields["productId"]);
                    }
                    if (this.plistFields.hasOwnProperty("description")) {
                        theProduct["description"] = await PUPGMO.innerText(productElement, this.plistFields["description"]);
                    }

                    if (this.plistFields.hasOwnProperty("short_description")) {
                        theProduct["short_description"] = await PUPGMO.innerText(productElement, this.plistFields["short_description"]);
                    }

                    if (this.plistFields.hasOwnProperty("sku")) {
                        theProduct["sku"] = await PUPGMO.innerText(productElement, this.plistFields["sku"]);
                    }

                    // TODO: Add price here also

                    if (this.plistFields.hasOwnProperty("in_stock")) {
                        theProduct["in_stock"] = await Gmg_Async.booleanCallback(productElement, this.plistFields["in_stock"]);
                    }



                    if (this.plistFields.hasOwnProperty("productUrl")) {
                        theProduct["productUrl"] = await Gmg_Async.propertyCallback(productElement, this.plistFields["productUrl"]);
                    } else if (this.plistFields.hasOwnProperty("productDetailsSection")) {
                        let productDetailsSection = this.plistFields["productDetailsSection"], productDetailsWrapper = productDetailsSection["wrapper"];
                        let productDetailsCss = await Gmg_Async.getAttr(productElement, productDetailsWrapper[0], productDetailsWrapper[1]);
                        let temporaryProductArea = await page.$(`${productDetailsWrapper[2]}${productDetailsCss}`);
                        console.log(productDetailsCss);
                        theProduct["detail"] = await PUPGMO.innerHtml(temporaryProductArea, productDetailsSection["detail"]);
                    }
                    // console.log(theProduct);
                    this._tempProducts.push({...theProduct, ...productCategories});
                }

                console.log(theProduct);

                productNumber++;

            }

            // TODO : Create a json file that holds all this information first, prompting the user to then gather the rest of the information


            if (this.ppageFields !== undefined && this.ppageConfig) {
                const doNotGatherValue = this.ppageFields.hasOwnProperty("do_not_gather_urls_with") ? this.ppageFields["do_not_gather_urls_with"] : null;
                // TODO: FOR EACH PRODUCT WE CREATED, GO TO EACH PAGE AND SCRAPE MORE DATA
                for (let product in this._tempProducts) {
                    let p = this._tempProducts[product];
                    console.log(p);
                    if (p.hasOwnProperty("productUrl")) {
                        let currentProductUrl = p["productUrl"];
                        if (doNotGatherValue === null || currentProductUrl.indexOf(doNotGatherValue) < 0) {
                            try {
                                let productPage = await browser.newPage();
                                await productPage.goto(p["productUrl"], {waitUntil: 'load', timeout: 0});
                                await productPage.waitForSelector(this.ppageConfig["wrapper"]);
                                let productPageElement = await productPage.$(this.ppageConfig["wrapper"]);
                                // console.log(productPageElement);
                                let theProduct = await this.normalProductChecks(p, productPageElement);
                                console.log(theProduct);

                                this._products.push(theProduct);
                                await Gmg_Async.ss(5);
                                await productPage.close();
                            } catch (e) {
                                console.error(e);
                            }
                        } else {
                            this._products.push(p);
                        }

                        // console.log(theProduct);
                    }
                    // let productPath = await Gmg.productElement.$()
                }
                //Reset the temporary Products just in case

            } else {
                for (let product in this._tempProducts) {
                    let p = this._tempProducts[product];
                    console.log(p);
                    this._products.push(p);
                }
            }
            this._tempProducts = [];
        } else {
            console.error("For some reason the products could not be found in: \r\n", `Wrapper: ${plistwrapper}`);
        }

    }

    async normalProductChecks(productObj, productElement) {

        let gather = true;
        if (this.ppageFields.hasOwnProperty("gather_element")) {
            gather = false;
            let productGather = await productElement.$(this.ppageFields["gather_element"]);
            console.log(productGather);
            if (productGather) {
                gather = true;
            }
        }

        if (gather) {
            const CHECK_BOOLEAN = "in_stock";
            if (this.ppageFields.hasOwnProperty(CHECK_BOOLEAN)) {
                productObj[CHECK_BOOLEAN] = await Gmg_Async.booleanCallback(productElement, this.ppageFields[CHECK_BOOLEAN]);
            }

            if (this.ppageFields.hasOwnProperty("productId")) {
                productObj["productId"] = await Gmg_Async.propertyCallback(productElement, this.ppageFields["productId"])
            }

            const GET_TEXT_FIELDS = ["secondary_name", "name", "price", "sku",
                "weight_kg", "weight", "length_cm", "width_cm",
                "height_cm", "productId", "secondary_name",
                "text_short_description", "text_description", "model_id"];
            for (const fieldKey of GET_TEXT_FIELDS) {
                // let fieldKey = GET_TEXT_FIELDS[key];
                if (this.ppageFields.hasOwnProperty(fieldKey)) {
                    let fieldValue = this.ppageFields[fieldKey];

                    if (typeof fieldValue === "string" && fieldValue !== "") {
                        // TODO: Check if field exists
                        let fieldContext = await PUPGMO.innerText(productElement, fieldValue);
                        productObj[fieldKey] = fieldContext
                    } else {
                        console.error(`The field value of the field ${fieldKey} needs to be a valid JSON string`);
                    }
                }
            }

            const GET_HTML_FIELDS = ["short_description", "description"];
            for (const fieldKey of GET_HTML_FIELDS) {
                // let fieldKey = GET_HTML_FIELDS[key];
                if (this.ppageFields.hasOwnProperty(fieldKey)) {
                    let fieldValue = this.ppageFields[fieldKey].split("?");
                    if (fieldValue.length > 1) {
                        for (let value in fieldValue) {
                            let foundElement = await productElement.$(fieldValue[value]);
                            if (foundElement) {
                                // console.log(foundElement);
                                fieldValue = fieldValue[value]
                            }
                        }
                    } else {
                        fieldValue = fieldValue[0];

                        let foundElement = await productElement.$(fieldValue);
                        if (!foundElement) {
                            fieldValue = null;
                        }
                    }
                    if (typeof fieldValue === "string" && fieldValue !== "") {
                        // TODO: Check if field exists
                        productObj[fieldKey] = await PUPGMO.innerHtml(productElement, fieldValue);
                    }
                }
            }

            const GET_EVERYTHING = "all_description";

            if (this.ppageFields.hasOwnProperty(GET_EVERYTHING)){
                let everythingConfig = this.ppageFields[GET_EVERYTHING];

                let tempEl = await productElement.$$(everythingConfig[0]);
                if (tempEl.length > 0) {
                    let htmlValue = [];
                    if (everythingConfig.length > 1 && everythingConfig[1] === true) {
                        let i = 0;
                        for (const tempElKey in tempEl) {
                            let tempElementContent = tempEl[tempElKey];
                            let tempValue, tempName = "dataPiece"+i;

                            tempValue = await tempElementContent.evaluate((element) => element.innerText);
                            productObj[tempName] = tempValue;
                            i++;
                        }
                    } else {

                        for (const tempElKey in tempEl) {
                            let tempElementContent = tempEl[tempElKey];
                            let tempValue;

                            tempValue = await tempElementContent.evaluate((element) => element.innerText);
                            htmlValue.push(tempValue);
                        }

                        productObj["objDescription"] = htmlValue.join("<br>");
                    }
                }
            }

            if (this.ppageFields.hasOwnProperty("images")) {
                let imagesConfig = this.ppageFields["images"];
                if (Array.isArray(imagesConfig)) {
                    let moreImagesArray = await Gmg_Async.propertyCallback(productElement, imagesConfig, true);
                    if (moreImagesArray.length > 0) {
                        // Remember to reset the variable for concat
                        productObj["imageUrls"] = productObj["imageUrls"].concat(moreImagesArray);
                    }
                }
            }

            if (this.ppageFields.hasOwnProperty("files")) {
                let fileConfig = this.ppageFields["files"];
                let productFiles = await ImageHelper.basicFileScraper(productElement, fileConfig);
                if (productFiles !== "") {
                    productObj["Meta: product_files"] = productFiles;
                }
            }

        }
        return productObj;


    }

    async getElementThatExists(productElement, fieldKey) {
        let fieldValue = this.ppageFields[fieldKey].split("?");
        console.log(fieldValue);
        if (fieldValue > 1) {
            for (let value in fieldValue) {
                let foundElement = await productElement.$(fieldValue[value]);
                if (foundElement) {
                    fieldValue = fieldValue[value];
                }
            }
        } else {
            fieldValue = fieldValue[0];
        }

        return fieldValue;
    }

    async convertCategoryToTags(brandConfig, category=null) {
        //
        const Z = ["Fuel Type"];
        // let splBy = category.indexOf('-') !== -1 ? '-' : ' ';
        let categoryArray = category === null ? brandConfig["categories"] : category.split("_");
        const catLeng = categoryArray.length;
        console.log(categoryArray);
        let brandName = brandConfig["name"], helpers, isFireProductAccessory;
        let tags = [brandName], categories = [addCat("Brand", brandName)], attributes = addAttr("Brand", brandName);
        if (catLeng > 0) {
            let id = categoryArray.shift();
            const categoryTargets = {
                "GLOG": [["Fire Product > Log Set & Burner"], ["Design Style"]],
                'FP': [["Fire Product", "Fuel Type"], ["Hearth Style", "Fuel Type", "Design Style"]],
                "GRILLS": [["Grill", "Fuel Type"], ["Grill Style", "Fuel Type"]],
                "Heater": [["Fuel Type"], ["Fuel Type"]],
                "ACCESS": [["Fire Accessories"], ["Accessory Style"]],
                "PF": [["Outdoor Living", "Collection"], ["Outdoor Style", "Collection", "Material Type", "Design Style"]],
                "OK": [["Outdoor Living > Kitchen", "Collection"], ["Outdoor Style", "Collection", "Design Style"]]
            };

            if (categoryTargets.hasOwnProperty(id) && catLeng >= 1) {
                console.log("Hit the function part");
                if (id === "GLOG") {
                    let fuel = "Gas", hearthStyle = "Log Set & Burner";
                    categories.push(addCat(Z[0], fuel));
                    attributes = {...attributes, ...addAttr("Hearth Style", hearthStyle, catLeng+1)};
                }
                let ctarget = categoryTargets[id];
                let cats = ctarget[0], attrs = ctarget[1];
                console.log(cats.length, attrs.length);

                await Gmg_Async.ss(10);

                for (let i = 0; i < catLeng; i++) {
                    if (cats.length > i) {
                        categories.push(addCat(cats[i], categoryArray[i]))
                    }
                    if (attrs.length > i) {
                        attributes = {...attributes, ...addAttr(attrs[i], categoryArray[i], i+1)};
                    }
                }

            } else if (categoryArray.length >= 1) {
                let titleAttribute = '';

            } else {
                console.error("Incorrect Category Type "+ id );
            }

        }

        const v = {"brand_sku": brandConfig["brand_sku"], "Tags" : tags.join(", "), "Categories": categories.join(", "), ...attributes};
        console.log(v);
        return v;
        // let defaultProduct = {type: "simple", tax_status: "taxable", published: 1, is_featured: 0, visible_catalog: "visible", allow_reviews: 1};
    }




    static skuify (skuFormat, product, brandId) {

        const MODIFIED_VALUES = {
            "name_lowercase_underscored": (prodArr) => prodArr["name"].toLowerCase().replaceAll(" ", "_"),
            "name_beginning": (prodArr) => prodArr["name"].split(" ")[0]
        }

        for (const modifiedValue of Object.keys(MODIFIED_VALUES)) {
            if (skuFormat.indexOf(modifiedValue) !== -1) {
                skuFormat = skuFormat.replaceAll(`%${modifiedValue}%`, MODIFIED_VALUES[modifiedValue](product));
            }
        }

        let skuString = `${brandId}-${skuFormat}`;
        console.log(skuString, skuFormat);
        product["sku_other"] = skuString;
        return product;
    }

    async importify(isInit = true) {
        let brand_dir = `${this._UP_DIR}${this.config["slug_name"]}`;
        let products = isInit
            ? await Gmg_Async._readFileToJson(`${brand_dir}/current_products.json`)
            : this._products;

        let csv_products_json = [];

        for (let p of products) {
            if (p.hasOwnProperty("imageUrls")) {
                let pim = p["imageUrls"], pimType = typeof pim;

                p["images"] = typeof p["imageUrls"] === "boolean" ? "" : (typeof p["imageUrls"] === "string" ? p["imageUrls"] : p["imageUrls"].join(","));
                delete p.imageUrls;
            }
            // if (p.hasOwnProperty("productUrl")) {delete p.productUrl;}
            if (p.hasOwnProperty("brand_id")) {delete p.brand_id;}
            if (p.hasOwnProperty("brand_url")) {delete p.brand_url;}
            if (!p.hasOwnProperty("product_sku")) {
                // TODO: Generate sku here.
            } else {
                // p["sku"] =
            }

            if (p.hasOwnProperty("Attribute 0 value(s)") && p.hasOwnProperty("name")) {
                let brandName = p["Attribute 0 value(s)"], productName = p["name"];
                p["fullname"] =  `${brandName} - ${productName}`;
            }

            csv_products_json.push(p);
        }

        await Gmg_Async._writeToFile(csv_products_json, `${brand_dir}/import_current_products.json`);
        const csv = new ObjectsToCsv(csv_products_json);
        await csv.toDisk(`${brand_dir}/import_current_products.csv`, {});


    }


    async initImages(isInit=true, sanitizeUrl=false) {
        let brand_dir = `${this._UP_DIR}${this.config["slug_name"]}`;
        await Gmg_Async.createDir(brand_dir);

        let products = isInit
            ? await Gmg_Async._readFileToJson(`${brand_dir}/current_products.json`)
            : this._products;

        await ImageHelper.initImagesCollection(brand_dir, products);

        //TODO : Copy from above and work in this function for images
        // TODO: Exit code if not init
    }

    async basicImageScraper() {
        let brand_dir = `${this._UP_DIR}${this.config["slug_name"]}`;
        await Gmg_Async.createDir(brand_dir);

        const browser = await puppeteer.launch(GmgBrowser.launchOpts(false));

        if (this.config.hasOwnProperty('images')) {

            let imageConfig = this.config["images"], imgCount = 0, imgCallback;
            const sel = imageConfig["selector"], loc = imageConfig["location"] ?? "src";
            if (loc === "background-image") {
                imgCallback = async function (imgEl) {
                    let backgroundImage = await imgEl.evaluate((el) => window.getComputedStyle(el).backgroundImage);
                    let imgUrlSections = backgroundImage.split('"');
                    return imgUrlSections.length > 0 ? imgUrlSections[1] : imgUrlSections[0];
                }
            } else if (loc === "realsrc" || loc === "data-realsrc") {
                imgCallback = async function (imgEl) {
                    let val = await imgEl.evaluate((element) => element.getAttribute("data-realsrc"));
                    console.log(val);
                    return val;
                }
            } else if (loc === "href") {
                imgCallback = async function (imgEl) {
                    return await (await imgEl.getProperty("href")).jsonValue();
                }
            } else {
                imgCallback = async function (imgEl) {
                    return await (await imgEl.getProperty("src")).jsonValue();
                }
            }
            const page = await browser.newPage();
            if (imageConfig.hasOwnProperty("page")) {

                await ImageHelper.basicImageScraper(brand_dir, sel, imgCallback, imageConfig, page, this.config["slug_name"]);
            } else {

                await ImageHelper.productDataImageScraper(brand_dir, sel, imgCallback, imageConfig, page);

                // If the Page variable is not found we are going to be looping through the current products and will be scraping each photo individually
            }

        } else {
            console.log("No image config");
        }


        await browser.close();

    }

    async patioSortingFunction() {
        console.log(this.BDIR);
        const brandsDirectory = await fs.readdir(this.BDIR);
        const scrapeBrand = await Gmg_Async.createAsyChoiceList("What brand would you like to scrape?", brandsDirectory)
        const configFile = csvToJson.getJsonFromCsv(`${this.BDIR}/${scrapeBrand}`);


        // Choose the file
        // Choose the Column to use
        // Choose the
    }

}
