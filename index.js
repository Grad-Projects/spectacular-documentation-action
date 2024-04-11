// const core = require('@actions/core');
// const github = require('@actions/github');
// const path = require('node:path'); 
// const AdmZip = require('adm-zip');
// const fs = require('fs');

// const jsonArray = core.getInput('files-input');
// const base64List = [];
// const zip = new AdmZip();

// const personalAccessToken = core.getInput('github-personal-access-token');


// // Define the API URL
// const apiUrl = 'http://spectacular-generator.eba-833qa9rw.eu-west-1.elasticbeanstalk.com';
// const checkUserString = '/api/checkUser';
// const generateDocString = '/api/generate/documentation';
// let filePaths = JSON.parse(jsonArray);

// var url;

// var htmlList;

// try {
//   const selectedStyle = core.getInput('style');
//   console.log(`💕 Chosen style ${selectedStyle}!`);

//   console.log(`🌹The given file paths: ${filePaths}!`);

//   filePaths.forEach(filePath => {
//     console.log("we here fellas");
//     const base64String = fileToBase64(filePath);
//       if(isCSFile(filePath)){
//         if (base64String) {
//           console.log("yo yo now we here!!!");
//           base64List.push(base64String);
//         } else {
//           console.log('😔 Failed to convert file to base64:', filePath);
//         }
//       }else{
//         console.log("FOUND A FILE THAT IS NOT A C# FILE 😠 IT WILL NOT BE GENERATED INTO DOCUMENTATION")
//       }
//   });


//   console.log("about to make call to API");
//   //CHECK IF USER EXISTS API CALL
//   url =  `${apiUrl}${checkUserString}?api-version=1`;
//   callUserCheck();

//   url =  `${apiUrl}${generateDocString}?api-version=1`;
//   htmlList = docuGen();
//   console.log(htmlList);
//   console.log("finished making API calls");

// const checkUserResponse = callUserCheck(apiUrl, checkUserString, personalAccessToken);     
// console.log('Check User Response:', checkUserResponse);     
// const generateDocResponse = docuGen(apiUrl, generateDocString, personalAccessToken, base64List);     
// console.log('Generate Doc Response:', generateDocResponse);



//   //GENERATE DOCUMENTATION API CALL
//     //populate htmlList here <3

//   htmlList.forEach(async (html,index) => {
//     const htmlContent = html[0];
//     console.log(`HTML CONTENT: ${htmlContent}`);
//     const fileName = `${html[1]}-${index}.html`;
//     console.log(`FILE NAME: ${fileName}`);
//     fs.writeFileSync(fileName, htmlContent);
//     console.log(`Created HTML file: ${filename}`);
//     zip.addFile(filename, Buffer.from(htmlContent));

//   });



//   zip.writeZip('output.zip');
//   console.log('Created output.zip 🐳');

//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }


// function fileToBase64(filePath) {
//   try {
//       // Read the file into a buffer
//       const fileBuffer = fs.readFileSync(filePath);

//       // Check if the fileBuffer is empty
//       if (!fileBuffer.length) {
//           throw new Error('File is empty 😰');
//       }

//       // Convert the buffer to a base64 string
//       const base64String = fileBuffer.toString('base64');

//       return base64String;
//   } catch (error) {
//       console.error('👎 Error reading file:', error);
//       return null;
//   }
// }

// function isCSFile(filePath) {
//   return path.extname(filePath).toLowerCase() === '.cs';
// }

// // async function docuGen() {
// //     fetch(url, {
// //       method: 'PUT',
// //       headers: {
// //           'Authorization': `${personalAccessToken}`,
// //           'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(base64List)
// //   })
// //       .then(response => {
// //           console.log('Status Code:', response.status); // Log the status code
// //           return response.json(); // Return the response JSON
// //       })
// //       .then(data => {
// //           console.log('Response:', data); // Log the response JSON
// //           //htmlList = JSON.parse(data);
// //       })
// //       .catch(error => {
// //           console.error('Error:', error);
// //       });
// // }


// async function docuGen() {
//   try {
//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `${personalAccessToken}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(base64List),
//     });

