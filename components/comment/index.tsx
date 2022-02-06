import { User } from '@supabase/supabase-js'
import CommentForm from './form'
import CommentList from './list'
import useComments from './useComment'

interface CommentProps {
  postId: string
  user: User
}

function Comment({ postId, user }: CommentProps) {
  const { text, setText, comments, onSubmit, onDelete, isAuthenticated } =
    useComments(postId, user)

  return (
    <div className="mt-20">
      <CommentForm
        onSubmit={onSubmit as any}
        text={text}
        setText={setText}
        isAuthenticated={isAuthenticated}
      />
      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  )
}

export default Comment
