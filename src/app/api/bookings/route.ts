import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, service:serviceId(*), team_member:teamMemberId(*)')
      .order('dateTime', { ascending: true })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Chyba pri získavaní rezervácií' },
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
      .from('bookings')
      .insert({
        ...body,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      })
      .select()
    
    if (error) {
      throw new Error(error.message)
    }
    
    // Tuto by mala byť implementovaná logika pre odoslanie potvrdzovacieho emailu
    
    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Chyba pri vytváraní rezervácie' },
      { status: 500 }
    )
  }
}
