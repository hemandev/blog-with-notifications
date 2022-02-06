import { User } from '@supabase/supabase-js'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import Container from '../../components/container'
import PostList from '../../components/postList'
import { getAllPosts, Post } from '../../lib/post'
import { supabaseClient } from '../../lib/supabase/client'

interface PostsProps {
  allPosts: Post[]
  user: User
}

export default function Posts({ allPosts = [], user }: PostsProps) {
  return (
    <Container user={user}>
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
