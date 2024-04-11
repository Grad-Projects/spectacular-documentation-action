const core = require('@actions/core');
const github = require('@actions/github');

try {
  const selectedStyle = core.getInput('style');
  console.log(`Chosen style ${selectedStyle}!`);
  const githubName = core.getInput('github-username');
  console.log(`Github username:  ${githubName}!`);
  const stringsArray = core.getInput('files-input');
  console.log(`Files selected: ${stringsArray }!`);
  const generatedDocs = ["Yo","Yo"];
  core.setOutput("generated-docs", generatedDocs);


  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

var convertedStrings = [];


const AdmZip = require('adm-zip');
const fs = require('fs');

const jsonArray = core.getInput('files-input');
let filePaths = JSON.parse(jsonArray);

const base64List = [];

const zip = new AdmZip();


console.log(filePaths);

filePaths.forEach(filePath => {
  const base64String = fileToBase64(filePath);
  if(isCSFile(filePath)){
    if (base64String) {
        base64List.push(base64String);
    } else {
        console.log('Failed to convert file to base64:', filePath);
    }
  }else{
    console.log("FOUND A FILE THAT IS NOT A C# FILE")
  }
});

base64List.forEach(async (string,index) => {
      console.log("we here");
      const htmlContent = `<html><body>${string}</body></html>`;
      const filename = `output${index}.html`;
      fs.writeFileSync(filename, htmlContent);
      console.log(`Created HTML file: ${filename}`);
      zip.addFile(filename, Buffer.from(htmlContent));
    });

console.log('Base64 strings:', base64List);

zip.writeZip('output.zip');
console.log('Created output.zip');



function fileToBase64(filePath) {
  try {
      // Read the file into a buffer
      const fileBuffer = fs.readFileSync(filePath);

      // Check if the fileBuffer is empty
      if (!fileBuffer.length) {
          throw new Error('File is empty');
      }

      // Convert the buffer to a base64 string
      const base64String = fileBuffer.toString('base64');

      return base64String;
  } catch (error) {
      console.error('Error reading file:', error);
      return null;
  }
}

function isCSFile(filePath) {
  return path.extname(filePath).toLowerCase() === '.cs';
}