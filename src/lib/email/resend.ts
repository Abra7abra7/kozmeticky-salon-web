import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resendApiKey = process.env.RESEND_API_KEY;
console.log('Initializing Resend with API key:', resendApiKey);
export const resend = new Resend(resendApiKey);

if (!process.env.NEXT_PUBLIC_APP_URL) {
  console.warn('Missing NEXT_PUBLIC_APP_URL environment variable');
}

export const sendBookingConfirmationEmail = async ({
  to,
  name,
  serviceName,
  date,
  time,
  bookingId,
}: {
  to: string;
  name: string;
  serviceName: string;
  date: string;
  time: string;
  bookingId: string;
}) => {
  try {
    console.log('Sending confirmation email to:', to);
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/rezervacia/zrusit/${bookingId}`;
    
    console.log('Sending confirmation email with Resend...');
    console.log('Cancel URL:', cancelUrl);
    
    const result = await resend.emails.send({
    from: 'Kozmetický salón <onboarding@resend.dev>',
    to: [to],
    subject: 'Potvrdenie rezervácie | Kozmetický salón',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #db2777;">Potvrdenie rezervácie</h1>
        <p>Dobrý deň ${name},</p>
        <p>Ďakujeme za Vašu rezerváciu. Nižšie nájdete detaily Vášho termínu:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Služba:</strong> ${serviceName}</p>
          <p><strong>Dátum:</strong> ${date}</p>
          <p><strong>Čas:</strong> ${time}</p>
        </div>

        <p>
          Ak potrebujete termín zrušiť, môžete tak urobiť najneskôr 24 hodín pred začiatkom termínu 
          kliknutím na nasledujúci odkaz:
        </p>
        
        <p style="margin: 20px 0;">
          <a href="${cancelUrl}" 
             style="background-color: #db2777; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;">
            Zrušiť rezerváciu
          </a>
        </p>

        <p style="color: #6b7280; font-size: 14px;">
          Poznámka: Zrušenie rezervácie je možné len do 24 hodín pred termínom.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        
        <p style="color: #6b7280; font-size: 14px;">
          S pozdravom,<br>
          Tím Kozmetického salónu
        </p>
      </div>
    `,
    });
    
    console.log('Email sent successfully:', result);
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};
