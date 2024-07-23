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
