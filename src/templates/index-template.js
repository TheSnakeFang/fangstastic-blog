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
