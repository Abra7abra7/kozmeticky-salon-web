import { NextResponse } from 'next/server'

// V reálnom projekte by sme použili SendGrid, Postmark alebo inú službu na odosielanie emailov
const sendEmail = async (data: any) => {
  // Implementácia odoslania emailu
  console.log('Sending email with data:', data)
  return true
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validácia vstupu by mala byť implementovaná
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Chýbajúce povinné polia' },
        { status: 400 }
      )
    }
    
    // Odoslanie emailu
    await sendEmail({
      to: 'info@beautysalon.sk',
      subject: `Nová správa z webu od ${body.name}`,
      text: body.message,
      replyTo: body.email
    })
    
    return NextResponse.json({ 
      success: true,
      message: 'Správa bola úspešne odoslaná' 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Chyba pri odosielaní správy' },
      { status: 500 }
    )
  }
}
