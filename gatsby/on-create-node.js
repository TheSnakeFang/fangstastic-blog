"use strict"

const { createFilePath } = require("gatsby-source-filesystem")

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let slug
    if (node.frontmatter.title && node.frontmatter.date) {
      slug = createSlug(node.frontmatter.title, node.frontmatter.date)
    } 
    /*else {
      //Fallback to creating a slug from the file path if title or date is missing
      slug = createFilePath({ node, getNode, basePath: `pages` })
    }
      */
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}

function createSlug(title, date) {
  if (title.toLowerCase() === "about me") {
    return "about-me"
  }
  const formattedDate = date ? date.split("T")[0] : new Date().toISOString().split("T")[0] // YYYY-MM-DD
  const formattedTitle = title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    : "untitled"
  return `${formattedDate}_${formattedTitle}`
}

module.exports = onCreateNode