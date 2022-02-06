import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Comment from '../../components/comment'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { getPostAsHtml, getPostBySlug, Post } from '../../lib/post'
import { supabaseClient } from '../../lib/supabase/client'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

interface PostPageProps {
  post: Post
  user: User
}

export default function PostPage({ post, user }: PostPageProps) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Container user={user}>
      <Head>
        <title>{post.title} | My awesome blog</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header>
              <h1 className="text-4xl font-bold">{post.title}</h1>
              {post.description ? (
                <p className="mt-2 text-xl">{post.description}</p>
              ) : null}
              <Link href={`/profile/${post.email}`}>
                <a className="text-gray-600 mr-4 text-lg py-1">{post.author}</a>
              </Link>
              <div className="flex gap-6 items-baseline">
                <time className="flex mt-2 text-gray-400">
                  {post.created_at}
                </time>
                <button className="flex justify-center items-center gap-1">
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
                </button>
              </div>
            </header>

            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </article>
          <Comment postId={post.id || ''} user={user} />
        </div>
      )}
    </Container>
  )
}

export async function getServerSideProps({
  params,
  req,
}: GetServerSidePropsContext) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }
  const post = await getPostBySlug(params?.slug as string)
  const { html, frontMatter } = await getPostAsHtml(post?.content as string)
  return {
    props: { post: { ...post, content: html, frontMatter }, user },
  }
}
