const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const selectedStyle = core.getInput('style');
  console.log(`Chosen style ${selectedStyle}!`);
  const docNames = core.getInput('name-of-docs');
  console.log(`Chosen style ${docNames}!`);
  const filesInput = core.getInput('files-input');
  console.log(`Chosen style ${filesInput}!`);
  const generatedDocs = ["Yo","Yo"];
  core.setOutput("generated-docs", generatedDocs);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}


function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
