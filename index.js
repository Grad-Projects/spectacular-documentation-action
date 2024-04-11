const core = require('@actions/core');
const github = require('@actions/github');
const path = require('node:path'); 
const AdmZip = require('adm-zip');
const fs = require('fs');

const jsonArray = core.getInput('files-input');
const base64List = [];
const zip = new AdmZip();

let filePaths = JSON.parse(jsonArray);

try {
  const selectedStyle = core.getInput('style');
  console.log(`Chosen style ${selectedStyle}!`);
  const githubName = core.getInput('github-username');
  console.log(`Github username:  ${githubName}!`);


  console.log(`🌹The given file paths: ${filePaths}!`);

  filePaths.forEach(filePath => {
    const base64String = fileToBase64(filePath);
      if(isCSFile(filePath)){
        if (base64String) {
          base64List.push(base64String);
        } else {
          console.log('😔 Failed to convert file to base64:', filePath);
        }
      }else{
        console.log("FOUND A FILE THAT IS NOT A C# FILE 😠 IT WILL NOT BE GENERATED INTO DOCUMENTATION")
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


  zip.writeZip('output.zip');
  console.log('Created output.zip 🐳');

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}


function fileToBase64(filePath) {
  try {
      // Read the file into a buffer
      const fileBuffer = fs.readFileSync(filePath);

      // Check if the fileBuffer is empty
      if (!fileBuffer.length) {
          throw new Error('File is empty 😰');
      }

      // Convert the buffer to a base64 string
      const base64String = fileBuffer.toString('base64');

      return base64String;
  } catch (error) {
      console.error('👎 Error reading file:', error);
      return null;
  }
}

function isCSFile(filePath) {
  return path.extname(filePath).toLowerCase() === '.cs';
}