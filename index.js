const core = require('@actions/core');
const github = require('@actions/github');
const path = require('node:path'); 
const AdmZip = require('adm-zip');
const fs = require('fs');

const jsonArray = core.getInput('files-input');
var base64List = [];
const zip = new AdmZip();

const personalAccessToken = core.getInput('github-personal-access-token');


// Define the API URL
const apiUrl = 'http://spectacular-generator.eba-833qa9rw.eu-west-1.elasticbeanstalk.com';
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
    console.log("we here fellas");
    const base64String = fileToBase64(filePath);
      if(isCSFile(filePath)){
        if (base64String) {
          console.log("yo yo now we here!!!");
          base64List.push(base64String);
        } else {
          console.log('😔 Failed to convert file to base64:', filePath);
        }
      }else{
        console.log("FOUND A FILE THAT IS NOT A C# FILE 😠 IT WILL NOT BE GENERATED INTO DOCUMENTATION")
      }
  });

  console.log("BASE 64 LIST: ");
  console.log(base64List);
  console.log("TO STRINGED BASE 64 LIST: ")
  console.log(base64List.toString());
  console.log("how does it look hmmmm");
  console.log("Below uses JSON.stringify hm");
  console.log(JSON.stringify(base64List));


  console.log("about to make call to API");
  //CHECK IF USER EXISTS API CALL
  url =  `${apiUrl}${checkUserString}?api-version=1`;
  callUserCheck();


  url =  `${apiUrl}${generateDocString}?api-version=1`;
  docuGen();
  console.log(htmlList);

  console.log("finished making API calls");


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

// async function docuGen() {
//     fetch(url, {
//       method: 'PUT',
//       headers: {
//           'Authorization': `${personalAccessToken}`,
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(base64List)
//   })
//       .then(response => {
//           console.log('Status Code:', response.status); // Log the status code
//           return response.json(); // Return the response JSON
//       })
//       .then(data => {
//           console.log('Response:', data); // Log the response JSON
//           //htmlList = JSON.parse(data);
//       })
//       .catch(error => {
//           console.error('Error:', error);
//       });
// }


async function docuGen() {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `${personalAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: base64List.toString(),
    });
    console.log('Status Code weeeooooo:', response.status); // Log the status code

    const data = await response.json(); // Parse response as JSON
    console.log('Response:', data); // Log the response JSON

    htmlList = data;
  } catch (error) {
    console.error('Error:', error);
  }
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
  } catch (error) {
    console.error('Error:', error);
  }
}



