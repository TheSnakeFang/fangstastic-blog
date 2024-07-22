import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul className="space-y-4">
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug} className="border-b pb-4">
            <Link href={`/posts/${slug}`} className="text-xl font-semibold hover:underline">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}