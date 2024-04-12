const core = require('@actions/core');
const fs = require('fs');
//const fs = require('fs').promises;
const path = require('path');
const AdmZip = require('adm-zip');
const github = require('@actions/github');
const jsonArray = core.getInput('files-input');
const zip = new AdmZip();
 var base64List = [];

const personalAccessToken = core.getInput('github-personal-access-token');


// Define the API URL
const apiUrl = 'http://spectacular-generator.eba-833qa9rw.eu-west-1.elasticbeanstalk.com';
const checkUserString = '/api/checkUser';
const generateDocString = '/api/generate/documentation';
let filePaths = JSON.parse(jsonArray);

var url;


try {
  const selectedStyle = core.getInput('style');
  console.log(`💕 Chosen style ${selectedStyle}!`);

  console.log(`🌹The given file paths: ${filePaths}!`);

  filePaths.forEach(filePath => {
    console.log("we here fellas");
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


  console.log("about to make call to API");
  //CHECK IF USER EXISTS API CALL
  url =  `${apiUrl}${checkUserString}?api-version=1`;
  let checkUserResponse = callUserCheck(apiUrl, checkUserString, personalAccessToken);
  console.log("Check User Response:", checkUserResponse);

  //url =  `${apiUrl}${generateDocString}?api-version=1`;
  url = `${apiUrl}${generateDocString}?style=${apiUrl}&api-version=1`
  docuGen(apiUrl, generateDocString, personalAccessToken, base64List).then((generateDocResponse)=>
  {
    saveHtmlFiles(generateDocResponse).then(()=>
  console.log("success!")
  );}
  );
 // console.log("Check User Response:", generateDocResponse);





  // zip.writeZip('output.zip');
  // console.log('Created output.zip 🐳');

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

async function saveHtmlFiles(data) {
     
  for (const name of Object.keys(data)) {
    const htmlContent = data[name];
    console.log("WE ARE IN SAVE HTML FILES???/");
    console.log(data[name]);
    const fileName = `${name}.html`;
    console.log(htmlContent);
    zip.addFile(fileName, Buffer.from(htmlContent));
    console.log(`Added HTML file to zip: ${fileName}`);
  }

  zip.writeZip('output.zip');
  console.log('Zip file created:', path.join(process.cwd(), 'output.zip'));

}


async function docuGen(apiUrl, generateDocString, personalAccessToken, base64List) {
  const url = `${apiUrl}${generateDocString}?style=${selectedStyle}&api-version=1`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `${personalAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(base64List),
  })
  console.log(JSON.stringify(base64List));
  console.log('Status Code:', response.status);
  const data = await response.json();
  console.log('DATA:', data);
  return data;
}


async function callUserCheck() {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `${personalAccessToken}`,
      },
    });

    console.log('Status Code wwwweeeeeeeee9999666:', response.status); // Log the status code

    const data = await response.json(); // Parse response as JSON
    console.log('Response:', data); // Log the response JSON

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}



