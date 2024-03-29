// DEBUG

// import puppeteer from "puppeteer-extra";
import crypto from "crypto";
// import * as Path from "path";

// import * as http from "http";
// import * as https from "https";
// import {Transform as Stream} from "node:stream";



// export const URL_TYPE_CONFIG_CALLBACKS = {
//     "relative": async (el, selector, sanitizedPath) => sanitizedPath + await PUPGMO.href(el, selector, ["trim", "leadingSlashes", "addLeadingSlash"]),
//     "absolute": async (el, selector) => await PUPGMO.href(el, selector, ["trim", "leadingSlashes", "trailingSlashes"]),
//     "href": async (el, selector) => await PUPGMO.href(el, selector, ["trim"]),
//     "src": async (el, selector) => await PUPGMO.src(el, selector, ["trim"]),
//     "currentSrc": async (el, selector) => await PUPGMO.currentSrc(el, selector, ["trim"]),
//     "attr": async (el, selector, attrname) => await PUPGMO.attr(el, selector, attrname, ["trim"]),
//     "self": (el, selector, sanitizedPath) => new Promise(resolve => resolve(sanitizedPath)),
// }
//
// export const BASIC_GET_CALLBACKS = {
//     "relative": async (el, selector) => sanitizedPath + await PUPGMO.href(el, selector, ["trim", "leadingSlashes", "addLeadingSlash"]),
//     "absolute": async (el, selector) => await PUPGMO.href(el, selector, ["trim", "leadingSlashes", "trailingSlashes"]),
//     "href": async (el, selector) => await PUPGMO.href(el, selector, ["trim"]),
//     "src": async (el, selector) => await PUPGMO.src(el, selector, ["trim"]),
//     "currentSrc": async (el, selector) => await PUPGMO.currentSrc(el, selector, ["trim"]),
//     "attr": async (el, selector, attrname) => await PUPGMO.attr(el, selector, attrname, ["trim"]),
//     "self": (el, selector, sanitizedPath) => new Promise(resolve => resolve(sanitizedPath)),
// }



// export const PUPGMO = {
//     "innerText": async (el, sel, sanitizations = ["trim"]) => await Gmg_Async.getProps(el, sel, "innerText", sanitizations),
//     "innerHtml": async (el, sel, sanitizations = ["trim"]) => await Gmg_Async.getProps(el, sel, "innerHtml", sanitizations),
//     "href": async (el, sel, sanitizations = ["leadingSlashes"]) => await Gmg_Async.getProps(el, sel, "href", sanitizations),
//     "src": async (el, sel, sanitizations = ["trim"]) => await Gmg_Async.getProps(el, sel, "src", sanitizations),
//     "currentSrc": async (el, sel, sanitizations = ["trim"]) => await Gmg_Async.getProps(el, sel, "currentSrc", sanitizations),
//     "attr": async (el, sel, attrName, sanitizations = ["trim"]) => await Gmg_Async.getProps(el, sel, attrName, sanitizations)
// }
//
// export const PUPME = {
//     "innerText": async (el, sel) => await Gmg_Async.getProps(el, sel, "innerText"),
//     "innerHtml": async (el, sel) => await Gmg_Async.getProps(el, sel, "innerHtml"),
//     "href": async (el, sel) => await Gmg_Async.getProps(el, sel, "href"),
//     "src": async (el, sel) => await Gmg_Async.getProps(el, sel, "src"),
//     "currentSrc": async (el, sel) => await Gmg_Async.getProps(el, sel, "currentSrc"),
//     "attr": async (el, sel, attrName = ["trim"]) => await Gmg_Async.getProps(el, sel, attrName)
// }


