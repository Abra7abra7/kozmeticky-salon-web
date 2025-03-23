import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    console.log('Testing Resend setup...');
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('API Key:', process.env.RESEND_API_KEY);
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data = await resend.emails.send({
      from: 'Kozmetický salón <onboarding@resend.dev>',
      to: ['stancikmarian8@gmail.com'],
      subject: 'Test Email from Kozmetický salón',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #db2777;">Test Email</h1>
          <p>Toto je testovací email z vášho rezervačného systému.</p>
          <p>Ak vidíte tento email, znamená to že Resend je správne nakonfigurovaný.</p>
          <p>Čas odoslania: ${new Date().toLocaleString('sk-SK')}</p>
        </div>
      `,
    });
    
    console.log('Email sent successfully:', data);
    
    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Test email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}
