import { Auth, Button, Icon, Space, Typography, Card } from '@supabase/ui'
import type { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Container from '../components/container'
import PostList from '../components/postList'
import { getTrendingPosts, Post } from '../lib/post'
import { supabaseClient } from '../lib/supabase/client'

interface HomeProps {
  trendingPosts: Post[]
}

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Home = ({ trendingPosts = [], ...props }: HomeProps) => {
  const { user, session } = Auth.useUser()
  const { data, error } = useSWR(
    session ? ['/api/auth/getUser', session.access_token] : null,
    fetcher
  )
  console.log(user, session)
  const [authView, setAuthView] = useState('sign_in')

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        console.log('Event changed', event)
        if (event === 'PASSWORD_RECOVERY') {
          setAuthView('forgotten_password')
        }
        if (event === 'USER_UPDATED') {
          setTimeout(() => setAuthView('sign_in'), 1000)
        }
        fetch('/api/auth/set', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const View = () => {
    if (!user) {
      return (
        <div style={{ maxWidth: '420px', margin: '96px auto' }}>
          <Card>
            <Space direction="vertical" size={8}>
              <div className="text-center">
                <Typography.Title level={3}>
                  Welcome to fsociety
                </Typography.Title>
              </div>
              <Auth
                supabaseClient={supabaseClient}
                view={authView as any}
                magicLink={true}
              />
            </Space>
          </Card>
        </div>
      )
    }

    return (
      <>
        {user && (
          <Container>
            <div className="container max-w-4xl m-auto px-4 my-10 flex flex-col items-center justify-center">
              <div className="mb-10">
                <Image
                  src="/cover.jpg"
                  alt="my desk"
                  width={1920 / 4}
                  height={1280 / 4}
                />
              </div>
              <div className="space-y-6 mb-10">
                <h1 className="text-2xl">
                  Hello, <span className="font-bold">{user?.email}</span> here
                  are today&apos;s trending topics
                </h1>
              </div>
              <PostList posts={trendingPosts} />
            </div>
          </Container>
        )}
      </>
    )
  }

  return <View />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('headers', context.req.headers)
  const trendingPosts = await getTrendingPosts()
  return {
    props: { trendingPosts },
  }
}

export default Home
