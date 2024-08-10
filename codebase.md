# package.json

```json
{
  "name": "kevin-blog",
  "private": true,
  "description": "Kevin's collection of random scribblings",
  "version": "2.0.0",
  "author": "Kevin Fang <kevinfan@alumni.cmu.edu>",
  "dependencies": {
    "@supabase/supabase-js": "^2.44.4",
    "add": "^2.0.6",
    "ai-digest": "^1.0.4",
    "airtable": "^0.12.2",
    "classnames": "^2.5.1",
    "disqus-react": "^1.1.5",
    "dotenv": "^16.4.5",
    "gatsby": "^5.13.7",
    "gatsby-adapter-netlify": "^1.0.4",
    "gatsby-plugin-dark-mode": "^1.1.2",
    "gatsby-plugin-google-analytics": "^5.13.1",
    "gatsby-plugin-google-gtag": "^5.13.1",
    "gatsby-plugin-image": "^3.13.1",
    "gatsby-plugin-manifest": "^5.13.1",
    "gatsby-plugin-netlify": "^5.1.1",
    "gatsby-plugin-offline": "^6.13.2",
    "gatsby-plugin-sass": "^6.13.1",
    "gatsby-plugin-sharp": "^5.13.1",
    "gatsby-plugin-sitemap": "^6.13.1",
    "gatsby-remark-copy-linked-files": "^6.13.1",
    "gatsby-remark-images": "^7.13.1",
    "gatsby-remark-prismjs": "^7.13.1",
    "gatsby-remark-responsive-iframe": "^6.13.1",
    "gatsby-remark-smartypants": "^6.13.1",
    "gatsby-source-filesystem": "^5.13.1",
    "gatsby-transformer-remark": "^6.13.1",
    "gatsby-transformer-sharp": "^5.13.1",
    "gray-matter": "^4.0.3",
    "node-html-markdown": "^1.3.0",
    "prismjs": "^1.29.0",
    "ramda": "^0.30.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet": "^6.1.0",
    "sass": "^1.77.8",
    "typeface-barlow": "^1.1.13",
    "typeface-merriweather": "1.1.13",
    "typeface-montserrat": "1.1.13"
  },
  "devDependencies": {
    "gh-pages": "^6.1.1",
    "prettier": "^3.3.3"
  },
  "homepage": "https://github.com/abhaynikam/gatsby-nice-blog/blob/main/README.md",
  "keywords": [
    "gatsby"
  ],
  "license": "0BSD",
  "main": "n/a",
  "repository": {
    "type": "git",
    "url": "git@github.com:abhaynikam/gatsby-nice-blog.git"
  },
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1",
    "deploy": "gatsby build --prefix-paths && gh-pages -d public"
  }
}

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

```

# gatsby-node.js

```js
"use strict"

exports.createPages = require("./gatsby/create-pages")
exports.onCreateNode = require("./gatsby/on-create-node")
exports.createSchemaCustomization = require("./gatsby/create-schema-customization")

```

# gatsby-config.js

```js
const siteConfig = require("./config.js")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    author: siteConfig.author,
    description: siteConfig.description,
    siteUrl: siteConfig.url,
    social: siteConfig.author.social,
    // disqusShortname: siteConfig.disqusShortname,
  },
  pathPrefix: siteConfig.pathPrefix, // TODO: Add path prefix as github repository name to deploy to github pages.
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          siteConfig.googleAnalyticsId, // Google Analytics / GA
          // Removed the commented out tracking IDs as they're not needed
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // Removed optimize_id as it's likely not needed unless you're using Google Optimize
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true, // Changed to true for faster tracking initialization
          // Setting this parameter is optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Removed the origin option as it's typically not needed unless you're self-hosting the script
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-adapter-netlify`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `svg`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    // Keep the gatsby-plugin-manifest configuration as it is
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    "gatsby-plugin-dark-mode",

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

```

# gatsby-browser.js

```js
// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

// font
import "typeface-barlow"

```

# config.js

```js
"use strict"

module.exports = {
  url: `https://blog.kevinfang.tech`,
  description: `Fang's collection of random scribblings`,
  pathPrefix: "/",
  title: `Kevin Fang`,
  disqusShortname: "kevinfang",
  postsPerPage: 15,
  googleAnalyticsId: "G-ND9JXM8MQ3",
  useKatex: false,
  author: {
    name: `Kevin Fang `,
    summary: `| trying to be a better human`,
    social: {
      twitter: `kevinfangtastic`,
      github: `thesnakefang`,
      email: `kevinfan@alumni.cmu.edu`,
      linkedin: `hirekevinfang`,
      facebook: ``,
      instagram: `kevinfang.tech`,
    },
  },
}