// export class ElmBrowser {
//
//
//     static launchOpts (headless=true) {
//         return {headless: headless, ignoreHTTPSErrors: true, defaultViewport: null}
//
//     }
//
//     static async basic_launch(opts) {
//         const browser = await puppeteer.launch(opts);
//         const page = await browser.newPage();
//         return page;
//     }
//
//     static browser_args(proxy_name = null) {
//         let alwaysArgs;
//         if (proxy_name) {
//             alwaysArgs = [
//                 '--no-sandbox',
//                 '--proxy-server=http://' + proxy_name,
//                 '--disable-setuid-sandbox',
//                 '--disable-dev-shm-usage',
//                 '--disable-gpu',
//                 '--disable-infobars',
//                 '--disable-automation',
//                 '--allow-insecure-localhost',
//                 '--disable-accelerated-2d-canvas',
//                 '--start-maximized',
//                 '--disable-web-security',
//                 '--disable-features=IsolateOrigins,site-per-process',
//                 '--lang=en-US,en;q=0.9',
//                 '--ignore-certificate-errors'
//             ];
//         } else {
//             alwaysArgs = [
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//                 '--disable-dev-shm-usage',
//                 '--disable-gpu',
//                 '--disable-infobars',
//                 '--disable-automation',
//                 '--allow-insecure-localhost',
//                 '--disable-accelerated-2d-canvas',
//                 '--start-maximized',
//                 '--disable-web-security',
//                 '--disable-features=IsolateOrigins,site-per-process',
//                 '--lang=en-US,en;q=0.9',
//                 '--ignore-certificate-errors'
//             ];
//         }
//
//         return alwaysArgs;
//     }
//
//     static async browser_launch(headless = false, proxy = null) {
//         let proxy_name = proxy === null ? '127.0.0.1:9876' : proxy['proxy_server'];
//         let alwaysArgs = [
//             '--no-sandbox',
//             '--proxy-server=http://' + proxy_name,
//             '--disable-setuid-sandbox',
//             '--disable-dev-shm-usage',
//             '--disable-gpu',
//             '--disable-infobars',
//             '--disable-automation',
//             '--allow-insecure-localhost',
//             '--disable-accelerated-2d-canvas',
//             '--start-maximized',
//             '--disable-web-security',
//             '--disable-features=IsolateOrigins,site-per-process',
//             '--lang=en-US,en;q=0.9',
//             '--ignore-certificate-errors'
//         ];
//         let options = {
//             headless: headless,
//             ignoreHTTPSErrors: true,
//             defaultViewport: null,
//             args: alwaysArgs,
//         };
//         // if (proxy) {
//         //     // TODO: Apply puppeteer stealth config and auto captcha where necessary
//         //     await puppeteer.use(StealthPlugin());
//         // }
//         // return await puppeteer.launch(options);
//     }
// }

