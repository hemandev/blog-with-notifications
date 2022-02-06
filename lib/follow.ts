import { supabaseClient } from './supabase/client'

export interface Follow {
  id?: string
  follower?: string
  followed_by?: string
}

export async function isFollowing(targetUser: string, currentUser: string): Promise<Follow> {
  const { data, error } = await supabaseClient
    .from('followers')
    .select()
    .eq('follower', targetUser)
    .eq('followed_by', currentUser)
  return data as Follow
}

export async function addFollower(followUser: string, followedByUser: string): Promise<Follow> {
  const { data, error } = await supabaseClient
    .from('followers')
    .insert([{ follower: followUser, followed_by: followedByUser }])
    .single()
  return data as Follow
}

export async function unFollow(followUser: string, followedByUser: string): Promise<Follow> {
  const { data, error } = await supabaseClient
    .from('followers')
    .delete()
    .match({
      following: followUser,
      followed_by: followedByUser
    })
  return data as Follow
}
