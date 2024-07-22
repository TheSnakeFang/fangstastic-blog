import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Pagination from "../components/pagination";

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { edges } = data.allMarkdownRemark;
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
    totalPages
  } = pageContext;
  const currentPageInfo = currentPage > 0 ? `Page ${currentPage}` : '';

  if (edges.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={siteTitle} />
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
      <ol className="blog-list">
        {edges.map(edge => {
          const title = edge.node.frontmatter.title || edge.node.fields.slug

          return (
            <li key={edge.node.fields.slug} className="blog-list-item">
              <Link to={edge.node.fields.slug} itemProp="url" className="title">
                <span itemProp="headline">{title}</span>
              </Link>
              <small className="date">{edge.node.frontmatter.date}</small>
            </li>
          )
        })}
      </ol>
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
      filter: {frontmatter: {template: {eq: "post"}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            subheading
          }
        }
      }
    }
  }
`
