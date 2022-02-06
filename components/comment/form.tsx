import { Dispatch, FormEventHandler, SetStateAction } from 'react'

interface CommentFormProps {
  text: string
  onSubmit: FormEventHandler<HTMLFormElement>
  isAuthenticated: boolean
  setText: Dispatch<SetStateAction<string>>
}

function CommentForm({
  text,
  setText,
  onSubmit,
  isAuthenticated,
}: CommentFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500 outline-emerald-400"
        rows={2}
        placeholder={
          isAuthenticated
            ? `What are your thoughts?`
            : 'Please login to leave a comment'
        }
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!isAuthenticated}
      />

      <div className="flex items-center mt-4">
        {isAuthenticated && (
          <div className="flex items-center space-x-6">
            <button
              disabled={!isAuthenticated}
              className="py-2 px-4 rounded bg-emerald-500 text-white disabled:opacity-40 hover:bg-emerald-600 ease-in transition-all"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default CommentForm
