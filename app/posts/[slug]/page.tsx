import { getPostData, getAllPostSlugs } from '../../../lib/posts'

export async function generateStaticParams() {
  const paths = getAllPostSlugs()
  return paths
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <article className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
      <div className="text-gray-500 mb-4">{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className="prose" />
    </article>
  )
}