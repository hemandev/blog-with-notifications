import Link from 'next/link'
import { Post } from '../lib/post'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      {posts.length ? (
        posts.map((post) => (
          <article key={post.slug} className="mb-10">
            <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
              <a className="text-lg leading-6 font-bold">{post.title}</a>
            </Link>
            <p>{post.description}</p>
            <div className="flex gap-6 mt-2">
              <div>
                <Link href={`/profile/${post.email}`}>
                  <a className="text-gray-600 mr-4">{post.author}</a>
                </Link>
                <time className="text-gray-400">{post.created_at}</time>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 426.668 426.668"
                  xmlSpace="preserve"
                  className="flex fill-red-400 h-5 w-5"
                >
                  <path
                    d="M401.788,74.476c-63.492-82.432-188.446-33.792-188.446,49.92
	c0-83.712-124.962-132.356-188.463-49.92c-65.63,85.222-0.943,234.509,188.459,320.265
	C402.731,308.985,467.418,159.698,401.788,74.476z"
                  />
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
                <span className="text-gray-400">{post.likes}</span>
              </div>
            </div>
          </article>
        ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </>
  )
}
