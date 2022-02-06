import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import Container from '../../components/container'
import PostList from '../../components/postList'
import { getAllPosts, Post } from '../../lib/post'
import { supabaseClient } from '../../lib/supabase/client'

interface PostsProps {
  allPosts: Post[]
}

export default function Posts({ allPosts = [] }: PostsProps) {
  return (
    <Container>
      <PostList posts={allPosts} />
    </Container>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }
  
  const allPosts = await getAllPosts()
  return {
    props: { allPosts, user },
  }
}