```

# README.md

```md
<h1 align="center">
  Kevin's blog :rocket:
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/db2711d4-0da1-4866-a20e-b55a4820f152/deploy-status)](https://app.netlify.com/sites/playful-torrone-ce5870/deploys)

This blog is based on the original boilerplate blog template by [Abhay Nikam](https://www.abhaynikam.me/pages/about) at https://github.com/abhaynikam/gatsby-nice-blog

## Contributing (Template)

Bug reports and pull requests are welcome on GitHub at https://github.com/abhaynikam/gatsby-nice-blog. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/abhaynikam/gatsby-nice-blog/blob/master/CODE_OF_CONDUCT.md).

## License (Template)

The boilerplate blog template is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Contributors (Template)

[Chinmay Mehta](https://github.com/chinmaym07)

## Contributors (Blog)

[Kevin Fang](https://github.com/thesnakefang)

```

# CODE_OF_CONDUCT.md

```md
# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression,
level of experience, education, socio-economic status, nationality, personal
appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

## Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at nikam.abhay1@gmail.com. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see
https://www.contributor-covenant.org/faq

```

# .prettierrc

```
{
  "arrowParens": "avoid",
  "semi": false
}

```

# .prettierignore

```
.cache
package.json
package-lock.json
public

```

# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# dotenv environment variable files
.env*

# gatsby files
.cache/
public

# Mac files
.DS_Store

# Yarn
yarn-error.log
.pnp/
.pnp.js
# Yarn Integrity file
.yarn-integrity

# Environment
.env/
```

# .aidigestignore

```
node_modules/
public/
.cache/
./CODE_OF_CONDUCT.md
./codebase.md
LICENSE
```

# static/robots.txt

```txt
User-agent: *
Disallow:

Sitemap: https://blog.kevinfang.tech/sitemap-index.xml
```

# static/favicon.ico

This is a binary file of the type: Binary

# src/style.css

```css
/* CSS Custom Properties Definitions */

:root {
  --maxWidth-none: "none";
  --maxWidth-xs: 20rem;
  --maxWidth-sm: 24rem;
  --maxWidth-md: 28rem;
  --maxWidth-lg: 32rem;
  --maxWidth-xl: 36rem;
  --maxWidth-2xl: 42rem;
  --maxWidth-3xl: 48rem;
  --maxWidth-4xl: 56rem;
  --maxWidth-5xl: 64rem;
  --maxWidth-full: "100%";
  --maxWidth-wrapper: var(--maxWidth-5xl);
  --spacing-px: "1px";
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;
  --fontFamily-sans: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --fontFamily-serif: "Merriweather", "Georgia", Cambria, "Times New Roman",
    Times, serif;
  --fontFamily-raleway: 'Barlow', sans-serif;
  --font-body: var(--fontFamily-raleway);
  --font-heading: var(--fontFamily-raleway);
  --fontWeight-normal: 400;
  --fontWeight-medium: 500;
  --fontWeight-semibold: 600;
  --fontWeight-bold: 700;
  --fontWeight-extrabold: 800;
  --fontWeight-black: 900;
  --fontSize-root: 16px;
  --lineHeight-none: 1;
  --lineHeight-tight: 1.1;
  --lineHeight-normal: 1.5;
  --lineHeight-relaxed: 1.625;
  /* 1.200 Minor Third Type Scale */
  --fontSize-0: 0.833rem;
  --fontSize-1: 1rem;
  --fontSize-2: 1.2rem;
  --fontSize-3: 1.44rem;
  --fontSize-4: 1.728rem;
  --fontSize-5: 2.074rem;
  --fontSize-6: 2.488rem;
  --fontSize-7: 2.986rem;
  --color-primary: #ea4444;
  --color-text: #1a2c3d;
  --color-text-light: #4f5969;
  --color-heading: #1a202c;
  --color-heading-black: black;
  --color-accent: #d1dce5;
  --color-background: #fefcf8;
  --color-link: #3e8ec8;
  --color-bg-highlight: #f3efe5;

}

/* HTML elements */

*,
:after,
:before {
  box-sizing: border-box;
}

html {
  line-height: var(--lineHeight-normal);
  font-size: var(--fontSize-root);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  --color-background: #fefcf8;

  font-family: var(--font-body);
  font-size: var(--fontSize-2);
  font-weight: var(--fontWeight-medium);
  color: var(--color-text);
  background-color: var(--color-background);
  transition: all 1s ease 0s;
}

body.dark {
  -webkit-font-smoothing: antialiased;

  --color-background: #1a2c3d;
  --color-text: #fefcf8;
  --color-text-light: #d1dce5;
  --color-heading-black: #ea4444;
  --color-heading: #ea4444;
}


footer {
  font-size: var(--fontSize-1);
  padding: var(--spacing-6) var(--spacing-0);
}

hr {
  background: var(--color-accent);
  height: 1px;
  border: 0;
}

/* Heading */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
  margin-top: var(--spacing-12);
  margin-bottom: var(--spacing-6);
  line-height: var(--lineHeight-tight);
  letter-spacing: -0.025em;
}

h2,
h3,
h4,
h5,
h6 {
  font-weight: var(--fontWeight-bold);
  color: var(--color-heading);
}

h1 {
  font-weight: var(--fontWeight-black);
  font-size: var(--fontSize-6);
  color: var(--color-heading-black);
}

h2 {
  font-size: var(--fontSize-4);
  color: var(--color-heading-black);
  color: var(--color-heading-black);
}

h3 {
  font-size: var(--fontSize-4);
  color: var(--color-heading-black);
  color: var(--color-heading-black);
}

h4 {
  font-size: var(--fontSize-3);
}

h5 {
  font-size: var(--fontSize-2);
}

h6 {
  font-size: var(--fontSize-1);
}

h1 > a {
  color: inherit;
  text-decoration: none;
}

h2 > a,
h3 > a,
h4 > a,
h5 > a,
h6 > a {
  text-decoration: none;
  color: inherit;
}

/* Prose */

p {
  line-height: var(--lineHeight-relaxed);
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  margin: var(--spacing-0) var(--spacing-0) var(--spacing-8) var(--spacing-0);
  padding: var(--spacing-0);
}

ul,
ol {
  margin-left: var(--spacing-8);
  margin-right: var(--spacing-0);
  padding: var(--spacing-0);
  margin-bottom: var(--spacing-8);
  list-style-position: outside;
  list-style-image: none;
}

ul li,
ol li {
  padding-left: var(--spacing-0);
  margin-bottom: calc(var(--spacing-8) / 2);
}

li > p {
  margin-bottom: calc(var(--spacing-8) / 2);
}

li *:last-child {
  margin-bottom: var(--spacing-0);
}

li > ul {
  margin-left: var(--spacing-8);
  margin-top: calc(var(--spacing-8) / 2);
}

blockquote {
  color: var(--color-text-light);
  margin-left: calc(-1 * var(--spacing-6));
  margin-right: var(--spacing-8);
  padding: var(--spacing-0) var(--spacing-0) var(--spacing-0) var(--spacing-6);
  border-left: var(--spacing-1) solid var(--color-primary);
  font-size: var(--fontSize-2);
  font-style: italic;
  margin-bottom: var(--spacing-8);
}

blockquote > :last-child {
  margin-bottom: var(--spacing-0);
}

blockquote > ul,
blockquote > ol {
  list-style-position: inside;
}

table {
  width: 100%;
  margin-bottom: var(--spacing-8);
  border-collapse: collapse;
  border-spacing: 0.25rem;
}

table thead tr th {
  border-bottom: 1px solid var(--color-accent);
}

/* Link */

a {
  color: var(--color-primary);
}

a:hover,
a:focus {
  text-decoration: none;
}

/* Utility classes */

.mb-0 {
  margin-bottom: 0;
}

.d-flex {
  display: flex;
}

.w-16 {
  width: 16px;
}

.h-16 {
  height: 16px;
}

.pl-12 {
  padding-left: 12px;
}

/* Custom classes */

.global-wrapper {
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);
  padding: var(--spacing-10) var(--spacing-5);
}

.global-wrapper[data-is-root-path="true"] .bio {
  margin-bottom: var(--spacing-20);
}

.global-header {
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid;
  margin-bottom: var(--spacing-12);

}

.main-heading {
  font-size: var(--fontSize-7);
  margin: 0;
}

.post-list-item {
  margin-bottom: var(--spacing-8);
  margin-top: var(--spacing-8);
}

.post-list-item p {
  margin-bottom: var(--spacing-0);
}

.post-list-item h2 {
  font-size: var(--fontSize-4);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
  margin-top: var(--spacing-0);
}

.post-list-item header {
  margin-bottom: var(--spacing-4);
}

.header-link-home {
  font-weight: var(--fontWeight-bold);
  font-family: var(--font-heading);
  text-decoration: none;
  font-size: var(--fontSize-5);
}

.bio {
  display: flex;
}

.bio p {
  margin-bottom: var(--spacing-0);
}

.bio-avatar {
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
  min-width: 50px;
  border-radius: 100%;
}

.blog-post header h1 {
  margin: var(--spacing-0) var(--spacing-0) var(--spacing-4) var(--spacing-0);
}

.blog-post header h2 {
  margin: var(--spacing-0) var(--spacing-0) var(--spacing-4) var(--spacing-0);
}

.blog-post header p {
  font-size: var(--fontSize-2);
  font-family: var(--font-heading);
}

.blog-post-nav ul {
  margin: var(--spacing-0);

  li.blog-post-nav-prev {
    margin-bottom: 0;
    width: 50%;
    text-align: left;
  }

  li.blog-post-nav-next {
    margin-bottom: 0;
    width: 50%;
    text-align: right;
  }
}

.gatsby-highlight {
  margin-bottom: var(--spacing-8);
  font-size: 1rem !important;

  pre {
    background-color: var(--color-bg-highlight) !important;
  }
}

.language-text {
  padding-left: 10px !important;
  padding-right: 10px !important;
  font-size: 16px !important;
  background-color: var(--color-bg-highlight) !important;
}

/* Media queries */

@media (max-width: 42rem) {
  blockquote {
    padding: var(--spacing-0) var(--spacing-0) var(--spacing-0) var(--spacing-4);
    margin-left: var(--spacing-0);
  }
  ul,
  ol {
    list-style-position: inside;
  }
}


/* Pagniation */

.pagination {
  display: flex;

  &__prev {
    width: 50%;
    text-align: left;
    text-decoration: none;

    &-link {
      font-size: 26px;
      font-weight: bold;

      &:hover,
      &:focus {
        color: var(--color-primary);
      }

      &--disable {
        color: gray;
        pointer-events: none;
      }
    }
  }

  &__next {
    width: 50%;
    text-align: right;
    text-decoration: none;

    &-link {
      font-size: 26px;
      font-weight: bold;

      &:hover,
      &:focus {
        color: var(--color-primary);
      }

      &--disable {
        color: gray;
        pointer-events: none;
      }
    }
  }
}

.blog-list {
  list-style: none;
  margin-left: 0;

  .blog-list-item {
    margin-bottom: 0;
    display: flex;
    align-items: center;

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.category-section {
  border-bottom: 3px solid #ddd; /* Increased thickness */
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.category-section h2 {
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.post-list {
  list-style-type: none;
  padding: 0;
}

.post-list li {
  margin-bottom: 1rem;
}

.subscription-form {
  max-width: 500px;
  margin: 0 auto 30px;
  text-align: center;
}

.subscription-form form {
  display: flex;
  gap: 10px;
}

.subscription-form input {
  flex-grow: 1;
  padding: 12px 15px;
  border: none;
  border-bottom: 2px solid #ddd;
  background-color: #f8f8f8;
  transition: border-color 0.3s ease;
}

.subscription-form input:focus {
  outline: none;
  border-bottom-color: #ea4444;
}

.subscription-form button {
  padding: 12px 25px;
  background-color: #ea4444;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.subscription-form button:hover {
  background-color: #d63939;
}

.subscription-form button:active {
  transform: scale(0.98);
}

.subscription-form .tagline {
  font-size: 0.85em;
  color: #888;
  margin-top: 12px;
  text-align: center;
}

.subscription-form .message {
  margin-top: 12px;
  font-weight: 500;
  text-align: center;
  transition: opacity 0.3s ease;
}

.subscription-form .message.error {
  color: #d32f2f;
}

.subscription-form .message.success {
  color: #388e3c;
}

.copyright-text {
  width: 50%;
  text-align: left;
}

.footer-icon-group {
  width: 50%;
  text-align: right;
}

.footer-social-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  stroke-width: 0;
  stroke: var(--color-text);
  fill: var(--color-text);
  font-style: normal;
  font-weight: normal;
  margin-right: .2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: .2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover {
    fill: currentColor;
  }
}

.current-page-info {
  display: flex;
  justify-content: flex-end;
  font-size: var(--fontSize-0)
}

@media (max-width: 800px) {
  .blog-list-item{
    display: flex;
    flex-direction: column;

    a {
      width: 100%;
      text-align: center;
    }
  }
  .header-link-home{
    width: 70%;
    text-align: left;
  }

  .main-heading {
    width: 70%;
    text-align: left;
  }

  .header-nav-link{
    width: 15%;
    text-align: right;
  }

  .container {
    align-items: flex-start;
    width: 15%;
  }
}

@media (min-width: 801px) {
  .title {
    width: 80%;
    text-align: left;
  }

  .subheading {
    width: 60%;
    text-align: left;
  }

  .date {
    width: 20%;
    text-align: right;
  }

  .header-link-home, .main-heading{
    width: 75%;
    text-align: left;
  }

  .header-actions {
    display: flex;
    width: 100%;
    justify-content: flex-end;

    .header-nav-link{
      width: 15%;
      text-align: right;
    }
  }
}

@media (max-width: 350px) {
  .global-header {
    flex-direction: column;
  }

  .header-link-home, .main-heading {
    text-align: center;
    width: 100%;
  }

  .header-nav-link {
    text-align: center;
    width: 100%;
  }

  .header-actions {
    display: flex;
    width: 100%;
    justify-content: flex-end;

    .toggle-button {
      margin-top: 5px;
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
    }
  }
}

.header-actions {
  display: flex;
  width: 100%;
  justify-content: flex-end;

  .toggle-button {
    width: 40px;
    border: medium none;
    background: transparent none repeat scroll 0% 0%;
    cursor: pointer;
    outline: none;
  }

  .sun-moon:hover{
    opacity: 1;
  }

  .sun-moon{
    height: 22px;
  }
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

```

# src/normalize.css

```css
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input {
  /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select {
  /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}

```

# gatsby/on-create-node.js

```js
"use strict"

const { createFilePath } = require("gatsby-source-filesystem")

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

module.exports = onCreateNode

```

# gatsby/create-schema-customization.js

```js
"use strict"

const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      linkedin: String
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      subheading: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

module.exports = createSchemaCustomization

```

# gatsby/create-pages.js

```js
"use strict"

const path = require("path")
const createPostsPages = require("./pagination/create-posts-pages.js")

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // 404
  createPage({
    path: "/404",
    component: path.resolve("./src/templates/not-found-template.js"),
  })

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              subheading
              template
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    )
    return
  }

  const posts = result.data.allMarkdownRemark.edges
  if (posts.length > 0) {
    posts.forEach((postEdge, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]

      createPage({
        path: postEdge.node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: postEdge.node.fields.slug,
          previous,
          next,
        },
      })
    })
  }

  await createPostsPages(graphql, actions)
}

module.exports = createPages

```

# src/utils/update-slugs.js

```js
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), '../../content/blog')

console.log(`Scanning directory: ${postsDirectory}`)

fs.readdirSync(postsDirectory, { withFileTypes: true }).forEach(dirent => {
  if (dirent.isDirectory()) {
    const postDir = path.join(postsDirectory, dirent.name)
    const indexPath = path.join(postDir, 'index.md')
    
    if (fs.existsSync(indexPath)) {
      console.log(`Processing file: ${indexPath}`)
      
      const fileContents = fs.readFileSync(indexPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Check if the directory name matches the lowercase version
      if (dirent.name !== dirent.name.toLowerCase()) {
        const newDirName = dirent.name.toLowerCase()
        const newDirPath = path.join(postsDirectory, newDirName)
        
        // Rename the directory
        fs.renameSync(postDir, newDirPath)
        console.log(`Renamed directory from ${dirent.name} to ${newDirName}`)
        
        // Update the slug in the frontmatter if it exists
        if (data.slug) {
          data.slug = data.slug.toLowerCase()
          const updatedFileContents = matter.stringify(content, data)
          fs.writeFileSync(path.join(newDirPath, 'index.md'), updatedFileContents)
          console.log(`Updated slug in frontmatter for ${newDirName}`)
        }
      } else {
        console.log(`No changes needed for ${dirent.name}`)
      }
    } else {
      console.log(`No index.md found in ${dirent.name}`)
    }
  }
})

console.log('Script completed')
```

# src/utils/index.js

```js
export { default as getIcon } from "./get-icon"
export { default as getContactHref } from "./get-contact-href"

```

# src/utils/get-icon.js

```js
// @flow strict
import { ICONS } from "../constants"

const getIcon = name => {
  let icon

  switch (name) {
    case "twitter":
      icon = ICONS.TWITTER
      break
    case "github":
      icon = ICONS.GITHUB
      break
    case "vkontakte":
      icon = ICONS.VKONTAKTE
      break
    case "telegram":
      icon = ICONS.TELEGRAM
      break
    case "email":
      icon = ICONS.EMAIL
      break
    case "rss":
      icon = ICONS.RSS
      break
    case "linkedin":
      icon = ICONS.LINKEDIN
      break
    case "instagram":
      icon = ICONS.INSTAGRAM
      break
    case "line":
      icon = ICONS.LINE
      break
    case "facebook":
      icon = ICONS.FACEBOOK
      break
    case "gitlab":
      icon = ICONS.GITLAB
      break
    case "weibo":
      icon = ICONS.WEIBO
      break
    default:
      icon = {}
      break
  }

  return icon
}

export default getIcon

```

# src/utils/get-contact-href.js

```js
// @flow strict
const getContactHref = (name, contact) => {
  let href

  switch (name) {
    case "twitter":
      href = `https://www.twitter.com/${contact}`
      break
    case "github":
      href = `https://github.com/${contact}`
      break
    case "vkontakte":
      href = `https://vk.com/${contact}`
      break
    case "telegram":
      href = `https://t.me/${contact}`
      break
    case "email":
      href = `mailto:${contact}`
      break
    case "linkedin":
      href = `https://www.linkedin.com/in/${contact}`
      break
    case "instagram":
      href = `https://www.instagram.com/${contact}`
      break
    case "line":
      href = `line://ti/p/${contact}`
      break
    case "facebook":
      href = `https://www.facebook.com/${contact}`
      break
    case "gitlab":
      href = `https://www.gitlab.com/${contact}`
      break
    case "weibo":
      href = `https://www.weibo.com/${contact}`
      break
    default:
      href = contact
      break
  }

  return href
}

export default getContactHref

```

# src/templates/not-found-template.js

```js
// @flow strict
import React from "react"
import { useSiteMetadata } from "../hooks"

import Seo from "../components/seo"
import Layout from "../components/layout"

const NotFoundTemplate = ({ location }) => {
  const { title } = useSiteMetadata()

  return (
    <Layout location={location} title={title}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundTemplate

```

# src/templates/index-template.js

```js
import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/pagination"
import SubscriptionForm from "../components/subscription-form"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const groups = data.allMarkdownRemark.group
  const totalCount = data.allMarkdownRemark.totalCount
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
    totalPages,
  } = pageContext
  const currentPageInfo = currentPage > 0 ? `Page ${currentPage}` : ""

  if (totalCount === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={siteTitle} />
        <SubscriptionForm />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteTitle} />
      <SubscriptionForm />
      {groups.map(group => (
        <div key={group.fieldValue} className="category-section">
          <h2>{group.fieldValue}</h2>
          <ul className="post-list">
            {group.nodes.map(node => (
              <li key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  <h3>{node.frontmatter.title}</h3>
                </Link>
                <small>{node.frontmatter.date}</small>
                <p>{node.frontmatter.description || node.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="current-page-info">{currentPageInfo}</div>
      <Pagination
        prevPagePath={prevPagePath}
        nextPagePath={nextPagePath}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        isFirstPage={currentPage === 0}
        isLastPage={currentPage === totalPages - 1}
        totalPages={totalPages}
      />
    </Layout>
  )
}

export default BlogIndex

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { template: { eq: "post" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            description
            category
          }
        }
      }
    }
  }
`

```

# src/templates/blog-post.js

```js
import React from "react"
import { Link, graphql } from "gatsby"
// import { DiscussionEmbed } from "disqus-react";

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SubscriptionForm from "../components/subscription-form"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { title: siteTitle, slug } = data.site.siteMetadata
  const { previous, next } = pageContext
  const isPostTemplate = post.frontmatter.template === "post"
  const isNextPostTemplate = next && next.node.frontmatter.template === "post"
  /* const disqusConfig = {
    shortname: disqusShortname,
    config: { identifier: slug, title: post.frontmatter.title},
  } */

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        description={post.frontmatter.description || post.excerpt}
      />
      <article itemScope className="blog-post">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <h2 itemProp="subheading">{post.frontmatter.subheading}</h2>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
      {isPostTemplate && (
        <>
          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li className="blog-post-nav-prev">
                {previous && (
                  <Link to={previous.node.fields.slug} rel="prev">
                    ← {previous.node.frontmatter.title}
                  </Link>
                )}
              </li>
              {isNextPostTemplate && (
                <li className="blog-post-nav-next">
                  {next && (
                    <Link to={next.node.fields.slug} rel="next">
                      {next.node.frontmatter.title} →
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </nav>
          <hr />
        </>
      )}
      <SubscriptionForm />

      {isPostTemplate && (
        <footer>
          <Bio />
        </footer>
      )}
    </Layout>
  )
}

/*  {isPostTemplate && (<DiscussionEmbed {...disqusConfig} />)} */

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        subheading
        description
        template
      }
    }
  }
`

```

# src/pages/using-typescript.tsx

```tsx
// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type DataProps = {
  site: {
    buildTime: string
  }
}

const UsingTypescript: React.FC<PageProps<DataProps>> = ({
  data,
  path,
  location,
}) => (
  <Layout title="Using TypeScript" location={location}>
    <Seo title="Using TypeScript" />
    <h1>Gatsby supports TypeScript by default!</h1>
    <p>
      This means that you can create and write <em>.ts/.tsx</em> files for your
      pages, components etc. Please note that the <em>gatsby-*.js</em> files
      (like gatsby-node.js) currently don't support TypeScript yet.
    </p>
    <p>
      For type checking you'll want to install <em>typescript</em> via npm and
      run <em>tsc --init</em> to create a <em>.tsconfig</em> file.
    </p>
    <p>
      You're currently on the page "{path}" which was built on{" "}
      {data.site.buildTime}.
    </p>
    <p>
      To learn more, head over to our{" "}
      <a href="https://www.gatsbyjs.com/docs/typescript/">
        documentation about TypeScript
      </a>
      .
    </p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default UsingTypescript

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`

```

# src/hooks/use-site-metadata.js

```js
// @flow strict
import { useStaticQuery, graphql } from "gatsby"

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          author {
            name
          }
          social {
            github
            linkedin
            email
          }
        }
      }
    }
  `)

  return site.siteMetadata
}

export default useSiteMetadata

```

# src/hooks/index.js

```js
export { default as useSiteMetadata } from "./use-site-metadata"

```

# src/constants/pagination.js

```js
// @flow strict
const PAGINATION = {
  PREV_PAGE: "← PREV ",
  NEXT_PAGE: " → NEXT",
}

export default PAGINATION

```

# src/constants/index.js

```js
export { default as ICONS } from "./icons"
export { default as PAGINATION } from "./pagination"

```

# src/constants/icons.js

```js
// @flow strict
const ICONS = {
  TWITTER: {
    path: "M25.312 6.375c-0.688 1-1.547 1.891-2.531 2.609 0.016 0.219 0.016 0.438 0.016 0.656 0 6.672-5.078 14.359-14.359 14.359-2.859 0-5.516-0.828-7.75-2.266 0.406 0.047 0.797 0.063 1.219 0.063 2.359 0 4.531-0.797 6.266-2.156-2.219-0.047-4.078-1.5-4.719-3.5 0.313 0.047 0.625 0.078 0.953 0.078 0.453 0 0.906-0.063 1.328-0.172-2.312-0.469-4.047-2.5-4.047-4.953v-0.063c0.672 0.375 1.453 0.609 2.281 0.641-1.359-0.906-2.25-2.453-2.25-4.203 0-0.938 0.25-1.797 0.688-2.547 2.484 3.062 6.219 5.063 10.406 5.281-0.078-0.375-0.125-0.766-0.125-1.156 0-2.781 2.25-5.047 5.047-5.047 1.453 0 2.766 0.609 3.687 1.594 1.141-0.219 2.234-0.641 3.203-1.219-0.375 1.172-1.172 2.156-2.219 2.781 1.016-0.109 2-0.391 2.906-0.781z",
    viewBox: "0 0 26 28",
  },
  FACEBOOK: {
    path: "M14.984 0.187v4.125h-2.453c-1.922 0-2.281 0.922-2.281 2.25v2.953h4.578l-0.609 4.625h-3.969v11.859h-4.781v-11.859h-3.984v-4.625h3.984v-3.406c0-3.953 2.422-6.109 5.953-6.109 1.687 0 3.141 0.125 3.563 0.187z",
    viewBox: "0 0 16 28",
  },
  TELEGRAM: {
    path: "M27.563 0.172c0.328 0.234 0.484 0.609 0.422 1l-4 24c-0.047 0.297-0.234 0.547-0.5 0.703-0.141 0.078-0.313 0.125-0.484 0.125-0.125 0-0.25-0.031-0.375-0.078l-7.078-2.891-3.781 4.609c-0.187 0.234-0.469 0.359-0.766 0.359-0.109 0-0.234-0.016-0.344-0.063-0.391-0.141-0.656-0.516-0.656-0.938v-5.453l13.5-16.547-16.703 14.453-6.172-2.531c-0.359-0.141-0.594-0.469-0.625-0.859-0.016-0.375 0.172-0.734 0.5-0.922l26-15c0.156-0.094 0.328-0.141 0.5-0.141 0.203 0 0.406 0.063 0.562 0.172z",
    viewBox: "0 0 28 28",
  },
  VKONTAKTE: {
    path: "M29.953 8.125c0.234 0.641-0.5 2.141-2.344 4.594-3.031 4.031-3.359 3.656-0.859 5.984 2.406 2.234 2.906 3.313 2.984 3.453 0 0 1 1.75-1.109 1.766l-4 0.063c-0.859 0.172-2-0.609-2-0.609-1.5-1.031-2.906-3.703-4-3.359 0 0-1.125 0.359-1.094 2.766 0.016 0.516-0.234 0.797-0.234 0.797s-0.281 0.297-0.828 0.344h-1.797c-3.953 0.25-7.438-3.391-7.438-3.391s-3.813-3.938-7.156-11.797c-0.219-0.516 0.016-0.766 0.016-0.766s0.234-0.297 0.891-0.297l4.281-0.031c0.406 0.063 0.688 0.281 0.688 0.281s0.25 0.172 0.375 0.5c0.703 1.75 1.609 3.344 1.609 3.344 1.563 3.219 2.625 3.766 3.234 3.437 0 0 0.797-0.484 0.625-4.375-0.063-1.406-0.453-2.047-0.453-2.047-0.359-0.484-1.031-0.625-1.328-0.672-0.234-0.031 0.156-0.594 0.672-0.844 0.766-0.375 2.125-0.391 3.734-0.375 1.266 0.016 1.625 0.094 2.109 0.203 1.484 0.359 0.984 1.734 0.984 5.047 0 1.062-0.203 2.547 0.562 3.031 0.328 0.219 1.141 0.031 3.141-3.375 0 0 0.938-1.625 1.672-3.516 0.125-0.344 0.391-0.484 0.391-0.484s0.25-0.141 0.594-0.094l4.5-0.031c1.359-0.172 1.578 0.453 1.578 0.453z",
    viewBox: "0 0 31 28",
  },
  GITHUB: {
    path: "M13,2.4c-7.2,0-13,5.8-13,13C0,21,3.7,25.9,8.9,27.6c0.6,0.1,0.9-0.3,0.9-0.6c0-0.3,0-1.1,0-2.2  c-3.6,0.8-4.4-1.7-4.4-1.7c-0.6-1.5-1.4-1.9-1.4-1.9C2.8,20.4,4,20.4,4,20.4c1.3,0.1,2,1.3,2,1.3c1.2,2,3,1.4,3.8,1.1  c0.1-0.8,0.5-1.4,0.8-1.7c-2.9-0.3-5.9-1.4-5.9-6.4c0-1.4,0.5-2.6,1.3-3.5c-0.1-0.3-0.6-1.6,0.1-3.4c0,0,1.1-0.3,3.6,1.3  c1-0.3,2.1-0.4,3.2-0.4c1.1,0,2.2,0.1,3.2,0.4c2.5-1.7,3.6-1.3,3.6-1.3c0.7,1.8,0.3,3.1,0.1,3.4c0.8,0.9,1.3,2.1,1.3,3.5  c0,5-3,6.1-5.9,6.4c0.5,0.4,0.9,1.2,0.9,2.4c0,1.7,0,3.1,0,3.6c0,0.3,0.2,0.8,0.9,0.6c5.1-1.7,8.9-6.6,8.9-12.3  C25.9,8.2,20.1,2.4,13,2.4z",
    viewBox: "0 0 26 28",
  },
  EMAIL: {
    path: "M26 23.5v-12c-0.328 0.375-0.688 0.719-1.078 1.031-2.234 1.719-4.484 3.469-6.656 5.281-1.172 0.984-2.625 2.188-4.25 2.188h-0.031c-1.625 0-3.078-1.203-4.25-2.188-2.172-1.813-4.422-3.563-6.656-5.281-0.391-0.313-0.75-0.656-1.078-1.031v12c0 0.266 0.234 0.5 0.5 0.5h23c0.266 0 0.5-0.234 0.5-0.5zM26 7.078c0-0.391 0.094-1.078-0.5-1.078h-23c-0.266 0-0.5 0.234-0.5 0.5 0 1.781 0.891 3.328 2.297 4.438 2.094 1.641 4.188 3.297 6.266 4.953 0.828 0.672 2.328 2.109 3.422 2.109h0.031c1.094 0 2.594-1.437 3.422-2.109 2.078-1.656 4.172-3.313 6.266-4.953 1.016-0.797 2.297-2.531 2.297-3.859zM28 6.5v17c0 1.375-1.125 2.5-2.5 2.5h-23c-1.375 0-2.5-1.125-2.5-2.5v-17c0-1.375 1.125-2.5 2.5-2.5h23c1.375 0 2.5 1.125 2.5 2.5z",
    viewBox: "0 0 28 28",
  },
  RSS: {
    path: "M6 21c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM14 22.922c0.016 0.281-0.078 0.547-0.266 0.75-0.187 0.219-0.453 0.328-0.734 0.328h-2.109c-0.516 0-0.938-0.391-0.984-0.906-0.453-4.766-4.234-8.547-9-9-0.516-0.047-0.906-0.469-0.906-0.984v-2.109c0-0.281 0.109-0.547 0.328-0.734 0.172-0.172 0.422-0.266 0.672-0.266h0.078c3.328 0.266 6.469 1.719 8.828 4.094 2.375 2.359 3.828 5.5 4.094 8.828zM22 22.953c0.016 0.266-0.078 0.531-0.281 0.734-0.187 0.203-0.438 0.313-0.719 0.313h-2.234c-0.531 0-0.969-0.406-1-0.938-0.516-9.078-7.75-16.312-16.828-16.844-0.531-0.031-0.938-0.469-0.938-0.984v-2.234c0-0.281 0.109-0.531 0.313-0.719 0.187-0.187 0.438-0.281 0.688-0.281h0.047c5.469 0.281 10.609 2.578 14.484 6.469 3.891 3.875 6.188 9.016 6.469 14.484z",
    viewBox: "0 0 22 28",
  },
  LINKEDIN: {
    path: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
    viewBox: "0 0 24 24",
  },
  INSTAGRAM: {
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    viewBox: "0 0 24 24",
  },
  LINE: {
    path: "M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.104.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065l-.001-.001-.002-.002-.001-.001-.003-.003c-.04-.042-.065-.099-.065-.161v-5.229c0-.129.104-.234.233-.234h.842zm14.992 0c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.883h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.884h2.287c.129 0 .233.105.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.12-.025-.162-.065l-.003-.004-.003-.003c-.04-.042-.066-.099-.066-.161v-5.229c0-.062.025-.119.065-.161l.004-.004.003-.003c.042-.04.099-.066.162-.066h3.363zm-10.442.001c.129 0 .234.104.234.233v5.229c0 .128-.105.233-.234.233h-.842c-.129 0-.234-.105-.234-.233v-5.229c0-.129.105-.233.234-.233h.842zm2.127 0h.008l.012.001.013.001.01.001.013.003.008.003.014.004.008.003.013.006.007.003.013.007.007.004.012.009.006.004.013.011.004.004.014.014.002.002.018.023 2.396 3.236v-3.106c0-.129.105-.233.234-.233h.841c.13 0 .234.104.234.233v5.229c0 .128-.104.233-.234.233h-.841l-.06-.008-.004-.001-.015-.005-.007-.003-.012-.004-.011-.006-.007-.003-.014-.009-.002-.002-.06-.058-2.399-3.24v3.106c0 .128-.104.233-.234.233h-.841c-.129 0-.234-.105-.234-.233v-5.229c0-.129.105-.233.234-.233h.841z",
    viewBox: "0 0 24 24",
  },
  GITLAB: {
    path: "M 38.011719 4 C 37.574219 3.996094 37.183594 4.273438 37.046875 4.691406 L 32.074219 20 L 17.925781 20 L 12.953125 4.691406 C 12.820313 4.289063 12.449219 4.011719 12.023438 4 C 11.597656 3.992188 11.214844 4.25 11.0625 4.648438 L 5.070313 20.640625 C 5.066406 20.640625 5.066406 20.644531 5.0625 20.648438 L 2.0625 28.648438 C 1.90625 29.070313 2.046875 29.542969 2.414063 29.808594 L 24.40625 45.800781 L 24.410156 45.808594 C 24.414063 45.808594 24.414063 45.808594 24.414063 45.8125 C 24.425781 45.820313 24.441406 45.828125 24.453125 45.835938 C 24.46875 45.84375 24.480469 45.855469 24.496094 45.863281 C 24.5 45.863281 24.5 45.867188 24.503906 45.867188 C 24.503906 45.867188 24.507813 45.871094 24.511719 45.871094 C 24.515625 45.875 24.519531 45.878906 24.527344 45.878906 C 24.53125 45.882813 24.539063 45.886719 24.542969 45.890625 C 24.5625 45.898438 24.585938 45.910156 24.609375 45.917969 C 24.609375 45.917969 24.609375 45.917969 24.609375 45.921875 C 24.632813 45.929688 24.65625 45.9375 24.675781 45.945313 C 24.679688 45.945313 24.679688 45.945313 24.683594 45.949219 C 24.699219 45.953125 24.714844 45.957031 24.734375 45.964844 C 24.742188 45.964844 24.75 45.96875 24.761719 45.96875 C 24.761719 45.972656 24.761719 45.972656 24.761719 45.96875 C 24.78125 45.976563 24.800781 45.980469 24.820313 45.984375 C 24.847656 45.988281 24.871094 45.992188 24.898438 45.996094 C 24.9375 45.996094 24.980469 46 25.019531 46 C 25.058594 45.996094 25.09375 45.996094 25.128906 45.988281 C 25.144531 45.988281 25.15625 45.988281 25.171875 45.984375 C 25.171875 45.984375 25.175781 45.984375 25.179688 45.984375 C 25.1875 45.980469 25.191406 45.980469 25.199219 45.980469 C 25.203125 45.980469 25.207031 45.976563 25.214844 45.976563 C 25.222656 45.972656 25.234375 45.972656 25.242188 45.96875 C 25.257813 45.964844 25.269531 45.960938 25.28125 45.957031 C 25.289063 45.957031 25.292969 45.957031 25.296875 45.953125 C 25.300781 45.953125 25.304688 45.953125 25.308594 45.953125 C 25.324219 45.945313 25.34375 45.9375 25.359375 45.933594 C 25.378906 45.925781 25.394531 45.917969 25.410156 45.910156 C 25.414063 45.910156 25.414063 45.910156 25.417969 45.90625 C 25.421875 45.90625 25.425781 45.90625 25.429688 45.902344 C 25.4375 45.898438 25.445313 45.894531 25.453125 45.890625 C 25.476563 45.878906 25.496094 45.867188 25.515625 45.855469 C 25.523438 45.851563 25.527344 45.847656 25.53125 45.84375 C 25.535156 45.84375 25.539063 45.839844 25.542969 45.839844 C 25.558594 45.828125 25.574219 45.820313 25.589844 45.808594 L 25.597656 45.796875 L 47.589844 29.808594 C 47.953125 29.542969 48.09375 29.070313 47.9375 28.648438 L 44.945313 20.675781 C 44.941406 20.667969 44.9375 20.65625 44.9375 20.648438 L 38.9375 4.648438 C 38.789063 4.261719 38.425781 4.003906 38.011719 4 Z M 8.066406 22 L 16.472656 22 L 22.328125 40.015625 Z M 33.527344 22 L 41.933594 22 L 27.671875 40.015625 Z M 6.3125 23.007813 L 19.6875 39.902344 L 4.203125 28.640625 Z M 43.6875 23.007813 L 45.796875 28.640625 L 30.3125 39.902344 Z",
    viewBox: "0 0 50 50",
  },
  WEIBO: {
    path: "M 16.28125 3.8125 C 16.054688 3.828125 15.816406 3.859375 15.59375 3.90625 C 15.179688 3.996094 14.910156 4.402344 15 4.8125 C 15.085938 5.226563 15.492188 5.496094 15.90625 5.40625 C 17.179688 5.136719 18.566406 5.53125 19.5 6.5625 C 20.433594 7.597656 20.679688 9.011719 20.28125 10.25 C 20.152344 10.652344 20.378906 11.089844 20.78125 11.21875 C 21.183594 11.347656 21.617188 11.121094 21.75 10.71875 C 22.3125 8.976563 21.96875 7.015625 20.65625 5.5625 C 19.671875 4.46875 18.296875 3.875 16.9375 3.8125 C 16.710938 3.800781 16.507813 3.796875 16.28125 3.8125 Z M 10.0625 6.09375 C 8.667969 6.242188 6.699219 7.332031 4.96875 9.0625 C 3.082031 10.949219 2 12.957031 2 14.6875 C 2 17.996094 6.226563 20 10.375 20 C 15.8125 20 19.4375 16.820313 19.4375 14.3125 C 19.4375 12.796875 18.179688 11.949219 17.03125 11.59375 C 16.75 11.507813 16.539063 11.464844 16.6875 11.09375 C 17.007813 10.289063 17.066406 9.589844 16.71875 9.09375 C 16.070313 8.164063 14.253906 8.210938 12.21875 9.0625 C 12.21875 9.0625 11.585938 9.351563 11.75 8.84375 C 12.0625 7.835938 12.019531 6.988281 11.53125 6.5 C 11.1875 6.152344 10.695313 6.027344 10.0625 6.09375 Z M 16.8125 6.5 C 16.589844 6.488281 16.375 6.515625 16.15625 6.5625 C 15.800781 6.636719 15.578125 7.019531 15.65625 7.375 C 15.734375 7.730469 16.082031 7.953125 16.4375 7.875 C 16.863281 7.785156 17.34375 7.902344 17.65625 8.25 C 17.96875 8.597656 18.042969 9.054688 17.90625 9.46875 C 17.792969 9.816406 17.964844 10.199219 18.3125 10.3125 C 18.660156 10.421875 19.046875 10.253906 19.15625 9.90625 C 19.429688 9.058594 19.265625 8.085938 18.625 7.375 C 18.144531 6.84375 17.476563 6.53125 16.8125 6.5 Z M 10.8125 10.90625 C 13.582031 11.003906 15.8125 12.378906 16 14.28125 C 16.214844 16.457031 13.71875 18.484375 10.40625 18.8125 C 7.09375 19.140625 4.214844 17.640625 4 15.46875 C 3.785156 13.292969 6.316406 11.265625 9.625 10.9375 C 10.039063 10.898438 10.417969 10.890625 10.8125 10.90625 Z M 8.9375 13 C 7.804688 13.101563 6.734375 13.75 6.25 14.6875 C 5.589844 15.964844 6.242188 17.378906 7.75 17.84375 C 9.308594 18.324219 11.140625 17.597656 11.78125 16.21875 C 12.410156 14.871094 11.605469 13.472656 10.0625 13.09375 C 9.691406 13 9.316406 12.964844 8.9375 13 Z M 8.21875 15.0625 C 8.351563 15.066406 8.472656 15.109375 8.59375 15.15625 C 9.082031 15.355469 9.234375 15.878906 8.9375 16.34375 C 8.632813 16.804688 7.988281 17.027344 7.5 16.8125 C 7.019531 16.601563 6.882813 16.074219 7.1875 15.625 C 7.414063 15.289063 7.824219 15.058594 8.21875 15.0625 Z",
    viewBox: "2 2 19 19",
  },
}

export default ICONS

```

# src/components/subscription-form.js

```js
import React, { useState } from "react";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      if (error.message === "Email already exists") {
        setMessage("This email is already subscribed.");
      } else {
        setMessage("An error occurred. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="subscription-form">
      <h2>Subscribe for Updates</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p className="tagline">
        Will never sell your data or spam you. Pinky promise :)
      </p>
      {message && (
        <p
          className={`message ${
            message.includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SubscriptionForm;
```

# src/components/subscription-form-supabase.js

```js
import React, { useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(
  process.env.GATSBY_SUPABASE_URL,
  process.env.GATSBY_SUPABASE_ANON_KEY,
)

const SubscriptionForm = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.")
      return
    }

    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .insert([{ email }])

      if (error) throw error

      setMessage("Thank you for subscribing!")
      setEmail("")
    } catch (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        setMessage("This email is already subscribed.")
      } else {
        setMessage("An error occurred. Please try again.")
        console.error("Error:", error)
      }
    }
  }

  return (
    <div className="subscription-form">
      <h2>Subscribe for Updates</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p className="tagline">
        Will never sell your data or spam you. Pinky promise :)
      </p>
      {message && (
        <p
          className={`message ${message.includes("error") ? "error" : "success"}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default SubscriptionForm

```

# src/components/seo.js

```js
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
          }
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | Blog` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1.0`,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

```

# src/components/pagination.js

```js
import React from "react"
import { Link } from "gatsby"
import { PAGINATION } from "../constants"

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasPrevPage,
  hasNextPage,
  isFirstPage,
  isLastPage,
  totalPages,
}) => {
  if (totalPages === 1) {
    return null // Don't render pagination if there's only one page
  }

  return (
    <div className={"pagination"}>
      <div className={"pagination__prev"}>
        {!isFirstPage && hasPrevPage && (
          <Link rel="prev" to={prevPagePath} className="pagination__prev-link">
            {PAGINATION.PREV_PAGE}
          </Link>
        )}
      </div>
      <div className={"pagination__next"}>
        {!isLastPage && hasNextPage && (
          <Link rel="next" to={nextPagePath} className="pagination__next-link">
            {PAGINATION.NEXT_PAGE}
          </Link>
        )}
      </div>
    </div>
  )
}

export default Pagination

```

# src/components/layout.js

```js
import React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import FooterSocialIcons from "./footer-social-icons"
import MoonSvg from "../assets/moon.svg"
import SunSvg from "../assets/sun.svg"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let headerSiteText

  if (isRootPath) {
    headerSiteText = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    headerSiteText = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <header className="global-header">
            {headerSiteText}
            <div className="header-actions">
              <Link className="header-nav-link" to="/pages/about/">
                About
              </Link>
              <button
                className="toggle-button header-nav-link"
                onClick={e => toggleTheme(theme === "light" ? "dark" : "light")}
              >
                <img
                  src={theme === "dark" ? SunSvg : MoonSvg}
                  alt="toggle theme"
                  className="sun-moon"
                />
              </button>
            </div>
          </header>
          <main>{children}</main>
          <footer className="d-flex">
            <div className="copyright-text">
              💙 Make a donation to&nbsp;
              <a href="https://reproductiverights.org/">reproductive rights</a>
            </div>
            <div className="footer-icon-group">
              <FooterSocialIcons />
            </div>
          </footer>
        </div>
      )}
    </ThemeToggler>
  )
}

export default Layout

```

# src/components/footer-social-icons.js

```js
import React from "react"
import { getContactHref, getIcon } from "../utils"
import { useSiteMetadata } from "../hooks"

const FooterSocialIcons = () => {
  const { social } = useSiteMetadata()

  return Object.keys(social).map(name => {
    const contact = getIcon(name)

    return (
      <a
        key={name}
        href={getContactHref(name, social[name])}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`${name} social link`}
      >
        <svg viewBox={contact.viewBox} className="footer-social-icon">
          <title>{name}</title>
          <path d={contact.path} />
        </svg>
        <span className="sr-only">{name}</span>
      </a>
    )
  })
}

