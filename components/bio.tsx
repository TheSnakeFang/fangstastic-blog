import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface Author {
  name: string;
  summary?: string;
}

interface Social {
  linkedin?: string;
}

interface SiteMetadata {
  author: Author;
  social: Social;
}

// Assuming you have a function to fetch this data
// This is a placeholder function. You should replace it with actual data fetching logic
const fetchBioData = async (): Promise<{ siteMetadata: SiteMetadata; avatarUrl: string }> => {
  // Fetch data here
  return {
    siteMetadata: {
      author: {
        name: 'Author Name',
        summary: 'Author Summary',
      },
      social: {
        linkedin: 'Author LinkedIn',
      },
    },
    avatarUrl: '/path/to/profile-pic.png',
  };
};

const Bio: React.FC = () => {
  const [bioData, setBioData] = useState<{ siteMetadata: SiteMetadata; avatarUrl: string }>();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBioData();
      setBioData(data);
    };

    getData();
  }, []);

  return (
    <div className="bio">
      {bioData?.avatarUrl && (
        <Image
          src={bioData.avatarUrl}
          alt={bioData.siteMetadata.author.name || ''}
          width={50}
          height={50}
          className="bio-avatar"
          style={{
            borderRadius: '50%',
          }}
        />
      )}
      {bioData?.siteMetadata.author.name && (
        <p>
          Written by <strong>{bioData.siteMetadata.author.name}</strong> {bioData.siteMetadata.author.summary || null}
        </p>
      )}
    </div>
  );
};

export default Bio;

/* 
const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
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
*/
