import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('popularity', { ascending: false })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Chyba pri získavaní služieb' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()
    
    // Validácia vstupu by mala byť implementovaná
    
    const { data, error } = await supabase
      .from('services')
      .insert(body)
      .select()
    
    if (error) {
      throw new Error(error.message)
    }
    
    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Chyba pri vytváraní služby' },
      { status: 500 }
    )
  }
}
