import { Auth } from '@supabase/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabaseClient } from '../lib/supabase/client'
import { Engagespot } from '@engagespot/react-component'
import { User } from '@supabase/supabase-js'

interface HeaderProps {
  user: User
}

function Header({ user }: HeaderProps) {
  //const { user, session } = Auth.useUser()
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
        <Engagespot
          apiKey={process.env.NEXT_PUBLIC_ENGAGESPOT_API_KEY || ''}
          userId={user?.email || ''}
          enableNonHttpsWebPush={true}
          theme={{
            panel: {
              height: '35rem',
              width: '27rem',
            },
            notificationButton: {
              iconFill: '#000'
            },
            colors: {
              brandingPrimary: 'rgb(16 185 129)',
            },
            header: {
              height: '2.5rem',
            },
            footer: {
              height: '2.5rem'
            }
          }}
        />
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
