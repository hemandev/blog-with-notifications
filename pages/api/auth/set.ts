import { supabaseClient } from '../../../lib/supabase/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await supabaseClient.auth.api.setAuthCookie(req, res)
}
