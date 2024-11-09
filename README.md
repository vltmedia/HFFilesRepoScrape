# Hugging Face Files Table Scraping
This is a simple example of how to scrape a Hugging Face repo table using Javacsript. This can be useful for creating a list of models in a repo, for example.

# scrapeTable.js

## Description
This script scrapes a table from a webpage using XPath queries, processes the data, and saves the results to a JSON file.

## Functions

### `getElementsByXPath(xpath)`
Retrieves elements from the document based on the provided XPath query.

- **Parameters:**
  - `xpath` (string): The XPath query to evaluate.
- **Returns:**
  - `Array`: An array of elements that match the XPath query.

### `getTextByXPath(xpath)`
Retrieves the text content of an element based on the provided XPath query.

- **Parameters:**
  - `xpath` (string): The XPath query to evaluate.
- **Returns:**
  - `string`: The text content of the element that matches the XPath query, trimmed of any leading or trailing whitespace.

### `combineTitleText()`
Combines the text content from two specific elements into a single string in the format `text1/text2`.

- **Returns:**
  - `string`: The combined text content of the two elements. If one or both elements are not found, logs an error message and returns an empty string.

### `processHFTable()`
Processes the table data and prepares it for saving. This function initializes an object with file and directory arrays, the repository name, and the current date.

- **Returns:**
  - `Object`: An object containing the processed table data.

## Usage:
1. Open the Hugging Face Files page in your browser.
2. Open the browser console.
3. Copy and paste the contents of `scrapeTable.js` into the console.
4. Push Enter to add the functions to the console.
To scrape the table, run the following command in the console:
```javascript

// Usage:

let files = processHFTable();
// print the results to the console if needed.
console.log(files);
// // save the results to a .json file
downloadFile();
```