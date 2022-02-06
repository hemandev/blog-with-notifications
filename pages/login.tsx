import Container from '../components/container'
import { supabaseClient } from '../lib/supabase/client'
import { Auth } from '@supabase/ui'

export default function Profile() {
  return (
    <Container>
      <Auth supabaseClient={supabaseClient} magicLink={true} />
    </Container>
  )
}