//     console.log('Status Code:', response.status); // Log the status code

//     const data = await response.json(); // Parse response as JSON
//     console.log('Response:', data); // Log the response JSON

//     // Uncomment and use htmlList if needed
//     // const htmlList = JSON.parse(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // async function callUserCheck() {
// //   fetch(url, {
// //       method: 'PUT',
// //       headers: {
// //           'Authorization': `${personalAccessToken}`,
// //       },
// //   })
// //       .then(response => {
// //           console.log('Status Code:', response.status); // Log the status code
// //       })
// //       .then(data => {
// //           console.log('Response:', data); // Log the response JSON
// //       })
// //       .catch(error => {
// //           console.error('Error:', error);
// //       });
// // }

// async function callUserCheck() {
//   try {
//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `${personalAccessToken}`,
//       },
//     });

//     console.log('Status Code:', response.status); // Log the status code

//     const data = await response.json(); // Parse response as JSON
//     console.log('Response:', data); // Log the response JSON
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

const fetch = require('node-fetch');
const core = require('@actions/core');
const fs = require('fs').promises;
const path = require('path');
const AdmZip = require('adm-zip');
const github = require('@actions/github');

 
async function main() {
  const jsonArray = core.getInput('files-input');
  const base64List = [];
  const zip = new AdmZip();
 
  const personalAccessToken = core.getInput('github-personal-access-token');
 
  const apiUrl = 'http://spectacular-generator.eba-833qa9rw.eu-west-1.elasticbeanstalk.com';
  const checkUserString = '/api/checkUser';
  const generateDocString = '/api/generate/documentation';
  let filePaths = JSON.parse(jsonArray);
 
  try {
    const selectedStyle = core.getInput('style');
    console.log(`💕 Chosen style ${selectedStyle}!`);
 
    console.log(`🌹The given file paths: ${filePaths}!`);
 
    for (const filePath of filePaths) {
      console.log("we here fellas");
      const base64String = await fileToBase64(filePath);
      if (isCSFile(filePath)) {
        if (base64String) {
          console.log("yo yo now we here!!!");
          base64List.push(base64String);
        } else {
          console.log('😔 Failed to convert file to base64:', filePath);
        }
      } else {
        console.log("FOUND A FILE THAT IS NOT A C# FILE 😠 IT WILL NOT BE GENERATED INTO DOCUMENTATION")
      }
    }
 
    console.log("about to make call to API");
 
    const checkUserResponse = await callUserCheck(apiUrl, checkUserString, personalAccessToken);
    console.log('Check User Response:', checkUserResponse);
 
    const generateDocResponse = await docuGen(apiUrl, generateDocString, personalAccessToken, base64List);
    console.log('Generate Doc Response:', generateDocResponse);
 
    htmlList = generateDocResponse;
 
    for (let i = 0; i < htmlList.length; i++) {
      const html = htmlList[i];
      const htmlContent = html[0];
      console.log(`HTML CONTENT: ${htmlContent}`);
      const fileName = `${html[1]}-${i}.html`;
      console.log(`FILE NAME: ${fileName}`);
      await fs.writeFile(fileName, htmlContent);
      console.log(`Created HTML file: ${fileName}`);
      zip.addFile(fileName, Buffer.from(htmlContent));
    }
 
    zip.writeZip('output.zip');
    console.log('Created output.zip 🐳');
 
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}
 
async function fileToBase64(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    if (!fileBuffer.length) {
      throw new Error('File is empty 😰');
    }
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('👎 Error reading file:', error);
    return null;
  }
}
 
function isCSFile(filePath) {
  return path.extname(filePath).toLowerCase() === '.cs';
}
 
async function callUserCheck(apiUrl, checkUserString, personalAccessToken) {
  const url = `${apiUrl}${checkUserString}?api-version=1`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `${personalAccessToken}`,
    },
  });
  return await response.json();
}
 
async function docuGen(apiUrl, generateDocString, personalAccessToken, base64List) {
  const url = `${apiUrl}${generateDocString}?api-version=1`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `${personalAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(base64List),
  });
  return await response.json();
}
 
main();