// export class Gmg_Async {
//
//     static BACKIMAGE = "background-image-css";
//
//
//
//
//     static async propertyCallback($el, arr, findAll=false) {
//         let values=[], callback;
//         if (arr.length >= 2) {
//             let srcType = arr[0];
//             let selector = arr[1];
//             let sanitizations = ["trim"];
//             if (arr.length >= 3) {
//                 let tempSan = arr[2];
//                 if (Array.isArray(tempSan) && tempSan.length > 0) {
//                     sanitizations = tempSan
//                 }
//             }
//             let searchItem = srcType;
//             // TODO: Also maybe set element find callback?
//             let basicCallbacks = ["href", "src", "currentSrc", "innerText", "innerHtml"];
//             if (srcType === "attr" && arr.length >= 4) {
//                 searchItem = arr[3];
//
//                 callback = async (tempEl, search) => await tempEl.evaluate((element, s) => element.getAttribute(s), search);
//
//             } else if (basicCallbacks.includes(srcType)) {
//                 callback = async (tempEl, search) => await (await tempEl.getProperty(search)).jsonValue();
//             } else {
//                 console.error(`Invalid URL callback type: ${srcType}`);
//                 console.error(`Valid URL callbacks included: ${Object.keys(URL_TYPE_CONFIG_CALLBACKS).join(', ')}`);
//             }
//
//             if (callback !== undefined) {
//                 if (Array.isArray($el)) {
//                     for (const el in $el) {
//                         let tempEl = selector === "self" ? $el : await $el[el].$(selector);
//                         let v = await callback(tempEl, searchItem);
//                         v = Gmg_Async.sanitize(v, sanitizations);
//                         values.push(v)
//                     }
//                 } else if(findAll === true) {
//                     let temporaryElements = await $el.$$(selector);
//
//                     // LOOK FOR ALL ELEMENTS ON THE PAGE FOR THE FOLLOWING
//                     if (temporaryElements) {
//                         for (const el in temporaryElements) {
//                             // TODO: Check if field exists
//                             let v = await callback(temporaryElements[el], searchItem);
//                             v = Gmg_Async.sanitize(v, sanitizations);
//                             values.push(v)
//                         }
//                     } else {
//                         console.log(`No elements for selector ${selector}`)
//                     }
//                 } else {
//                     let tempEl = selector === "self" ? $el : await $el.$(selector);
//                     if (tempEl === null) {
//                         console.log("Element not found: ", $el, selector);
//                     } else {
//                         let v = await callback(tempEl, searchItem);
//                         values.push(Gmg_Async.sanitize(v, sanitizations));
//                     }
//                 }
//             }
//
//         } else {
//             console.error(`To perform a callback for properties for an array please insert more than 2 variables in the array`)
//         }
//
//         // If the value is only one part return just that one part, otherwise return the whole array of values
//
//         return values.length > 0 ? (values.length === 1 ? values[0] : values) : false;
//     }
//
//     static async booleanCallback($el, arr) {
//         if (arr.length === 2) {
//             let boolNegation = arr[0];
//             let selector = arr[1];
//             let element = await $el.$(selector);
//             let elementFound = element ? true : false;
//
//             return boolNegation === "sold-out" || boolNegation === "so" ? !elementFound : elementFound;
//
//         } else {
//             console.error(`Boolean callbacks need exactly 2 variables`);
//             console.error(`The first should be "ok" or "sold-out". Sold-out is the negation part if this selector is found in the element`);
//             console.error(`Second part is the selector you are looking for.`);
//         }
//
//         return false;
//     }
//
//
//     static async getProps(el, sel, type, sanitizations = ["trim"]) {
//         let tempEl = sel === "self" ? el : await el.$(sel);
//         if (tempEl === null) {
//             console.error(`NOT FOUND: ${type}`);
//             console.error(`Selector: ${sel}`);
//             console.error(`Parent Element: ${el}`);
//         }
//         let value;
//         // console.log(tempEl);
//         if (type === "innerHtml") {
//             //WORKS AS INTENDED NOW FOR INNER HTML
//             value = await tempEl.evaluate((element) => element.innerHTML);
//         } else {
//             value = await (await tempEl.getProperty(type)).jsonValue()
//         }
//
//         if (type === 'price') {
//             sanitizations.push("remove::$");
//         }
//
//         return Gmg_Async.sanitize(value, sanitizations);
//     }
//
//     static async getAttr(el, sel, type) {
//         let tempEl = sel === "self" ? el : await el.$(sel);
//         return await tempEl.evaluate((element, s) => element.getAttribute(s), type);
//     }
//
// }
//
//
// export const SANITIZE = {
//     "trim": (value) => value.trim(),
//     "commas": (value) => "\"" + value + "\"",
//     "leadingSlashes": (value) => value.replace(/^\/+/, ''),
//     "trailingSlashes": (value) => value.endsWith("/") ? value.replace(/\/+$/, '') : value,
//     "addLeadingSlash": (value) => "/" + value,
//     "addTrailingSlash": (value) => value + "/",
//     "remove": (value, removeValue) => value.replace(removeValue, ""),
//     "sanitizeSlug": (slug) => {
//         return slug.replaceAll("™", "")
//             .replaceAll("®", "")
//             .replaceAll("/", "_")
//             .replaceAll("\"", "-")
//             .replaceAll("(", "")
//             .replaceAll(")", "")
//             .replaceAll("[", "")
//             .replaceAll("]", "")
//             .replaceAll(" ", "");
//     }
// }



