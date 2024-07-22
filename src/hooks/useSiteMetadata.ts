// hooks/useSiteMetadata.ts
import { useState, useEffect } from 'react';

const useSiteMetadata = () => {
  const [metadata, setMetadata] = useState({
    title: '',
    author: { name: '', summary: '', social: {} },
    description: '',
    siteUrl: '',
    disqusShortname: ''
  });

  useEffect(() => {
    import('../../siteMetadata.json').then((data) => {
      setMetadata(data.default || data);
    });
  }, []);

  return metadata;
};

export default useSiteMetadata;
