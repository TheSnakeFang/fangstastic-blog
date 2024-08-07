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
