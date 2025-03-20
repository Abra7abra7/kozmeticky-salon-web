'use server'

import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './config'

export const createServerClient = () => {
  return createClient(
    supabaseConfig.url,
    supabaseConfig.serviceKey
  )
}
