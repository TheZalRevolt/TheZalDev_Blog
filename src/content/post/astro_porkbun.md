---
publishDate: 2023-05-03T00:00:00Z
title: How to publish an Astro site on Porkbun using GitPages!
description: A little tutorial on how to deploy an Astro site on a domain hosted on Porkbun using Github Pages
excerpt: In this article I will talk on how to deploy an Astro site on a domain hosted on Porkbun using Github Pages
image: ~/assets/images/astro_porkbun_gitpages.png
category: Deploy
tags:
  - deploy
  - github pages
  - porkbun
  - astro
---

Hello There! TheZal here and today I'm gonna show you how to deploy your [Astro](https://astro.build/) Blog on a domain purchased on [Porkbun](https://porkbun.com/) using [GitHub Pages](https://pages.github.com/)

We can say that this guide is composed of three steps:

- Setup your Astro project
- Setup your domain on Porkbun
- Setup the GitHub Pages section of your repository

## Step 1: setup your Astro project

The first thing to do is set up the yaml file.

Inside your `astro.config.mjs` file add a section inside the `defineConfig` section.

```typescript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<YOUR_USERNAME>.github.io OR https://my-custom-domain.com',
});
```

- The `site` should be `https://<YOUR_USERNAME>.github.io` or `https://my-custom-domain.com`

After this, the next step will be the creation of a YAML file inside your project.

Create a new file in your project at `.github/workflows/deploy.yml` with the following code:

```yaml
name: Deploy to GitHub Pages

on:
  # Trigger the workflow every time you push to the `main` branch
  # Using a different branch name? Replace `main` with your branch’s name
  push:
    branches: [main]
  # Allows you to run this workflow manually from the Actions tab on GitHub.
  workflow_dispatch:

# Allow this job to clone the repo and create a page deployment
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v3
      - name: Install, build, and upload your site
        uses: withastro/action@v0
        with:
          # path: . # The root location of your Astro project inside the repository. (optional)
          # node-version: 16 # The specific version of Node that should be used to build your site. Defaults to 16. (optional)
          package-manager: npm # The Node package manager that should be used to install dependencies and build your site. Automatically detected based on your lockfile. (optional)

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

After this your project setup is finished, so we can continue with the second step.

## Step 2: setup your domain on Porkbun

In this step, I will show you how to set up your domain on Porkbun because... well I used Porkbun but I think that this step will be similar to other domain providers.

Go to [Porkbun](https://porkbun.com/), sign in with your account and access to the domain managment page (Account -> Domain Managment)

Locate the domain that you want to use for your awesome Astro site then click "Details" button to the far right of your domain. Then go to the DNS Records section and select "Edit".

![DNS Records section](https://d33v4339jhl8k0.cloudfront.net/docs/assets/5854c918c697912ffd6c1d7a/images/6271b7d3ed262d106f73e4d8/file-9b2EXe4Xqo.png)

On the MANAGE DNS RECORDS pop-up scroll down till you see the "Quick DNS Config" section

![Manage DNS records](https://d33v4339jhl8k0.cloudfront.net/docs/assets/5854c918c697912ffd6c1d7a/images/6260974ba535c33d541a0ac1/file-Wpt5lmz8wl.png)

In this section select the "GitHub" button, click it and confirm it.

![Github quick settings](https://d33v4339jhl8k0.cloudfront.net/docs/assets/5854c918c697912ffd6c1d7a/images/6271b95ca65f844e77f88c0c/file-gi0j6yWToZ.png)

You will be redirected to the "ADDITIONAL DNS REQUIREMENTS" pop-up window. There, you'll want to create your subdomain CNAME record. In the Host field, enter the subdomain you want. It can be "www" or whatever you wish it to be.

![Additional DNS Requirements](https://d33v4339jhl8k0.cloudfront.net/docs/assets/5854c918c697912ffd6c1d7a/images/6271bb2bc5cfff5d83fccad9/file-SudrcHR0JL.png)

For the Answer, replace "USERNAME" with your actual GitHub username and select "SUBMIT".

A success message will appear, letting you know that we were able to update your DNS records. You should now see your DNS records successfully updated to the Github Pages DNS under Current Records.

And that's it, your domain on Porkbun is setup!

## Step 3: Setup the GitHub Pages section of your repository

In the GitHub Pages section you will setup a custom domain configuration for deploy your site in the domain you own on Porkbun.

1. On GitHub, navigate to your site's repository.
1. Under your repository name, click Settings. If you cannot see the "Settings" tab, select the dropdown menu, then click Settings.
   ![Github repository settings](https://docs.github.com/assets/cb-28266/mw-1440/images/help/repository/repo-actions-settings.webp)
1. In the "Code and automation" section of the sidebar, click Pages.
1. Select GitHub Actions from the menu in the source section
1. Under "Custom domain", type your custom domain, then click Save.

And that's it! Thanks to GitHub pages when you will push some changes to the `main` branch you will have your Astro site updated!

You found this useful fell free to reach me on [Twitter](https://twitter.com/TheZalDev), [GitHub](https://github.com/TheZal) or [mail](mailto:rick.zal239@gmail.com) and to share it with your dev friends!
