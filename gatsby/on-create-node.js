"use strict"

const { createFilePath } = require("gatsby-source-filesystem")
const slugify = require("slugify")

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    
    // Create a lowercase slug from the title
    const titleSlug = slugify(node.frontmatter.title, { lower: true, strict: true })
    
    createNodeField({
      name: `slug`,
      node,
      value: `/blog/${titleSlug}/`,
    })
  }
}

module.exports = onCreateNode