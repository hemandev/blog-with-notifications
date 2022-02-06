import distanceToNow from '../../lib/dateRelative'
import Image from 'next/image'
import { Auth } from '@supabase/ui'
import Link from 'next/link'

function CommentList({ comments, onDelete }: any) {
  const { user, session } = Auth.useUser()
  return (
    <div className="space-y-6 mt-10">
      {comments.map((comment: any) => {
        const isAuthor = user && user?.email === comment?.user

        return (
          <div key={comment.created_at} className="flex space-x-4">
            <div className="flex-shrink-0">
              <Link href={`/profile/${comment.user}`}>
                <a>
                  <Image
                    src={'https://i.pravatar.cc/40'}
                    alt={comment.user}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </a>
              </Link>
            </div>

            <div className="flex-grow">
              <div className="flex space-x-2">
                <b>{comment.user}</b>
                <time className="text-gray-400">
                  {distanceToNow(new Date(comment.created_at))}
                </time>
                {isAuthor && (
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => onDelete(comment)}
                    aria-label="Close"
                  >
                    x
                  </button>
                )}
              </div>

              <div>{comment.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CommentList