export default FooterSocialIcons

```

# src/components/bio.js

```js
/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            linkedin
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div className="bio">
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
        </p>
      )}
    </div>
  )
}

export default Bio

```

# src/assets/sun.svg

This is a file of the type: SVG Image

# src/assets/moon.svg

This is a file of the type: SVG Image

# src/api/subscribe.js

```js
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_API_KEY }).base(process.env.GATSBY_AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = JSON.parse(req.body);

  try {
    // Check if email already exists
    const existingRecords = await base('Subscriptions').select({
      filterByFormula: `{Email} = '${email}'`
    }).firstPage();

    if (existingRecords.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // If email doesn't exist, create a new record
    const createdRecords = await base('Subscriptions').create([
      {
        fields: {
          Email: email
        }
      }
    ]);

    res.status(200).json({ 
      message: 'Subscription successful', 
      id: createdRecords[0].id 
    });
  } catch (error) {
    console.error('Airtable Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
```

# gatsby/pagination/create-posts-pages.js

```js
"use strict"

const path = require("path")
const siteConfig = require("../../config.js")

module.exports = async (graphql, actions) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
        totalCount
      }
    }
  `)

  const { postsPerPage } = siteConfig
  const numPages = Math.ceil(
    result.data.allMarkdownRemark.totalCount / postsPerPage,
  )

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? "/" : `/page/${i}`,
      component: path.resolve("./src/templates/index-template.js"),
      context: {
        currentPage: i,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: i <= 1 ? "/" : `/page/${i - 1}`,
        nextPagePath: `/page/${i + 1}`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPages - 1,
        isFirstPage: i === 0,
        isLastPage: i === numPages - 1,
        totalPages: numPages,
      },
    })
  }
}

```

# content/pages/about.md

```md
---
title: "About me"
template: "page"
---

Hello, I'm Kevin.
‍
Thank you for taking a look at my blog.

I'm a honors graduate of Carnegie Mellon University with majors in Computer Science and Business Administration. Forgot everything I learned though.

Interests include lunar rover landing site viewshed analysis, ballroom dance, interior design, the color #7fc6b8, and spending 14 hours creating this stupid blog.

Currently GTM @ Replo (YC S21). Also working on an idea for a pricing model for content creator partnerships with sponsors + auto-email negotiation.

If you want to chat, come on a podcast, or show me AI that will actually take my job, contact me at kevinfan@alumni.cmu.edu 🚀

```

# content/assets/profile-pic.png

This is a binary file of the type: Image

# content/assets/gatsby-icon.png

This is a binary file of the type: Image

# content/blog/2021-08-15_the-college-application-spike-is-dumb-now-what/index.md

```md
---
title: "The College Application 'Spike' Is Dumb. Now What?"
subheading: "How to be admitted to top universities, the better way."
description: "'Spike,' is a myopic way to view the extracurricular process for college admissions, and promoting one-size-fits-all strategies is harmful to students."
date: "2021-08-15T22:02:23.623Z"
template: post
category: "College & Career"
---

![](./0__K9oimv5dJjn1yQTK.jpg)

To preface, this is the continuation of an article I wrote about a year back, titled "[What Is A College Application "Spike" And Should I Have One?](https://medium.com/college-admissions-central/what-is-a-college-application-spike-and-should-i-have-one-b7e776e92f09)". It remains to this day on of my most visited articles, likely due to PageRank placing it as a top search result — above that of the college consulting companies'.

Thanks, Google.

It's no secret that I don't like the term "Spike," enough at least to take the time our of my day to write article about a semi-obscure American college application term (read that piece first if you haven't yet). In my view, it is a horrifically misused term that reflected a culture of petty gamesmanship which complete and utterly missed the point.

Sure, if doing great things is a spike, then having spikes is great — but so often it becomes a way to hyper-focus all activities solely on the field one wishes to study, ignoring "little" extracurriculars for singular gambles into restrictive high-risk/high reward ventures.

Even the name, "Spike," rather than "Spike(s)," suggests the ideal way for the average candidate to be admitted into a university is to complete one particular, perfect moonshot, which will somehow on completion conduct absolution on one's past sins and spear them up into Ivy League heaven.

That's right, a lifetime of abject mediocrity can be salvaged. Finally earn the love of your parents and that elusive green light shining at the end of the dock. Just pay us, a dodgy service with questionable sources and unverified consultants, for our online workshops and opaque 1-on-1s. It's _only_ $45,000 or some other very reasonable figure, after all — just imagine how much more your child will make as an Ivy League graduate.

The issue with attacking an established belief is that I will be asked to present an alternative. If a "Spike" is an incorrect way to view one's extracurriculars, then, critics demand, _"What do you have instead?"_

To be frank, I don't feel qualified enough to give an answer that works for every single student.

I'm not an admissions officer, just a college undergrad (note: now a college graduate)— attempting to create a "[theory of everything](https://mitadmissions.org/blogs/entry/there_is_no_formula/)" which sums up the admissions process into a single set of directions is impossible, and attempting to do is like building a Youtube channel calling out scammers and then turning around to sell a $15k course on dropshipping.

Any strategy which works for all necessarily is too broad to be specifically applicable. Certainly, there are plenty of such "universal truths" — talk about yourself, be descriptive, avoid complicated metaphors, look to the future, cultivate an identity, write with maturity — yet those do not represent the step-by-step instructions or "secret tricks" readers wish to see.

If you're looking for a perfect replacement for the "Spike," you should close this article now — or just read [Applying Sideways](https://mitadmissions.org/blogs/entry/applying_sideways/) again. Otherwise, let's talk about what works.

To begin, let me tell you about the fundamentals of college applications, starting with how you talk to them.

- Universities look for many different types of people to round out their ideal image for next year's diverse student body.
- While basic requirements (such as knowing students will not fail our of college) must be met through GPA/tests, _everything else is subjective_.
- Your goal is to sell yourself as representing an identity inside of that idealized vision — or being so outstanding they create that niche for you.
- To do so, you'll need to first find what aspects of your character and profile, figure out how it "fits in", and tell that in a compelling manner.

Everyone has at one point in their lives sold or advocated for something. This ability is crucial in all stages of life, from acing a job interview to getting extra grant money from the dean to chatting up that cute stranger at the coffee shop. Knowing who you are, understanding how your unique set of traits, skills, and life experiences can be presented in a riveting manner that promises to bring joy and value to anyone you engage with — that will make you stand out anywhere.

That's storytelling.

There's a reason the most watched America's Got Talent contestants are the ones with tragic backstories, compelling underdog narratives, and inspiring ambitions. Don't get it twisted, you still need to knock it out of that park with the Adele cover after, but having an emotional aspect creates the empathy and connection necessary to move an application reader to fight for you in committee.

Here's some examples:

> Mike used his skill in website design, the character traits of creativity and humor, and his interest in poetry to create the annual "Worst Opening Sentence Competition," a [now-viral online tongue-in-cheek contest](https://www.bulwer-lytton.com/) to create a deliberately bad sentence to begin a novel or work of fiction, which got thousands of submissions! He's hoping to major in journalism and one day work at a online paper where he can devise interactive games and activities to help balance out the heavy news of the day.

> Mariam is an adventurous person. She enjoys rock climbing with her mother and uncle on weekends and hosts fantasy D&D campaigns on her YouTube channel, CrucialRepresentation. Mariam's confidence and charisma lead her to pursue an active role in environmental conservationism, speaking up at town halls and state assemblies. She is led by a guiding belief that the world we envision in our hearts (and on the D&D board) can be achieved in reality, if only we try hard enough.

> Abhinav decided to include a story about his childhood experience with the YouTube channel "Harry Potter Puppet Pals," humorous parody skits which inspired his current interest in video production and showbiz. Making the topic one of his supplemental essays, its lighthearted tone is a perfect place for Abhi to talk about how it inspired him to work with local indie films as a production engineer, building out sets and editing color and lighting, work he intends to pursue after graduation.

That's it. No 10-step plans, no complicated modelling or rubric. Sound like a human, tell a compelling narrative, speak of the dreams you have and the discoveries you've made about yourself and the world around you. Write with humility and maturity.

There is a reason every top university has a disproportionate amount of "normal" people among the olympiad winners and Nobel recipients — it's up to you to find that reason out and emulate it, if you can.

### Questions

#### Why should I trust you?

**A.** You shouldn't. In fact, you should trust everyone less. By definition your peers are as inexperienced as you, your parents graduated back when the admissions rate to Stanford was 30+%, the blog links directly to a $15k consulting package purchase link, and online forums are one-half embittered students blaming minorities for their not getting into Yale and the other half high school freshman role-playing as admissions gurus copy-pasting the last thing they read two minutes ago.

#### Who should I listen to then?

**A.** Actual admissions counselors are a good start. MIT and Yale I believe have blogs, podcasts, and interviews available for free online. Avoid any attempting to sell you a product. Sales books are fine, but much of their discussion on fostering client relationships and optimizing sales cycles aren't relevant. Books on storytelling may be very effective, though you can learn a lot from the most-watched online lectures and Ted Talks on YouTube. For standing out and crafting a personal identity, try entrepreneurship resources (also helpful for creating a lean bio + pitch).

#### Can you advise me or read my essays?

**A.** I'm honored, but I have enough anxiety already and don't need the money. There's far better resources available online on writing, thinking, storytelling, selling, and being a more well-rounded and mature person. Though I would not advise to have LLMs write any part of your essay for you, when prompted correctly they can be invaluable tools for brainstorming and rewording awkward wording. Do try to not lose your voice though.

_For further reading:_
[To Be Admitted To Any Ivy League, First Stop Being Infatuated With It](https://medium.com/college-admissions-central/to-be-admitted-to-an-ivy-league-stop-being-infatuated-with-it-2a2529890b7d)

> _Originally published on [Medium](https://medium.com/college-admissions-central/the-college-application-spike-is-dumb-now-what-6ffcc9764f5c)_

> _Part one also was initially published on [Medium](https://medium.com/college-admissions-central/what-is-a-college-application-spike-and-should-i-have-one-b7e776e92f09)_

```

# content/blog/2021-08-15_the-college-application-spike-is-dumb-now-what/1_AcNITAdWLjNAdG5NWgX-WA.jpeg

This is a binary file of the type: Image

# content/blog/2021-08-15_the-college-application-spike-is-dumb-now-what/0__K9oimv5dJjn1yQTK.jpg

This is a binary file of the type: Image

# content/blog/2021-05-19_affirmative-action-from-an-asian-american-perspective/index.md

```md
---
title: Affirmative Action From an Asian American Perspective
subheading: An attempt at a nuanced understanding of race in college admissions
description: "I followed the proceedings of Students for Fair Admissions v. Harvard in October of last year and remember feeling worried — I would submit my college applications in just two months…"
date: "2021-05-19T22:57:15.825Z"
template: post
category: "Politics"
---

![](./0__0b1AOUjiXPd__c8lG.jpg)

I followed the proceedings of _Students for Fair Admissions v. Harvard_ in October 2019 and remember feeling worried. I would submit my college applications in just two months from that day; to hear that my ethnicity might play a role in admissions was concerning.

Looking back, I distinctly remember taking steps to appear “less Asian.” I didn’t mention five years of piano lessons and instead stressed the gregarious and dramatic aspects of my personality. In place of focusing on computer science or entrepreneurship, I extolled my interests in the vocal arts, political advocacy, and classical literature. I hardly touched upon my Chinese cultural heritage, and, above all, I asked myself, “What would an older, straight, Caucasian admissions officer find unique about a male, Asian applicant from the Bay Area?”

Was I wrong to do that? Applications ask questions such as, “How can you add diversity to our community?” Mentioning aspects of myself that were uncommon for “people like me” is a plus, and, conversely, mentioning anything “common” — such as an Asian heritage — would be a minus, right? I remember asking myself, were Asian applicants, on average, simply less creative, less diverse? Faceless automatons who sought only to become a doctor or software engineer? Should universities have quotas lest American higher education becomes, in the words of an anonymous commenter, “Chinatown University?”

> “What would an older, straight, Caucasian admissions officer find unique about a male, Asian applicant from the Bay Area?”

I do not have definitive answers for these questions, and discussions regarding race issues in the United States are a faux pas — unless you intend to ruin Thanksgiving dinner for everyone.

Under the lens of capitalism, there is little-to-no reason to admit many Asian Americans. As the children of immigrants, we are often frugal (unwilling to become committed donors), are unlikely to gain considerable political power (1.25% of Congress), and have little social representation (in Hollywood or Wall Street). Instead, international Asian students from places such as Singapore, Seoul, and Shanghai supplant domestic applicants, wealthy foreign families gladly paying six-figure tuition fees to give their children American educations and escape their countries’ domestic college admissions crunch.

After all, private universities are for-profit institutions, and when the wealthy and powerful send their kids to your university, it’s a win-win situation. Prestigious schools earn their spot at the top by reinvesting in deep alumni networks, courting wealthy donors, and using their position of power to advance their reputation and further recruit the next generation of talent.

> “43% of white Harvard admittees \[are\] recruited athletes, friends and family of staff, and legacy.” — [Legacy and Athlete Preferences at Harvard](https://www.nber.org/papers/w26316#:~:text=Harvard%20University%20provided%20an%20unprecedented,faculty%20and%20staff%20%28ALDCs%29.).

If they could, every top university would only admit the rich and well-connected, selecting only a few hand-picked stars out of the rest. Perhaps viewing college admissions as a battle between “the races” ignores the true effect that social class and engrained privilege have, though I would like to avoid any further broadening of political discussion in this article (race issues are controversial enough). Instead, here’s a chart:

![](./0_KO0gKqUw_wuYwKqW.png)

My parents were immigrants from China. They grew up with _Gao Kao_, the Chinese college entrance exam, looming over their head, an ever-present sorting hat of their future success. The idea of a single test, one result determining your future, is shared among Asian countries, an “inside joke” like overly strict parents, which one laughs about in public then cries about in private.

Students who study for the same standardized test all review identical material. There is no room for “creativity” or “unique interests.” The test selects those who can perform the skills and tasks called for with perfect precision. I find them droll and mechanical, but I do concur; they are unlikely to be cheated, with no room for ghostwritten essays or fake nonprofits.

Relatively homogenous groups largely segregated by region combined with a more conservative culture means Chinese universities have less to worry about demographical diversity. The _Gao Kao_ provides affirmative action in its own way by adding points to the examination scores of minorities.

> “Students from other ethnic minority groups can receive 10 extra points, while those from remote areas, such as those from mountainous areas, can get anywhere from 10 to 30 extra points regardless of their ethnicity, the policy said.” — [_Global Times_](http://www.globaltimes.cn/content/1108492.shtml)

I am a pragmatist at heart, so the idea of a flat score boost granted to those of an underrepresented minority group — and another if the applicant is from a low-income family — appears to be a simple answer to a complicated problem. However, U.S. universities do not evaluate applicants on a standardized scale, and the higher you go, the more esoteric the candidate traits sought seem to become. There does not seem to be any possible way to unify the college view of applicant race (and wealth) on admissions besides a strict government-regulated policy, which is unlikely to happen for private universities anytime soon. Even the current Department of Justice’s claim against Yale is unlikely to bear any long-term consequence.

Besides, reducing one’s socioeconomic circumstances to a number adjustment gives off an unpleasant feeling to me.

Is there no solution then? Do we live in a zero-sum world where to give more opportunities to marginalized racial groups who have suffered from redlining and discrimination, we must choose another to sacrifice in its place?

I don’t think so. There are ways to fix racial differences without using quotas. Universities can begin with increasing admitted students — far easier as many campuses continue to be empty due to the pandemic. Instead of fighting over the pie, we can increase its size and cut costs while we do it. [Scott Galloway](https://medium.com/u/a76508074bec) has some [brilliant articles on this](https://www.profgalloway.com/post-corona-higher-ed-part-deux/).

![](./1_AOK4SfFtQ1TFq2hEXHH26g.jpeg)

Spend money creating education and developmental opportunities in low-income areas. Decrease the effectiveness of legacy and “friends and family of staff” on admissions chances. Realize that universities are the symbol of America’s future, of a new generation of educated youths who will break with the old and invent the new. They should not be burdened by believing they were admitted or rejected to a university because of factors they were born with and cannot change — or whether or not their parents play golf on Sundays with the dean ([Caltech](https://www.cnbc.com/2019/03/16/top-universities-that-do-not-consider-legacy-when-admitting-students.html#:~:text=The%20public%20institutions%20on%20the,do%20not%20consider%20legacy%20status.) and [MIT](https://mitadmissions.org/blogs/entry/just-to-be-clear-we-dont-do-legacy/) seem to be doing quite fine so far).

For now, however, I acknowledge affirmative action as an imperfect but acceptable tool to increase diversity until our educational system can get itself in order. Perhaps Covid-19 will cause an awakening in the need for affordable public education for all. Maybe the problematic stereotypes of Asians as “model minorities” will disappear as well.

I doubt it.

```

# content/blog/2021-05-19_affirmative-action-from-an-asian-american-perspective/1_AOK4SfFtQ1TFq2hEXHH26g.jpeg

This is a binary file of the type: Image

# content/blog/2021-05-19_affirmative-action-from-an-asian-american-perspective/0__0b1AOUjiXPd__c8lG.jpg

This is a binary file of the type: Image

# content/blog/2021-05-19_affirmative-action-from-an-asian-american-perspective/0_KO0gKqUw_wuYwKqW.png

This is a binary file of the type: Image

# content/blog/2021-01-30_why-you-ve-already-broken-your-new-year-s-resolutions/index.md

```md
---
title: "Why You’ve Already Broken Your New Year’s Resolutions"
subheading: "Cultivate daily habits using SMART goals and daily planning."
description: "New Year's Resolutions don't work. We need to use SMART goals and effective planning to build habits and streamline thinking. Learn effective strategies..."
date: "2021-01-30T15:03:31.384Z"
template: post
category: "Self-Improvement"
---

![](./0__3L4Fgf8FDPXvGm3G.jpg)

### New Year’s Resolutions don’t work.

As of writing this article, it’s currently a month into 2021, and every single one of my friends has broken their New Year’s Resolution.

They’re not alone — studies show that [only 8% of Americans who make a New Year’s resolution actually keep them all year, and 80% have failed by the start of February](https://www.thetimestribune.com/news/local_news/tips-for-making-sure-your-new-years-resolutions-stick/article_8cd14b54-17fd-51a9-ab5a-89859e6e34c4.html#:~:text=Gyms%20all%20across%20the%20country,by%20the%20start%20of%20February.).

If you are part of the 80%, don’t worry! The problem isn’t due to self-control or mental fortitude — we fail because we misunderstand what resolutions are and how we can avoid breaking them. Through SMART goals and concepts from James Clear’s book [Atomic Habits](https://jamesclear.com/atomic-habits), anyone can create resolutions with effective incentives and progression.

Resolutions are, in essence, ultimatums, designed to reward your subconscious for making a change. To figure out where we go wrong, let’s start with a basic statement: “From the beginning of the New Year, I will exercise every single day.”

While this may sound like a good resolution, it is a terrible ultimatum. Immediately after its conception, your subconscious begins to poke holes in it.

- What amount of exercise counts as _enough_?
- When do I exercise? Could I push it back a bit?
- What is the punishment if I _don’t_ exercise?

**It is human nature to analyze rules for their boundaries and loopholes** — it’s what allows us to minimize work and find minor advantages in our daily lives. While you might assume keeping your resolution vague allows you to avoid breaking your resolution, in reality, it opens up more ways for your subconscious to weasel out of work.

To address this, brainstorm answers to these questions, and if need be, write them down on a piece of paper.

- I will complete exactly 30 minutes of a HIIT exercise video.
- It will begin within an hour of arriving home every evening.
- If I miss a session, I will not go on social media or watch TV until the next time I exercise.

Having strict rules streamlines thinking — eventually, you should move from task to task without even thinking about it. Building signaling networks to do this subconsciously requires effort — and many repetitions. James Clear recommends what he calls “implementation intentions” — writing statements that fix actions at a time and place.

> _“I will \[BEHAVIOR\] at \[TIME\] in \[LOCATION\]”_

Written commitments force your subconscious to acknowledge your prior intentions. While you may no longer be in the mood to exercise when the time comes, having a physical representation of your broken promise can often be the last push needed to get butts off of seats.

Now that we know how to avoid breaking commitments, let’s work on brainstorming strong resolutions. To assist with this, I recommend SMART goals. SMART is a mnemonic for **Specific, Measurable, Achievable, Relevant, and Time-bound**.

**Specific:** if requirements are vague — or unmeasurable — how do you know if you are fulfilling them? As an example, two vague goals:

- “I will go to the gym” — How often? When? What exercises?
- “I’ll eat healthier” — At all meals? How much does your diet change?

**Goals need to be specific and direct.** You shouldn’t divert energy into considering whether an action is allowed — going back to streamlined thinking, adding ambiguity allows internal conflict and detracts from your ability to resist temptations.

**Measurable:** when results are unquantifiable, you don’t know if you are succeeding or not. Goals such as, “I will manage my anger by 45%.” How can you conclude if anger has been managed by 45% or only 40%?

Without data, it is easy to become unmotivated. Numbers fascinate our mind — counting each push-up you do, or calorie you cut can become an addicting habit. Even on Medium, “7 Ways To…” and “10 Things To…” headline half of the daily top articles (Look at Buzzfeed if you need further evidence). Use quantifiable goals and data tracking devices to add accountability and reinforce positive actions.

**Achievable**: This one explains itself. Missing targets can cause discouragement and negatively impact self-confidence and the ability to accomplish future resolutions and goals.

Figure out what is are realistic objectives that will challenge but not exhaust you. If you have a previous resolution that failed, see if you can initially decrease the goal's intensity and move on. Avoid goals that depend on others (_“I will make my friends like me more”_) or subject to luck (_“I will win the lottery this year”_).

**Relevant:** For resolutions to matter at all, they need to apply to you. I know learning Norwegian every day would be difficult for me to maintain because I don’t have the necessity or inclination to learn that language. For people living in/near Norway or are interested in Norwegian culture and media, that goal may be highly relevant.

Current events and climate can also promote or restrict certain resolutions — partying at nightclubs weekly, for example, may not be the best goal during a pandemic.

**Time-bound:** It’s easy to disparage incremental progress, especially in a society of instantaneous gratification. For example, while fad diets may appear promising, first look into taking small steps to replace parts of your meals with healthier alternatives.

If you advance carefully, only increasing intensity when you feel comfortable, falling back is much harder. What is essential is not scaling up intensity as fast as possible but focus on building consistent habits day-by-day.

Losing half a pound per week is preferable to losing twenty in the first half of the year and gaining it back in the second — set easily measurable, realistic goals you can commit to regularly and gradually scale up. A New Year’s Resolution has a fixed timeframe, so ask yourself:

- What can I do in a year?
- How about in six months?
- When the next year comes around, where do I want to be?

If you feel overwhelmed, you aren’t alone — planning is tough. Take some time to digest everything, and don’t be afraid to write down reflections and notes!

One final recommendation I’ll make is to find a resolution buddy (or several people) you can work on goals together with. **Having a partner to keep you company and accountable can make resolutions far more comfortable to maintain**, and a support network can give help and advice when you hit road bumps during the year.

Every habit's intent, every resolution, is to cause ingrained change — a subconscious routine that has become a part of yourself. As long as you focus on the long-term mentality shifts required and the advice of SMART goals and forward-thinking planning, I believe next year you’ll be keeping two New Year’s Resolutions.

```

# content/blog/2021-01-30_why-you-ve-already-broken-your-new-year-s-resolutions/0__3L4Fgf8FDPXvGm3G.jpg

This is a binary file of the type: Image

# content/blog/2021-05-18_dear-startups-i-hate-subscription-services/index.md

```md
---
title: "Dear Startups: I Hate Subscription Services"
subheading: "Subscription Overload is the New Bandwagon"
description: "While SaaS models work for B2B and many other industries, it's not a one-size-fits-all tool to keep your startup afloat. There is a bubble in subscriptions."
date: "2021-05-18T16:19:46.146Z"
template: post
category: "Technology"
---

![](./1__u3Ijsd2UiUgCI6FcxMOwcQ.jpeg)

#### Subscriptions, Subscriptions, Subscriptions.

Every startup company these days tries to sell you a subscription.

Boxes of [random consignment knick-nacks](https://www.theapollobox.com/subscriptionbox). [Letters from dead people](https://cratejoy.evyy.net/c/468058/277724/4453?subId1=SpecificSubsOconnell1-19&u=https%3A%2F%2Fwww.cratejoy.com%2Fsubscription-box%2Fletters-from-dead-people%2F). [Skulls of dead animals](https://cratejoy.evyy.net/c/468058/277724/4453?subId1=SpecificSubscriptionsOConnell8-20&u=https%3A%2F%2Fwww.cratejoy.com%2Fsubscription-box%2Fskulls-unlimited-international-inc%2F). Paying for junk delivered straight to your doorstep each month [is the new, hottest trend in business](https://www.okwhatever.org/topics/things/weird-subscription-boxes).

The problem is, the bubble with subscription-based businesses removes consumer options, causes investors to demand companies switch pricing models, and promotes boom and bust businesses that seek to maximize profits in the short term and burn out _a la_ “fast fashion” (If the links above are dead, my point is made).

Certain products are best sold on a month-to-month basis. Netflix and other streaming services charge for the continued ability to watch millions of shows and movies on-demand without individually paying for each one. Gym memberships use the percentage of customers who signed up for their New Year’s Resolution but stopped attending two weeks in to subsidize the cost of regular gym-goers.

> “We realized the best way to monetize content was through a subscription model. “ — [Trip Adler](https://www.inc.com/jill-krasny/35-under-35-scribd-is-the-library-of-the-future.html), Scribd

However, what about a [scanner app that charges you $3.99 a week](https://apps.apple.com/us/app/scanner-app-scan-pdf-document/id1040093707) to convert photos to pdf? A notebook [that bills you $7.99 a month](https://www.bbc.com/news/technology-36662618) for the online syncing your default notes app offers for free?

The latter is Evernote, a company that originally shot to fame with the emergence of the App Store back in 2007. After years of having a 6% conversion rate on their freemium model ($5 a month or $45 a year) and steady growth and profits, in 2016, the company [restricted the number of features available to free accounts,](https://www.theguardian.com/technology/2016/jun/30/evernote-users-vent-anger-after-it-cuts-free-tier-and-raises-prices) bumping the cost of paid subscription up by 40% at the same time. When competitors in the industry such as Microsoft’s OneNote and free alternatives like Apple Notes grew in feature set and popularity, Evernote chose to restrict already-offered services and increase prices, leading to [TechCrunch’s 2018 article](https://techcrunch.com/2018/09/04/evernote-lost-its-cto-cfo-cpo-and-hr-head-in-the-last-month-as-it-eyes-another-fundraise/) describing Evernote as “in a death spiral.”

The case of Evernote depicts the obvious — customers abhor companies taking away previously free options and putting them behind a paywall. It’s difficult for a company to find a genuine reason for shifting previously successful pay-once pricing into recurring subscription models besides the desire for greater profits. And it does make bank.

Adobe in 2013 began selling their suite of products not on the perpetual license they did before but on what they called the Adobe Creative Cloud — [a $50/month subscription which removed the ability for users to purchase a license for a single product](https://www.cnet.com/news/adobe-competitors-pounce-after-subscription-backlash/) and forced them at gunpoint to pay monthly for all Adobe services. Their dirty tricks extended further [into even canceling already-purchased perpetual licenses if they accidentally signed up for a free trial of the subscription service](https://medium.com/@guisebule/subscription-psycho-a-person-who-knows-its-a-good-idea-to-get-you-away-from-perpetual-licensing-b8dec71bf7d0). In unrelated news, Adobe [saw a record quarterly revenue of $5.89 billion that year](https://www.cnbc.com/2016/03/18/adobe-raises-revenue-profit-forecasts-above-estimates-on-cloud-momentum.html).

Startups who see this as a golden goose need to realize something. While Adobe Photoshop, Microsoft Word, and other established design and productivity tools are invaluable necessities and part of the daily workflow of millions, your app likely is not. When non-essential services bill month after month, each time the notification pops up, the customer spends time and energy reconsidering whether to cancel or not — this leads to an incredibly high churn rate.

I understand the appeal of SaaS (Subscription as a Service) as a startup's de-facto pricing model. Stable and growing MOM (month over month) revenue growth was long considered the crown prince of trackable metrics for VCs. Founders seeking stability can feel pigeonholed into SaaS when trying to stay afloat for another funding round. However, the subscription model shouldn’t be a one-size-fits-all tool used to prop up deeply flawed ideas with the semblance of earnings stability, and founders should not feel pressured by stakeholders to raise bills and squeeze out every cent from the customer before a solid userbase has been developed.

The average consumer is already balancing several streaming subscription services, a gym membership, a phone plan, student loans, house and car debt, Amazon Prime, utility bills, insurance, credit cards, and Spotify Premium. They don’t want to see another monthly number chipping away at their bank balances month after month, year after year.

The worst part is, software companies already know the expected LTV (lifetime value) of their customer and argue over it and other metrics daily. If they had a separate “purchase permanently” option at that LTV price, undoubtedly there who choose to pay the lump sum would not have chosen to subscribe otherwise. For people like me who abhor paying monthly fees, you could even charge me more than my expected LTV, and in many cases, I would still pay that figure.

Poorly designed software pricing models are, in many ways, a digital version of the terrible “mystery box” subscription services, which continue to plague social media advertisements to this day. Both suffer from the same issues:

- **Pricy solution in search of a cheap problem.** Why would consumers [pay a startup for safety razor cartridges](https://www.profitwell.com/recur/all/boxedout-dollar-shave-club) that cost 1/8th of the price to subscribe and save at Amazon? Similarly, why would anyone want to [pay a monthly subscription for an alarm clock app](https://www.tomsguide.com/us/pictures-story/641-best-clock-apps.html)?
- **Lack of customer retention.** If a user pays upfront for a product, they will feel compelled to use it daily to get their money’s worth. Building brand loyalty [allows companies to upsell more items and services, gaining a cult following](https://www.retentionscience.com/blog/customer-loyalty-vs-brand-loyalty/). On the other hand, companies like Birchbox and subscription apps [can have up to a 20% monthly churn rate](https://recurly.com/research/churn-rate-benchmarks/).
- **Boom and Bust model.** Box of the Month and high-profile subscription services like Quibi raise millions ([and the case of the latter 1.75 billion](https://techcrunch.com/2020/10/23/the-short-strange-life-of-quibi/#:~:text=A%20month%20ahead%20of%20its,give%20or%20take%20%24100%20million.)) in funding [yet fizzle out just as fast](https://news.crunchbase.com/news/venture-funding-subscription-startups-tapers-off/), burning through the capital on expensive marketing campaigns and celebrity endorsements rather than long-term investment or delivering actual value to the customer. Highly reminiscent of dropshipping scams.

While SaaS models work wonderfully for B2B and many industries, some apps and programs are best sold as-is, a buy-once and forget-about-it deal, which may not make the company an infinite-growth unicorn (do you really need [ten thousand employees](https://www.nytimes.com/2022/03/08/business/better-mortgage-lender-layoffs.html)) but can result in everyone involved living comfortable, financially secure lives with the resources to invest in their next great idea. Upselling through in-app purchases and notifications for other products in your ecosystem is easier when customers keep using your app because they don’t have to pay weekly or monthly to maintain it.

Investors and founders need to realize that removing options and placing them behind paywalls is only successful long-term when done by massive corporations with developed software ecosystems. Those companies don’t care about the negative PR or user base hit when most customers are locked in — a 5% customer base hit for an 8% increase in monthly revenue is a substantial win for them. When I can purchase a physical hardbound notebook every month for the price of a monthly notebook app subscription, there is not the same incentive for me to keep paying.

And to Adobe? I’m no anarchist, but keep this up [and watch the number of pirated copies of your software grow exponentially](https://www.revenera.com/blog/software-monetization/adobe-photoshop-creative-cloud-has-been-pirated/).

There are [creative ways to do pricing](https://dueapp.zendesk.com/hc/en-us/articles/360053244591-What-is-the-Upgrade-Pass-). The consumer wants to pay you — let them.

> _Originally published on [Medium](https://fangtastic.medium.com/dear-startups-i-hate-subscription-services-aecefeb0f089)_

```

# content/blog/2021-05-18_dear-startups-i-hate-subscription-services/1__u3Ijsd2UiUgCI6FcxMOwcQ.jpeg

This is a binary file of the type: Image

# content/blog/2021-01-13_do-you-actually-want-to-study-undergraduate-computer-science/index.md

```md
---
title: "Do You Actually Want To Study Undergraduate Computer Science?"
subheading: "CS applicants — more competitive and numerous than ever."
description: "Some students who choose Computer Science as their major aren't sure if it's a good choice. Given how competitive college admissions for CS can be, there..."
date: "2021-01-13T02:36:18.450Z"
template: post
category: "College & Career"
---

![](./0__halMpHytykslC7Fl.jpg)

The question in the title might at first seem odd — what student applying to Computer Science (CS) doesn’t actually want to study it?

I’ll start by saying — if you compete in Code Jam, go on GitHub more than social media, or spend your free time on Linux forums shilling for Arch — this article isn’t for you.

Where I grew up, however, students were by default a CS major*.* Unless you had firm beliefs regarding your major or intended career, the common consensus was “just study CS, and you’ll work it out later.”

Perhaps they’re not wrong. CS pays well, with job opportunities in innumerable fields. Tech as a sector grows day-by-day, and the benefits of working from home only look more appealing in the time of a pandemic. Low-risk, unathletic, good pay, broadly applicable, easy-to-learn — who wouldn’t recommend CS as the go-to major for wavering high school students not yet sure of their purpose in life?

> “Economics and the promise of upward mobility are driving the student stampede. While previous generations of entrepreneurial undergraduates [might have aspired to become lawyers](https://www.nytimes.com/2016/06/19/business/dealbook/an-expensive-law-degree-and-no-place-to-use-it.html) or [doctors](https://www.nytimes.com/2018/08/20/opinion/medical-school-student-loans-tuition-debt-doctor.html), many students now are leery of investing the time, and incurring six-figure debts, to join those professions.

> By contrast, learning computing skills can be a fast path to employment, as fields as varied as agriculture, banking and genomics incorporate more sophisticated computing. While the quality of programs across the country varies widely, some computer science majors make six-figure salaries straight out of school.” — [NYT](https://www.nytimes.com/2019/01/24/technology/computer-science-courses-college.html)

The issue is, CS is too appealing. In fact, undergrad CS at universities faces a problem other departments wish they had — an overwhelming number of applicants. There are only so many spots to fill, so the number of rejected students grows year-over-year by basic supply and demand. The percentage of accepted students applying to CS and engineering is a fraction of the overall acceptance rates, whether [at prestigious CS universities](https://junilearning.com/blog/college-and-career/getting-into-an-elite-computer-science-school/) or [not](https://talk.collegeconfidential.com/t/2017-computer-science-admission-rates/2024104).

Cutthroat competitiveness is naturally born from a shortage of spots, and even perfect grades and standardized test scores are not enough. In the last few years, I’ve seen the number of hackathons, coding competitions, and community tech organizations for high schoolers balloon to ludicrous proportions. Students fight each other for leadership positions, team captain spots, tech companies, and local government recognition.

Once admitted, this boils over to the college curriculums — CS and engineering majors are forced to take multiple “weeder classes,” a combative, often bell-curved system, where those with extensive prior experience and confidence benefit — creating deep inequities in underprivileged groups.

> _“As more colleges implement “competitive enrollment” policies to winnow down their computer science enrollment, women and_ [_students of color_](https://www.nap.edu/read/24926/chapter/7#111) [_are again squeezed out_](https://dl.acm.org/doi/abs/10.1145/3328778.3366805)_. And, in larger classes where faculty cannot build student relationships, research suggests that_ [_underrepresented minority students often lose_](https://medium.com/r?url=https%3A%2F%2Fwww.ncbi.nlm.nih.gov%2Fpmc%2Farticles%2FPMC3399968%2F)_.” -_[_Forbes_](https://www.forbes.com/sites/alisongriffin/2020/09/02/too-many-aspiring-software-engineers-cant-even-get-into-class-industry-partnerships-can-change-that/?sh=4ad95c221c2c)

I say this not to scare, but to inform prospective students: there are systemic issues of discrimination in the tech industry, from on-campus studies to in-company culture. There should be more representation from under-represented groups in CS to help fix this issue, but hiding the existence of this bias — or refusing to acknowledge it — does everyone a great disservice.

Knowing all this, should I major in CS? My recommendation is to ask yourself these four questions first:

- Am I willing to attend a less-prestigious or less-competitive university to study CS there?
- Are there fields I enjoy and would rather do? Could I major in that field and take CS as a minor instead?
- Will I take the initiative to learn new things, constantly being in a state of change and adaptation to survive?
- Am I actually interested in CS, enough to spend years taking demanding classes and sandbagging GPA to learn it? (Remember, CS isn’t just coding.)

The greatest worry I have is that students will go to a university that is not a good fit for them simply because their family or peers pressure them to attend a school with a good CS program. Then, faced with the immense workload for a subject they are not interested in, it leaves them with the decision to either change majors in a college they dislike — or to drop everything and leave altogether.

However, it is also prescient to mention the other side of the coin; only [27% of college graduates have a job related to their major](https://www.washingtonpost.com/news/wonk/wp/2013/05/20/only-27-percent-of-college-grads-have-a-job-related-to-their-major/), and having CS skills while working in another field can be a powerful selling point, along with the analytical and reasoning abilities one naturally gains from studying the field. Though colleges may make the curriculum purposefully obtuse, there are many free online resources to help you learn the subjects. The job security provided by CS may help you explore ventures you may not have the financial freedom to do so before.

At the end of the day, you should never select a major willy-nilly — for the average student, it is more important what you study and why than where. Have these conversations foremost with yourself and your parents and your school’s College and Career Counselor.

Don’t let anyone pressure you into making a final decision — take control of your life and weigh the options, costs, and benefits; it is what a CS student would do.

```

# content/blog/2021-01-13_do-you-actually-want-to-study-undergraduate-computer-science/0__halMpHytykslC7Fl.jpg

This is a binary file of the type: Image

# content/blog/2021-01-06_covid-revealed-the-failures-of-the-american-college-application-system/index.md

```md
---
title: "Covid Revealed The Failures of the American College Application System"
subheading: >-
  What is “involution,” and why is it representative of disillusioned students?
description: "Covid revealed the failures of the American College Admissions system. What is involution, and how does it represent a disillusioned generation of students?"
date: "2021-01-06T04:58:18.932Z"
template: post
category: "College & Career"
---

![](./0__CNlpHGs2cP8wpOKf.jpg)

With each passing day, the world appears bleaker. Joblessness, global pandemic, economic and political stagnation — [depression is at an all-time high](https://www.crossroadstoday.com/mental-health-is-one-of-the-biggest-pandemic-issues-well-face-in-2021/), and [mental health care is cut](mental%20health%20care%20is%20cut) as hospitals and doctors remain overwhelmed. The daily notifications I receive regarding full ICU beds where I live and record infection numbers in my state blend like the days I spend indoors, waiting in limbo for the world to return to normalcy.

Under this backdrop, high school seniors, many of whom have not been in a classroom since March of last year, are currently applying to colleges. A selection of items missing from their applications: standardized tests, summer camps, sports games, music recitals, a year of high school grades. Some students have transitioned to full-time caregivers, others taking on part-and-full-time jobs to support their families. Under such strenuous conditions, they are examined beneath the cover glass and judged by faceless admissions officers to decide their future.

College admissions on a good day reflect opaque, byzantine systems. Students attend expensive summer camps and pay tens, even hundreds of thousands of dollars for purported “admissions advisors” in the hopes of admission. Parents hiring coaches to train their children [to be the best in the state at an obscure sport](https://www.chicagotribune.com/sports/college/ct-spt-ivy-league-admissions-rowing-20190331-story.html), ghostwriters [crafting carefully written paragraphs of purple prose](https://homestay.cambridgenetwork.com/blog/the-business-of-ghostwriting-college-essays/), social media celebrities selling admissions packages like essential oils — even before Covid, [there was a $2 billion industry](https://medium.com/college-admissions-central/there%20was%20a%20$2%20billion%20industry) designed to hook in teenagers and their upper-middle-class parents with flashy advertisements and fear-mongering. Covid has been a very lucrative time for them.

Quarantine canceled their junior-year summer plans for many applicants, which is traditionally the best time for internships, research, and national tournaments. Faced with formulating an enticing argument for admission officers, they can only work harder squeezing out essays on what they already have done up to that point. It’s a nigh-impossible challenge, which is why the lure of paying sizeable sums of money for a cure-all can seem so enticing. **After all, they’re so expensive because they work, right?**

_Involution_ was originally a social concept to describe agricultural societies that reached a point of economic stagnation, where additional population growth did not increase productivity. A society only developing inward, ignoring innovation while favoring complexity as social structures fold upon themselves, perfecting minute details instead of focusing on the big picture.

Recently, there has been a resurgence of _involution_ used in describing Asian societies [as a comment on their cut-throat competition and growing economic anxiety](https://www.sixthtone.com/news/1006391/how-one-obscure-word-captures-urban-chinas-unhappiness). It refers to something that spirals in on itself, a process that traps participants who know they won’t benefit from it. Families push their children, fearing they will fall behind, “losing at the start line” in the frantic rush for universities that raise grade benchmarks every year, jobs that reject over-qualified candidates many times over. Though it is perhaps worse in conformist societies with rigid hierarchies, America isn’t doing much better either — [only half of millennials make more than their parents did at the same age](https://www.cnn.com/2020/01/11/politics/millennials-income-stalled-upward-mobility-us/index.html). For many students, [competitive sports are a stand-in for the college entrance exam](https://medium.com/college-admissions-central/competitive%20sports%20has%20supplanted%20the%20college%20entrance%20exam). Unlike countries in Asia with largely homogenous populations, we also face severe inequities in race and ethnicity:

> “Only 48% of US high schools even offer calculus. One in three private schools have it and one in six public schools. Schools with white kids are twice as likely to offer it as schools with lots of black and Latino kids, and kids from families who earn in the top quintile are four times as likely to take it in high school as those from families in the bottom quintile… and yet, in 2017 at Harvard, 93% of the incoming freshman class had taken it.” — [Quartz](https://qz.com/1706334/college-admissions-are-a-game-that-still-favors-rich-over-poor/)

While these social issues have been present long before the pandemic, Covid has shown them in sharp relief — kids from wealthy, white families see both [direct](https://medium.com/college-admissions-central/direct) and [indirect](https://medium.com/college-admissions-central/indirect) advantages when applying compared to their peers. When some students juggle part-time jobs, virtual schoolwork, and caretaker duties for family members with their college applications, the effects of pre-existing social inequities are more magnified than ever. In _involution_, everyone must compete amongst each other for ever-smaller pieces of the pie. [In an interview with _The Paper_](https://www.sixthtone.com/news/1006391/how-one-obscure-word-captures-urban-chinas-unhappiness), University of Oxford professor Xiang Biao describes it:

> “The lower class still hopes to change their fate, but the middle and upper classes aren’t so much looking upward, and they are marked by a deep fear of falling downward. Their greater fear is perhaps losing what they already have.”

Some may argue that none of this is the fault of colleges; after all, there are only so many seats available. I will not attribute all responsibility to them; cutthroat sports teams, toxic online communities, parents living vicariously through their children, and dogmatic societal beliefs are all to blame in some part, along with fear — constant, crippling anxiety regarding expectations and failure. Whether or not it wants to, the college application process represents this generation’s first, clearest experience with _involution_.

Good intentions, perverted into a regressive competition featuring the lower classes fighting tooth-and-nail for limited opportunities. Bribery, ghostwriting, fraudulent awards, and false extracurriculars are no stone left unturned, no corner not cut. Instead of preparing students for success, colleges demand evidence of narrow, short-term success to be admitted at all. In times of economic and social stagnation, growing uncertainty only increases applicants' competitiveness; without research, clubs, or outside events, applicants can only double down on what they have already done or fear being denied what they see as the only path to success in an ever-bleaker future. Students' development remains inwards — fighting for every SAT and GPA point, focusing on the minute details while ignoring overarching themes and direction. It’s why so many students have no idea why they want to do their major at all, attributing their decision to pressure from society or friends and family.

It is here where I would normally pitch my solution — but this time, there isn’t any. Viewed through the lens of capitalism, there is no incentive for colleges, alumni, or society to change. Better the lower classes dig themselves into the ground, fighting each other for the “tickets to success” than realize the diversity of opportunities elsewhere. Universities will use the profits they make managing tax-free stock portfolios and developing the wealthy and powerful alumni networks to promote their own prestige and court donations, a self-compounding cycle. Under growing social inequity and competition, the college advising and preparatory industries will continue to thrive and expand, perhaps one day reaching the nigh-mandatory status of “night schools” in Asia.

I suppose I’ll leave you with this: the students engrossed in college prestige believe there is no exit, that there is only one road to success, and leaving means they are a failure and an utter embarrassment. **Though we may not have the power to change the system, each person we help is a step towards breaking the cycle.**

```

# content/blog/2021-01-06_covid-revealed-the-failures-of-the-american-college-application-system/0__CNlpHGs2cP8wpOKf.jpg

This is a binary file of the type: Image

# content/blog/2020-08-25_your-amazon-products-could-be-all-be-counterfeit-here-s-why/index.md

```md
---
title: "Your Amazon Products Could Be All Be Counterfeit — Here's Why."
subheading: "Amazon sacrificed accountability for efficiency and profit."
description: "Counterfeits are common on Amazon's marketplace. Here's how sellers hijack listings and ship knock-offs, undercutting sellers and defrauding consumers."
date: "2020-08-25T05:49:38.082Z"
template: post
category: "Technology"
---

![](./0__xGI8Jqhk8YJtALjZ.jpg)

When Amazon began its meteoric rise to power, no one could have imagined the company expanding from an online bookstore to the premier source of [Nick Cage sequin pillows](https://www.amazon.com/Xiaowli-Mermaid-Nicolas-Reversible-Decorative/dp/B07HH31Y4W/ref=sr_1_11?dchild=1&keywords=weird+stuff&qid=1598326816&sr=8-11), [real human finger bones](https://www.amazon.com/gp/product/B00N1XM6TQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00N1XM6TQ&linkCode=as2&tag=eathnoth06-20&linkId=4798e204153739d4a45212f6a385c0ab), and everything in between. As ascribed to its global shipping networks and logistics management, Amazon's dominance has allowed it to make founder Jeff Bezos the [Forbes billionaire record-breaker](https://www.forbes.com/sites/angelauyeung/2020/08/18/jeff-bezos-ends-day-with-an-all-time-high-net-worth-of-1978-billion/#:~:text=Jeff%20Bezos%2C%20founder%20and%20CEO,four%20decades%20of%20tracking%20billionaires.) and propel its quarterly profits [to $5.2 billion](https://www.geekwire.com/2020/amazon-doubles-quarterly-profits-5-2b-crushes-wall-streets-expectations-highly-unusual-quarter/#:~:text=Amazon%20posted%20%245.2%20billion%20in,billion%20on%20COVID%2D19%20initiatives.).

In the past few years, however, Amazon has been hammered by [advocacy groups](https://www.fool.com/investing/2019/10/12/amazon-has-a-notorious-counterfeit-problem.aspx) and angry consumers for allowing the sale of counterfeit products intermingled with the genuine. While for booksellers, novels and print texts are rarely counterfeit and fraudulent copies don’t often constitute a significant health hazard, the same [cannot be said for Amazon’s other products](https://themarkup.org/banned-bounty/2020/06/18/how-we-investigated-banned-items-on-amazon-com).

> “A Wall Street Journal investigation found 4,152 items for sale on Amazon.com Inc.’s site that have been declared unsafe by federal agencies, are deceptively labeled or are banned by federal regulators — items that big-box retailers’ policies would bar from their shelves. Among those items, at least 2,000 listings for toys and medications lacked warnings about health risks to children.

> The Journal identified at least 157 items for sale that Amazon had said it banned, including sleeping mats the Food and Drug Administration warns can suffocate infants. The Journal commissioned tests of 10 children’s products it bought on Amazon, many promoted as “Amazon’s Choice.” Four failed tests based on federal safety standards, according to the testing company, including one with lead levels that exceeded federal limits.” — [The Wall Street Journal](https://www.wsj.com/articles/amazon-has-ceded-control-of-its-site-the-result-thousands-of-banned-unsafe-or-mislabeled-products-11566564990)

In Amazon’s interview with _WSJ_, Amazon claims they are using advanced software filters to identify and remove fraudulent sellers automatically; it is clear, however, that their system is not working. “[Even Amazon’s Own Products Are Being Hijacked by Imposter Sellers](https://www.theverge.com/2019/8/29/20837359/amazon-basics-fake-sellers-imposters-third-party-marketplace).” If Amazon cannot even regulate and control their own listings, how can they satisfy name-brand sellers' authenticity demands? Nike [pulled out of selling on Amazon last November](https://www.bloomberg.com/news/articles/2019-11-13/nike-will-end-its-pilot-project-selling-products-on-amazon-site), and Birkenstock [stopped selling their shoes](https://www.newyorker.com/magazine/2019/10/21/is-amazon-unstoppable) over counterfeit complaints.

> _“Amazon is the Wild West. There’s hardly any rules, except everyone has to pay Amazon a percentage, and you have to swallow what they give you and you can’t complain.” — David Kahan to_ [_The New Yorker_](https://www.newyorker.com/magazine/2019/10/21/is-amazon-unstoppable)_._

So why can less-than-reputable sellers get away with listing counterfeit items? Here are two ways they can get around the system:

### Commingled Inventory

When Amazon asks sellers to list their products, you would believe each seller has a stock of their items in a warehouse, which Amazon pulls from whenever a customer purchases their item.

For the seller who does not pay for that luxury, however, their products go into [stickerless, commingled inventory](https://feedvisor.com/university/stickerless-commingled-inventory/). Each item with the same SKU (stock keeping unit) is considered the same, and the only number tracked is the amount of the product each seller ships in.

For example, if I sell Duracell C batteries on Amazon through their “Shipping Fulfilled by Amazon” — which I must do to receive Prime shipping designation — I need to send my batteries to an Amazon warehouse. After receiving my delivery, they will count the number of batteries, then slide the whole stock into a generic shelf labeled “Duracell C Batteries.” Any purchaser receives a Duracell C battery from that box, and thus the actual seller is unknown.

Commingled inventory fixes a key logistical issue — if someone in Italy buys my products, the nearest warehouse can send them Duracell C batteries instead of shipping them overseas, as they are supposedly the same product. This saves Amazon an incredible amount of storage space and shipping costs.

Of course, you can probably tell where the issue lies. If you purchase from Amazon, any seller could have sent that product in. It doesn’t matter the star review, the number of products sold, even the seller's reputability — they can all be categorized under the same listing. An Amazon warehouse robot (or [underpaid worker](https://www.theguardian.com/technology/2020/feb/05/amazon-workers-protest-unsafe-grueling-conditions-warehouse)) will toss a random one from the shelf, and now your 5-star Duracell C batteries die in hours instead of weeks.

The problem is exacerbated through the “Buy Now” button, which automatically chooses the cheapest price+shipping cost. The sellers who choose to use non-commingled inventory (X00 sticker) lose out, as no one will buy from them when they believe an identical product is cheaper from a different seller. Worse, because fraudulent products cut corners to save price, they can undercut all the other legitimate sellers and be the majority provider of the product to consumers, stealing all business and causing a flood of poor reviews, permanently ruining the product listing even if the seller in question is eventually removed.

### Listing Hijacking

Though Amazon [has 8.8 million sellers, currently, only 2.3 million of them are active](https://www.marketplacepulse.com/amazon/number-of-sellers). As manually approving every single item for over 2 million sellers is impossible, Amazon grants incredible freedom to the seller, allowing them to freely list items and alter existing products.

Like social media giants such as Facebook and Twitter, Amazon has turned over the reins of power to the public, creating, in their words, an “infinite shelf of infinite products.” On a solely online platform, shelf space is unlimited. What they forgot to mention, however, is with infinite products comes infinite problems.

In addition to inaccurate seller photos and descriptions, product listings with good reviews that are no longer active are ripe targets of fraud. It’s difficult to start selling a product when there are no reviews, so why not take a head start using a listing that has been discontinued?

> “When a product is discontinued, the listing just sits there, ready to be hijacked, and in the sea of goods, abuse is rarely noticed — even when it concerns Amazon’s own brands.” — Rachel Johnson Greer to [The Verge](https://www.theverge.com/2019/8/29/20837359/amazon-basics-fake-sellers-imposters-third-party-marketplace).

Sellers can change listing photos, descriptions or even add completely separate products as “variations” — this is why you can see baby toys sold under the same listing as socket wrenches. By opening products to be edited freely by any of the sellers of an item while simultaneously granting them the “Amazon stamp of approval,” the website is clearly misleading.

The website says Amazon. The warehouse says Amazon. The box and packaging tape says Amazon. The product is Amazon-approved, but no approval has taken place. Amazon grants listings the veneer of respectability without any of the efforts of accountability.

And there really is zero legal accountability.

> “Amazon’s legal defense in safety disputes over third-party sales is that it is not the seller and so can’t be responsible under state statutes that let consumers sue retailers. Amazon also says that, as a provider of an online forum, it is protected by the law — Section 230 of the Communications Decency Act of 1996 — that shields internet platforms from liability for what others post there.” — [WSJ](https://www.wsj.com/articles/amazon-has-ceded-control-of-its-site-the-result-thousands-of-banned-unsafe-or-mislabeled-products-11566564990).

When a counterfeit hoverboard burned down a family home in 2016, the court [ruled that Amazon was not liable for any damages](https://www.cnbc.com/2018/06/02/amazon-not-liable-for-exploding-hoverboard-marketplace-argument-wins.html). After all, why should companies be liable for information posted on their website?

There are a few ways consumers can decrease the chances of falling victim to purchasing knock-offs. One way is by using an application such as [FakeSpot](https://www.fakespot.com/), which analyzes Amazon reviews and seller data. Though it does not solve the issue of commingled inventory, it may detect paid reviews and listing hijacking. Another way is to purchase items critical to personal safety, such as bike helmets and child seats, from traditional brick-and-mortar retailers who are far less likely to stock counterfeits.

As Amazon turns into an overpriced AliExpress, its corruption reflects the rotten nature of tech companies’ loose moderation of their own platforms. “Fake News” and misinformation on social media are damaging enough. When it is brought into the real world, every single counterfeit product and misleading listing [represents real-life cases of fraud and loss](https://www.theatlantic.com/technology/archive/2018/04/amazon-may-have-a-counterfeit-problem/558482/). Buyers trust Amazon to provide accurate reviews and product listings for their safety and health products. When there is no accountability, injury and, on occasion, [loss of life can occur](https://thecounterfeitreport.com/press_release_details.php?date=2019-10-09&id=854).

We need to hold tech companies as a whole liable for the fraud they permit on their platforms— starting with Amazon.

```

# content/blog/2020-08-25_your-amazon-products-could-be-all-be-counterfeit-here-s-why/0__xGI8Jqhk8YJtALjZ.jpg

This is a binary file of the type: Image

# content/blog/2020-07-30_to-be-admitted-to-an-ivy-league-stop-being-infatuated-with-it/index.md

```md
---
title: "To Be Admitted To An Ivy League, Stop Being Infatuated With It"
subheading: "Clout-chasing is a disease."
description: "Higher education is a tool, not a medal. This article covers T20 college admissions, Ivy Leagues, competition, admissions officers, and superficial success."
date: "2020-07-30T00:22:21.715Z"
template: post
category: "College & Career"
---

![](./0__5Nwc1zkJZs04ciyN.jpg)

Perhaps you stumbled across this article on social media or read it on one college forum or another. However, **if you were sent this link directly as an intervention, the following sentence is for you:**

#### You are infatuated with prestigious colleges to a self-destructive degree.

I could spew out the usual emotional palliatives: “life goes on,” “college is one step on your path,” “admissions is a toss-up anyway.” **However, I know these statements do not work for you.** Whether you are deep into the admissions process and stressing out about being admitted to a T20, or you were just rejected from your dream school — **I understand how you feel.**

**Bitter. Furious.** Four years or more of your life spent wasting away on SAT Prep, summer research programs, and writing a suite of suck-up essays where you figuratively licked the boot of every university in question. You skipped birthday parties to take Math II, stacked on too many AP classes — most of which you abhorred. Long nights of no sleep, separation from your friends, weeks, months perhaps of stress and anxiety.

“If I didn’t get into Harvard, this is all for naught!”

> **Sunk-Cost Fallacy:** Individuals commit the sunk cost fallacy when they continue a behavior or endeavor as a result of previously invested resources, whether it be time, money or effort (Arkes & Blumer, 1985).

Chicken soup for the soul is not going to make you feel better. Only success will. You have all your peers to prove wrong, who had fun and partied when you were studying. Parents who spent $50,000 on an admissions counselor of dubious quality expect you to earn that money back many-fold. All your friends tell you to “follow your passion,” but you don’t know what your passion is. You don’t even know who your friends are.

In a rush to get ahead, you have lost where you are and are now furiously sprinting — too scared to slow down. **Do you know what you want your life to be about? Or have you only blindly followed the rumors and expectations others have set for you?**

Do you genuinely believe all Ivy League students [founded a Fortune 500 Company or won a Nobel Peace Prize to be admitted?](https://medium.com/@fangdaddy/what-is-a-college-application-spike-and-should-i-have-one-b7e776e92f09)

That [43% of white Harvard admittees being recruited athletes, friends and family of staff, and legacy](https://www.nber.org/papers/w26316#:~:text=Harvard%20University%20provided%20an%20unprecedented,faculty%20and%20staff%20%28ALDCs%29.) is only a passing coincidence? Their admitted students [may not be the sharpest knife in the drawer](https://www.thecrimson.com/article/2017/6/5/2021-offers-rescinded-memes/) either.

Is it possible that what matters [is the problem-solving, reasoning, and leadership skills](https://growingleaders.com/blog/student-success/) you acquired throughout high school and beyond? That there are [only three Ivy Leagues in the Top Ten National Research Universities](https://www.bestcollegereviews.org/top-research-universities/)?

Most of what I just said likely went in one ear and out the other. Part of it is stubbornness mixed with fear. A desperate attempt to hold on to an identity largely based on a strange sort of gamesmanship, trying to “one-up” peers in every category of endless competition.

A pointless life-long marathon against unseen ghosts behind you and the platonic ideal of the perfect child, student, spouse, human forever in front.

**Do you think that it will ever end?**

**That even if you get one win here, your goalposts will not move to idol-worship of Meta or McKinsey or M-something or another?**

Perhaps you think I’m wrong. That yes, only the most money and greatest amount of prestige and a perfect business card with subtle off-white coloring will bring you life’s ultimate fulfillment.

That’s okay. I’m not here to judge you.

Change occurs gradually, and while the old, toxic parts are washed away, there is space for the new. Were you forced to play a sport, an instrument, do something you hated to the core? Perhaps you can begin piano again and realize that music has beauty once the pressure to be perfect is gone, as I did. Competition is a disease, one that rots from the inside out.

Abandon the veneer of perfection defined by society, and come clean.

We can now understand what the issues with “clout-chasing” college admissions forums and counselor websites are. They believe in victory at any cost; a quote they use is “It is better to cry in a Maserati than laugh in a Toyota” — that means if they are unhappy in life, at least they are unhappy Ivy League graduates. What a toxic, myopic, ludicrous perspective. The writers are either manipulating the concerns of first-generation students and immigrant parents to empty their wallets — or they really do believe their own spiel. I see parents living vicariously through their children, pushing their sons and daughters to be admitted by the very colleges that rejected them, without any consideration for whether their children want to be there in the first place. Is it no wonder that self-deprecation, depression, and stress are so commonplace?

> “Comparison is the thief of joy.”

Higher education is a tool, not a medal. If you truly wish to be admitted to an Ivy League, you must view it as such. **An applicant under the delusion that an Ivy League acceptance is the peak of their _entire_ _life_ is not a desirable student to take in.** There is a reason Olympic athletes and seven-figure startup founders are accepted into Harvard, but it is _not_ because they did what they did to get into college. To pursue an interest to that extent suggests that they do not necessarily care about college at all — with or without an Ivy League acceptance, they intend to succeed. Now _that_ catches an admission officer’s attention.

Isn’t that the ultimate tragedy of the Ivy League wannabe? By seeking so desperately a loophole into what they believe is the only way to succeed in life, they decrease their chances of being admitted. In changing every aspect of their personality and interests to match the stereotypical “Ivy League student,” they have stripped away the unique and left behind a stiff, cardboard image in its stead.

Why would any university want an aimless fanboy whose wildest dream is attending an undergraduate university based on the single criteria of its place on the US World and News ranking?

A final bit of irony, the definition of clout-chaser:

> “Clout chasers, or those that do things just to project a hipper persona on social media, are greatly disliked, deemed superficial and fake.” — dictionary.com

What better word to describe the students who give up all in a vain attempt to appear ostensibly successful?

```

# content/blog/2020-07-30_to-be-admitted-to-an-ivy-league-stop-being-infatuated-with-it/0__5Nwc1zkJZs04ciyN.jpg

This is a binary file of the type: Image

# content/blog/2020-07-29_what-is-a-college-application-spike-and-should-i-have-one/index.md

```md
---
title: "What Is A College Application 'Spike' And Should I Have One?"
subheading: "Answer: no. Covering the newest fad amongst college admissions forums."
description: "'Spike' is a myopic way to view the extracurricular process for college admissions, and promoting one-size-fits-all strategies is harmful to students. Inventing 'world-changing' ideas solely to be admitted into a T20 or Ivy League is unlikely to succeed."
date: "2020-07-29T18:00:07.939Z"
template: post
category: "College & Career"
---

![](./0__LxguM8OQ6HZpf__Vp.jpg)

One of the first questions I am asked by some students beginning the college application process: “What extracurriculars will _guarantee_ my admission into Harvard?”

Oddly enough, when I say “Olympic Athlete,” “Founding a Fortune 500 Company,” and “Writing a New York Times Best-Selling Novel,” they believe I am speaking in jest. I’m not — they wanted a _guaranteed ticket_, and, especially given the variance of the college admissions process, I wouldn’t guarantee anything less.

But there has to be a magic formula, right? After all, there are all those _normal_ students attending top colleges — they must have discovered a secret pathway, an extracurricular loophole into manipulating Ivy Leagues to accept them. If you are willing to believe less-than-credible internet forums and dodgy websites, there are a plethora. One that is quite prevalent: the “Spike.”

“Spike” is simple; colleges want the next Bill Gates to attend their campus instead of their competitors’. Therefore, audacious “game-changers” will be recruited over their peers. Instead of focusing on delivering a complete, well-rounded profile, students should select an idea that can “change the world” and put all their time and energy into this idea. In fact, applicants should have _already_ changed the world by the time they apply to college. After all, what better way to indicate future success than past success? **Before, you applied to Ivy Leagues to cure cancer. Now, you cure cancer to apply to an Ivy League.** Instead of building a growth mentality, they say, seek short-term successes to impersonate an outstanding polymath. Forget well-rounded; forget sports, forget grades, forget standardized tests! Bill Gates doesn’t care about his SAT score — why should you?

My disdain for “Spike” is clear; it creates a toxic culture where students are expected to prove themselves first, even to be allowed to prove themselves, and beyond that represents frankly a risky and unhealthy mentality. “Spike” aggravates the stress and pressure placed on high school students, who are now ingrained with the belief that they are failures before they have even learned how to try. The university you go to is not a medal; higher education shouldn’t be reduced to a mere status symbol granted to the students who have achieved mediocre notoriety in secondary school.

I have [never heard of an admissions officer mentioning the word “Spike,” nor has it come up in any conference, meeting, or university guidelines](https://www.reddit.com/r/ApplyingToCollege/comments/nv3yye/how_important_is_a_spike_really/h132ura/?context=10000). As quoted by so-called “experts” on the internet, however, the definition of “Spike”: to be admitted to a top university, one _must_ demonstrate significant accomplishment in a single subject or area which they intend to pursue as a career.

What counts as a “significant accomplishment” in a field? Only a tiny fraction of high schoolers conduct groundbreaking scientific work — even graduate and PhD-level researchers fight tooth-and-nail for every last lab position and co-author name. Forgetting even that, the whole concept of creating “world-changing projects” for the sake of college admissions is dishonest by itself. Presented with an impossible goal (accomplishing PhD-level scientific discoveries or building a 7-figure startup as a high-schooler), is it no wonder that students choose to cheat and lie in the vain hope of achieving what they believe is the _only way_ to be admitted into a top university?

Perhaps that is why the whole concept of an “extracurricular” is broken in modern-day college applications. Instead of concise, well-polished descriptions of clubs and sports such as:

> Friends For Nature: 9–12. Picked up trash. Coordinated recycling drives. Raised over $2,000 for creek clean-up fund. Secretary in 10, President in 11–12.

I see abbreviation dress-up:

> O2HH: 10–12. Reg-recog. societ. research and problem amelioration org. Targets homeless ind. Fix poverty. Raised $10,000 seed. VP of Ind. and Marketing 11–12.

Sure, the second example sounds like a “Spike.” A “game-changer.” A “success-maker.” A “person-prover.” Whatever business gibberish is invented to spoon-feed students the insane idea that college admissions officers enjoy reading ostentatious drivel written by an egotistic high schooler.

Either college admissions counselors created this ludicrous concept in order to fleece money from worried parents and scared students, or they have abandoned the concept of authenticity in its entirety and put the cart before the horse.

At the core of any falsehood lies a speck of truth. **For “Spike,” the essence lies in two concepts: being passionate and dedicated to what you love and sounding interesting while you do so.** Applicants who care about their major and career appear likable and enthusiastic. Knowing what direction you intend your life to go allows you to take the reins into your own hands and supports a deep dive into the subject(s) you intend to pursue. With greater knowledge, applicants find it easier to sound interesting. At the end of the day, that plays an important part in convincing an admission officer to accept you when they rejected three other students with a similar profile. Personality should shine through, authentic belief in the learning process and not a fixation on only the results.

It’s why students end up asking “should I include activities not related to my major?” — they believe only by demonstrating single-minded infatuation regarding their field of choice can they be admitted, removing any opportunity for personal differentiation at the same time, utterly dooming their application to an imitation of the prototypical.

_“But what about this random guy on the internet who all he did was work on this one thing and all the colleges loved him because he changed the world!”_

If you have genuinely done groundbreaking work in high school, the college you attend _should not matter._ Higher education is a tool, a pathway to success — not a destination. That is to say, Olympic athletes and Forbes 30 under 30 are able to attend wherever they want, but they didn’t achieve those heights because they _really_ wanted to attend a higher-ranked U.S. News undergrad university.

The truth is, changing the world or achieving accolades professionals spend decades working towards as a teenager is even harder than it sounds, and admissions officers hate arrogance and braggadocio with a burning passion. Audacious claims of solving world issues of which governments pay think tanks and aid organizations billions per year to alleviate tend not to sit well. Contrived high-school nonprofits blown up to ridiculous proportions are an insult to actual NPOs and students who have made real contributions to their communities.

If your entire application revolves around a single item, you’re in essence depending on it as the sole argument for admission. It’s incredibly risky — what if it doesn’t work out and you have nothing at the end? Plenty of brilliant ideas with years of planning are derailed because of events completely out of anyone’s control — say, a global pandemic. If your “Spike” is a competition-related activity, you better win first place, because the AO has no reason not to select the student who placed one spot higher (and who potentially has other interests and activities in comparison to your single one) instead.

> “….the reason OP’s post makes me slightly angry is because the idea of aiming for excellence in order to get into HYPS+ is like reorienting your entire life around buying as many lottery tickets as possible. Sure, it will work out for some people through random chance, but that doesn’t make it a good life decision!” <br> — [Current Assistant Director of Admissions at MIT](https://www.reddit.com/r/ApplyingToCollege/comments/fqo68j/aos_cant_actually_detect_authenticity_or_passion/flu6ovu/?context=10000).

Having a passion project and pursuing it at an advanced level is one thing, but to argue that everyone _needs to_ have one, _needs to_ magically discover the one thing they will devote their life to in their high school tenure, _needs to_ achieve significant recognition in that specific field during those four years, just to be considered a “successful student” and admitted to a good university?

That’s the tragedy of “Spike,” an idea rooted in logic and common sense (a central identity helps to sell your personal brand), but has been corrupted to be its antithesis — single-minded deterministic thinking that the only way to differentiate yourself is achieving the maximum awards or accolades in exactly the field you intend to pursue while simultaneously devaluing the hobbies and activities which truly set your application apart. If it is disingenuous, do you believe admissions officers cannot see right through it? That this type of thinking does not invariably lead to cutthroat competition, involution, and fictitious, exaggerated applications?

There’s more to life than an Ivy League; no need to lie and cheat to get in.

Alternatively, donate a new library.

I’m sure that will work better.

_Part 2:_ [_The College Application “Spike” Is Dumb. Now What?_](https://blog.kevinfang.tech/blog/2021-08-15_The-College-Application-Spike-Is-Dumb-Now-What/)

> _Originally published on [Medium](https://medium.com/college-admissions-central/what-is-a-college-application-spike-and-should-i-have-one-b7e776e92f09)_

```

# content/blog/2020-07-29_what-is-a-college-application-spike-and-should-i-have-one/0__LxguM8OQ6HZpf__Vp.jpg

This is a binary file of the type: Image

