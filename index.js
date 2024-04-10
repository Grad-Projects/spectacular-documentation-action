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
let stringsArray = JSON.parse(jsonArray);

const zip = new AdmZip();

var filePath;

stringsArray.forEach((string,index) => {
    filePath = string;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      convertedStrings.push(getBase64(data));
      const htmlContent = `<html><body>${getBase64()}</body></html>`;
      const filename = `output${index}.html`;
      fs.writeFileSync(filename, htmlContent);
      console.log(`Created HTML file: ${filename}`);
      zip.addFile(filename, Buffer.from(htmlContent));
    });
});

zip.writeZip('output.zip');
console.log('Created output.zip');


function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
  return reader.result;
}
