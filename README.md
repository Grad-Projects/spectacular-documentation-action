# Spectacular Documentation Generator Action 📖
💻A GitHub action for generating spectacular C# documentation!🤓

# This is not connected to our API yet ✨ so as of 11/4/2024 9AM it does not work💖

Follow the steps below to add this spectacular tool to your repo👩‍💻

## Step 1

Follow this link to view and add this action to your repo: [Click here!!!](https://github.com/marketplace/actions/spectacular-documentation-generation-action)
*Please make sure you are using the latest version!*

## Step 2
Add the following to your .yml file:

```
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: 'Spectacular Documentation Generation Action 📖'
    steps:
      - name: Checkout Repository 👨‍🏭
        uses: actions/checkout@v2
        
      - name: Setup Node.js ⚙️
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies 🪛
        run: npm install adm-zip
      - name: List Files 📂
        run: ls -R
      - name: Grabbing Inputs 💖
        id: inputs
        uses: Grad-Projects/spectacular-documentation-action@vPUT LATEST VERSION NO. HERE
        with:
          style: 'Your chosen style goes here!'
          files-input: '["The paths to your files go here!"]'
          github-username: 'Enter your github username here!'
        
      - name: Build artifacts pls
        uses: actions/upload-artifact@v2
        with:
          name: Downloadable artifacts
          path: 'output.zip'
      - name: 'Thats All Folks 🐇'
        run: echo "We're done here💗."
```
## Step 3
Make sure that the following is filled in properly in your .yml 🦋

| Field           | Your Value                                                     | Example                        |
| :---            |    :----:                                                      |     ---:                       |
| style           | Choose a style from the list at the end of these instructions! | 'Simple'                       |
| files-input     | The paths to your C# files                                     | '["FilePath1","FilePath2",...]'|
| github-username | Your GitHub user name                                          | 'myUserName88                  |

## Available Styles Guide
- Simple ✨
- Serious Business 👨‍💼
- Pastel Dreams 💗
- Eye Searer *(Use at own risk)* ☢️
- I Love To Code *(Use at own risk)* ☢️

