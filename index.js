const core = require('@actions/core');
const github = require('@actions/github');
const path = require('node:path'); 
const AdmZip = require('adm-zip');
const fs = require('fs');

const jsonArray = core.getInput('files-input');
const base64List = [];
const zip = new AdmZip();

const personalAccessToken = core.getInput('github-personal-access-token');


// Define the API URL
const apiUrl = 'http://spectacular-generator.eba-833qa9rw.eu-west-1.elasticbeanstalk.com/';
const checkUserString = '/api/checkUser';
const generateDocString = '/api/generate/documentation';
let filePaths = JSON.parse(jsonArray);

var url;

var htmlList;

try {
  const selectedStyle = core.getInput('style');
  console.log(`💕 Chosen style ${selectedStyle}!`);

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



  //CHECK IF USER EXISTS API CALL
  url =  `${apiUrl}${checkUserString}?api-version=2`;

    // Make a PUT request
  put(url,data)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  //GENERATE DOCUMENTATION API CALL
    //populate htmlList here <3

  htmlList.forEach(async (html,index) => {
    const htmlContent = html[0];
    console.log(`HTML CONTENT: ${htmlContent}`);
    const fileName = `${html[1]}-${index}.html`;
    console.log(`FILE NAME: ${fileName}`);
    fs.writeFileSync(fileName, htmlContent);
    console.log(`Created HTML file: ${filename}`);
    zip.addFile(filename, Buffer.from(htmlContent));

  });



  // base64List.forEach(async (string,index) => {
  //     const htmlContent = `<html><body>${string}</body></html>`;
  //     const filename = `output${index}.html`;
  //     fs.writeFileSync(filename, htmlContent);
  //     console.log(`Created HTML file: ${filename}`);
  //     zip.addFile(filename, Buffer.from(htmlContent));
  //   });


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