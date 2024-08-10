"use strict"

const path = require("path")
const createPostsPages = require("./pagination/create-posts-pages.js")

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // ... (keep your existing code for 404 page)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date(formatString: "YYYY-MM-DD")
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
      const node = postEdge.node
      
      // Skip nodes without fields or slug
      if (!node.fields || !node.fields.slug) {
        console.log(`Skipping page creation for post: ${node.frontmatter.title}. No slug available.`)
        return
      }

      const slug = node.fields.slug
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `/${slug}/`,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: slug,
          previous: previous && previous.fields ? {
            slug: previous.fields.slug,
            title: previous.frontmatter.title,
            template: previous.frontmatter.template
          } : null,
          next: next && next.fields ? {
            slug: next.fields.slug,
            title: next.frontmatter.title,
            template: next.frontmatter.template
          } : null,
        },
      })
    })
  }

  await createPostsPages(graphql, actions)
}

module.exports = createPages