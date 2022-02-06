import matter from 'gray-matter'
import markdownToHtml from './markdownToHtml'
import { supabaseClient } from './supabase/client'
import generateSlug from 'slug'
import distanceToNow from './dateRelative'

export interface Post {
  id?: string
  slug?: string
  title?: string
  description?: string
  content?: string
  created_at?: string
  author?: string
  email?: string
  likes?: string
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, error } = await supabaseClient
    .from('post')
    .select()
    .eq('slug', slug)
    .limit(1)
    .single()
  return formatPost(data)
}

function getUserName(email: string) {
  const atIndex = email.indexOf('@')
  return email.substring(0, atIndex)
}

function formatPost(post: Post) {
  return {
    ...post,
    created_at: distanceToNow(new Date(post.created_at || '')),
    email: post.author,
    author: getUserName(post.author || ''),
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabaseClient.from('post').select(`
  title,
  created_at,
  author,
  description,
  slug,
  likes,
  id
  `)
  return data?.map(formatPost) as Post[]
}

export async function getTrendingPosts(): Promise<Post[]> {
  const { data, error } = await supabaseClient
    .from('post')
    .select(
      `
  title,
  created_at,
  author,
  description,
  slug,
  likes
  `
    )
    .order('likes', { ascending: false })
    .limit(3)
  return data?.map(formatPost) as Post[]
}

export async function getPostAsHtml(markdown: string) {
  const { data, content } = matter(markdown)
  const html = await markdownToHtml(content)

  return {
    html,
    frontMatter: data,
  }
}

function generateDescription(content: string) {
  const end = content.substring(100)
  const spaceIndex = end.indexOf('.')
  return content.substring(0, spaceIndex + 100)
}

export async function createPost({ title, content }: Post): Promise<Post> {
  const user = supabaseClient.auth.user()
  const slug = generateSlug(title as string)
  const description = generateDescription(content || '')
  const { data } = await supabaseClient
    .from('post')
    .insert([{ title, content, author: user?.email, slug, description }])
    .single()
  return data
}
