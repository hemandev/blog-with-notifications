import Container from '../../components/container'
import { supabaseClient } from '../../lib/supabase/client'
import Image from 'next/image'
import { GetServerSidePropsContext } from 'next'
import { Auth } from '@supabase/ui'

interface ProfileProps {
  email?: string
}

export default function Profile({ email }: ProfileProps) {
  const { user, session } = Auth.useUser()
  console.log('Current user', user)
  return (
    <Container>
      <div className="flex justify-center items-center gap-6">
        <Image
          src={'https://i.pravatar.cc/300'}
          alt="profile picture"
          width={300}
          height={300}
          className="rounded-full"
        />
        {user?.email !== email && (
          <button
            className="bg-emerald-500 hover:bg-emerald-600 ease-in transition-all py-2 px-4  rounded text-white"
            onClick={async () => {
              const { error } = await supabaseClient.auth.signOut()
              if (error) console.log('Error logging out:', error.message)
            }}
          >
            Follow
          </button>
        )}
      </div>
      <h2 className="text-4xl text-center mt-10">{email}</h2>
    </Container>
  )
}

export async function getServerSideProps({
  params,
  req,
}: GetServerSidePropsContext) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }
  return {
    props: {
      email: params?.email || '',
    },
  }
}
