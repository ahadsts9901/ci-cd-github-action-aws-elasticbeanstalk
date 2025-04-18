
# 🚀 Deploy Express.js App to AWS Elastic Beanstalk via GitHub Actions

## 🧠 Prerequisites

- You have an **Express app** with:
  - `index.mjs` as the main entry
  - A valid `package.json`
- You have a GitHub repo with this code
- You have an AWS account

---

## ✅ Step 1: Setup Your Express App

Ensure your `package.json` includes:

```json
"type": "module",
"scripts": {
  "start": "node index.mjs"
}
```

Your `index.mjs` should include:

```js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello from Elastic Beanstalk!'));
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
```

✅ Make sure the app listens on `process.env.PORT`

---

## ☁️ Step 2: Create Elastic Beanstalk App & Environment

Go to AWS Console → **Elastic Beanstalk** → Click **Create Application**:

### 1. Application Info:

- **Application name**: `github-action-pratice`

### 2. Platform:

- **Platform**: Node.js (Latest version)
- Leave other settings default

### 3. Environment:

- **Environment name**: `github-action-pratice-env`
- **Environment type**: Web server

### 4. Application Code:

- For now, select **Sample Application** (we’ll override this with GitHub Actions later)

Click **Create Application** (takes a couple minutes)

---

## 🛠 Step 3: Set Up GitHub Secrets

Go to your repo on GitHub:

- Click **Settings > Secrets and variables > Actions**
- Add the following secrets:

| Name                    | Value                         |
|-------------------------|-------------------------------|
| `AWS_ACCESS_KEY_ID`     | Your AWS IAM Access Key       |
| `AWS_SECRET_ACCESS_KEY` | Your AWS IAM Secret Key       |

> 🔐 IAM user must have access to Elastic Beanstalk and S3.

---

## 🚀 Step 4: Add GitHub Actions Workflow

Create a file in your repo:

📁 `.github/workflows/deploy.yml`

```yaml
name: 🚀 Deploy to Elastic Beanstalk

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v3

      - name: ⚙️ Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: 📦 Install Dependencies
        run: npm ci

      - name: 📁 Create deployment ZIP
        run: zip -r deploy.zip . -x '*.git*'

      - name: 🚀 Deploy to Elastic Beanstalk
        uses: einaregilsson/beanstalk-deploy@v21
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: github-action-pratice
          environment_name: github-action-pratice-env
          region: ap-southeast-2
          version_label: v-${{ github.run_number }}
          deployment_package: deploy.zip
```

---

## ✅ Step 5: Push to GitHub

```bash
git add .
git commit -m "Setup GitHub Actions for Elastic Beanstalk"
git push origin main
```

This will trigger the GitHub Actions workflow and deploy your app!

---

## 🌐 Step 6: Visit Your App

After a successful deployment, go to:

```
https://<your-env>.elasticbeanstalk.com
```

You’ll see your Express app live 🚀
