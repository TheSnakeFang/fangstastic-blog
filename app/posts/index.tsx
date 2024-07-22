import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';

const HomePage = ({ posts }: { posts: { slug: string; frontmatter: { [key: string]: any } }[] }) => {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.frontmatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

export default HomePage;
