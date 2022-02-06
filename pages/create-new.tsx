import { useState } from 'react'
import { useRouter } from 'next/router'
import 'easymde/dist/easymde.min.css'
import MarkDownEditor from '../components/mdEditor'
import Container from '../components/container'
import { createPost, getPostAsHtml, getPostBySlug } from '../lib/post'
import { GetServerSidePropsContext } from 'next'
import { supabaseClient } from '../lib/supabase/client'

const initialState = { title: '', content: '' }

function CreateNew() {
  const [post, setPost] = useState(initialState)
  const { title, content } = post
  const router = useRouter()
  function onChange(e: any) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
  async function createNewPost() {
    if (!title || !content) return

    const post = await createPost({
      title,
      content,
    })
    router.push(`/posts/${post.slug}`)
  }
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-wide my-6">
        Create new post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <MarkDownEditor
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className="bg-emerald-500 p-2 rounded text-white"
        onClick={createNewPost}
      >
        Create Post
      </button>
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
  return {
    props: {},
  }
}

export default CreateNew
