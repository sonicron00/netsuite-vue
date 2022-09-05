/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
import * as search from "N/search";
import * as file from "N/file";

export const getClient = () => {
    try {
        const indexFile = file.load({ id: "../app/index.html" });
        const clientFolderPath = indexFile.path.replace("index.html", "");
        const files = getStaticFiles(indexFile.folder, clientFolderPath);
        const html = indexFile.getContents();

        return files.reduce((pre, cur) => {
            return (pre = replaceGlobally(pre, cur.path, cur.url));
        }, html);
    } catch (e) {
        console.log(e);
        throw e.message;
    }
};

/**
 * Replace all URL references within the index file
 * @param original 
 * @param searchText 
 * @param replaceText 
 * @returns 
 */
const replaceGlobally = (original, searchText, replaceText) => {
    const regex = new RegExp(searchText, "g");
    return original.replace(regex, replaceText);
};

/**
 * Find all files to serve the Vue app
 * @param folderId
 * @param clientFolderPath - Located in NetSuite file cabinet (e.g /SuiteScripts/app-name/app/*)
 * @returns
 */
const getStaticFiles = (folderId, clientFolderPath) => {
    return search
        .create({
            type: "file",
            filters: [["folder", "anyof", folderId]],
            columns: ["name", "url"],
        })
        .run()
        .getRange({ start: 0, end: 1000 })
        .map((staticFile) => {
            return {
                id: staticFile.id,
                name: staticFile.getValue("name"),
                url: staticFile.getValue("url"),
                path:
                    "/" +
                        file
                        .load({ id: staticFile.id })
                        .path.replace(clientFolderPath, ""),
            };
        });
};
