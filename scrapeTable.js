

/**
 * @file scrapeTable.js
 * @description This script scrapes a table from a webpage using XPath queries, processes the data, and saves the results to a JSON file.
 */

function getElementsByXPath(xpath) {
    let results = [];
    let query = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    for (let i = 0; i < query.snapshotLength; i++) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

// Function to get text content from an XPath
function getTextByXPath(xpath) {
    let result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.STRING_TYPE,
        null
    );
    return result.stringValue.trim();
}

// Function to combine the text from the two elements in the specified format
function combineTitleText() {
    let text1 = getTextByXPath('/html/body/div/main/div[1]/header/div/h1/div[1]/a');
    let text2 = getTextByXPath('/html/body/div/main/div[1]/header/div/h1/div[2]/a');
    
    if (text1 && text2) {
        return `${text1}/${text2}`;
    } else {
        console.log('One or both elements not found.');
        return '';
    }
}




function processHFTable() {
    let files = {
        files: [],
        directories: [],
        repo: combineTitleText(),
        date: new Date().toISOString,
        url: window.location.href
    };
    let results = [];

    // Get the ul list using the provided XPath
    const ulElement = getElementsByXPath('/html/body/div/main/div[2]/section/div[3]/ul')[0];


    if (ulElement) {
        // Get all li elements within the ul
        const liElements = ulElement.getElementsByTagName('li');

        // Iterate over each li element
        for (let i = 0; i < liElements.length; i++) {
            let li = liElements[i];

            // Extract the title using XPath
            let title = document.evaluate('./div/a/span', li, null, XPathResult.STRING_TYPE, null).stringValue.trim();
            let isDir = title == '';
            if (isDir) {
                title = document.evaluate('./a[1]/span', li, null, XPathResult.STRING_TYPE, null).stringValue.trim();
            }
            // Extract the URL
            let urlElement = document.evaluate('./a[1]', li, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            let url = urlElement && urlElement.hasAttribute('download') ? urlElement.href : urlElement ? urlElement.href : '';

            // Extract the size using XPath and check for valid units
            let size = document.evaluate('./a[1]/span', li, null, XPathResult.STRING_TYPE, null).stringValue.trim();
            let sizePattern = /\d+(\.\d+)?\s?(KB|MB|GB|TB)/i;

            // Determine if the size field matches a known size pattern
            if (!sizePattern.test(size)) {
                size = '0GB'; // Default size if no valid size is found
                type = 'directory';
            } else {
                type = 'file';
            }

            // Create the object
            let resultObject = {
                title: title || '',
                url: url || '',
                size: size,
                type: type
            };
            if (type == 'file') {
                files.files.push(resultObject);
            }
            else {
                files.directories.push(resultObject);
            }

            // Push the result to the results array
        }

        // Log the results
        console.log(files);
    } else {
        console.log('ul element not found.');
    }
    return files;
}



function downloadFile() {
    const json = JSON.stringify(files);
    const blob = new Blob([json], { type: 'application/json' });
    const urll = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urll;
    a.download = `${files.repo}.json`;
    a.click();
}






let files = processHFTable();

// save the results to a .json file
downloadFile();
