import { User } from '@supabase/supabase-js'
import { Auth } from '@supabase/ui'
import { useState } from 'react'
import useSWR from 'swr'
import { createComment, getComments } from '../../lib/comment'

export default function useComments(postId: string, user: User) {
  const [text, setText] = useState('')
  const isAuthenticated = user != null

  const { data: comments, mutate } = useSWR(postId, getComments)

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    const data = await createComment({
      user: user?.email,
      post: postId,
      content: text,
    })
    await mutate()
    setText('')
  }

  const onDelete = async (comment: string) => {}

  return {
    text,
    setText,
    comments: comments || [],
    onSubmit,
    onDelete,
    isAuthenticated,
  }
}
