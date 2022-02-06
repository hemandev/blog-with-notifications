import { Auth } from '@supabase/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabaseClient } from '../lib/supabase/client'

function Header() {
  const { user, session } = Auth.useUser()
  const router = useRouter()
  return (
    <header className="pb-6">
      <nav className="flex gap-4 items-center">
        <Link href="/">
          <a>Home</a>
        </Link>
        <button onClick={() => router.push(`/profile/${user?.email}`)}>
          Profile
        </button>
        <Link href="/posts">
          <a className="mr-auto">Posts</a>
        </Link>
        <Link href="/create-new">
          <a className="bg-emerald-500 hover:bg-emerald-600 ease-in transition-all py-2 px-4  rounded text-white">
            Create New
          </a>
        </Link>
        <button
          onClick={async () => {
            const { error } = await supabaseClient.auth.signOut()
            if (error) console.log('Error logging out:', error.message)
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header