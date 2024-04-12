# Spectacular Documentation Generator Action 📖
💻A GitHub action for generating spectacular C# documentation!🤓

## The latest release is v3.41 ❤️


Follow the steps below to add this spectacular tool to your repo👩‍💻

## Step 1

Follow this link to view and add this action to your repo: [Click here!!!](https://github.com/marketplace/actions/spectacular-documentation-generation-action)
*Please make sure you are using the latest version!*

## Step 2
### Generate yourself a Personal Access Token
[Click here to see instructions on how to generate a personal access token](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
You will need to allow the token to access your user information.

See the screenshot below.

![User Permissions Screenshot](https://i.ibb.co/wWMD2B5/githubstuff.png)

### Add your Personal Access Token to your Repo secrets
[Click here to read about how to create secrets in GitHub](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
Save your secret as: *PERSONAL_ACCESS_TOKEN*

## Step 3
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
      - name: add this weird thing
        run: npm install --no-save async
      - name: Grabbing Inputs 💖
        id: inputs
        uses: Grad-Projects/spectacular-documentation-action@v3.40
        with:
          style: 'Simple'
          files-input: '["yourfiles","gohere"]'
          github-personal-access-token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
        
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

| Field                         | Your Value                                                     | Example                                |
| :---                          |    :----:                                                      |     ---:                               |
| style                         | Choose a style from the list at the end of these instructions! | 'Simple'                               |
| files-input                   | The paths to your C# files                                     | '["FilePath1","FilePath2",...]'        |
| github-personal-access-token: | The secret for the personal access token you generated.        | '${{ secrets.PERSONAL_ACCESS_TOKEN }}' |

## Step 4
Run your action! Your documentation will be created as an artifact which you can find on the workflow page, as in the screenshot below:

![Workflow Artifact Screenshot](https://i.ibb.co/Km6cHJb/githubstuff2.png)

## Available Styles Guide
- Simple ✨

```
style: 'Simple'
```

- Serious Business 👨‍💼
  
```
style: 'Serious Business'
```

- Pastel Dreams 💗

```
style: 'Pastel Dreams'
```

- Eye Searer *(Use at own risk)* ☢️

```
style: 'Eye Searer'
```

- I Love To Code *(Use at own risk)* ☢️

```
style: 'I Love To Code'
```

