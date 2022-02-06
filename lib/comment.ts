import { supabaseClient } from './supabase/client'

export interface Comment {
  id?: string
  content?: string
  created_at?: string
  user?: string
  post?: string
}

export async function getComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabaseClient
    .from('comments')
    .select()
    .eq('post', postId)
  return data as Comment[]
}

export async function createComment({
  content,
  user,
  post,
}: Comment): Promise<Comment> {
  const { data, error } = await supabaseClient
    .from('comments')
    .insert([{ content, user, post }])
    .single()
  return data as Comment
}
