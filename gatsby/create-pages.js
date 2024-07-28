"use strict"

const path = require("path")
const createPostsPages = require("./pagination/create-posts-pages.js")
const slugify = require("slugify")

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

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
              date(formatString: "DD MMMM, YYYY")
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

      const newSlug = postEdge.node.fields.slug
      const oldSlug = `/blog/${slugify(postEdge.node.frontmatter.title, { strict: true })}/`

      createPage({
        path: newSlug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: newSlug,
          previous,
          next,
        },
      })

      // Create redirect if the new slug is different from the old one
      if (oldSlug !== newSlug) {
        createRedirect({
          fromPath: oldSlug,
          toPath: newSlug,
          isPermanent: true,
          redirectInBrowser: true,
        })
      }
    })
  }

  await createPostsPages(graphql, actions)
}

module.exports = createPages