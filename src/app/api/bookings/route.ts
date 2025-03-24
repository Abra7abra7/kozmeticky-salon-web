import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { sendBookingConfirmationEmail } from '@/lib/email/resend';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';

export async function GET() {
  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, service:serviceId(*), team_member:teamMemberId(*)')
      .order('dateTime', { ascending: true });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Chyba pri získavaní rezervácií' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    
    // Validácia vstupu
    if (!body.clientEmail || !body.clientName || !body.serviceId || !body.dateTime) {
      throw new Error('Chýbajú povinné údaje');
    }
    
    // Create booking
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        service_id: body.serviceId,
        team_member_id: body.teamMemberId,
        client_name: body.clientName,
        client_email: body.clientEmail,
        client_phone: body.clientPhone,
        date_time: body.dateTime,
        notes: body.notes,
        status: 'confirmed',
        duration: body.duration
      })
      .select()
      .single();
    
    if (bookingError || !bookingData) {
      throw new Error(bookingError?.message || 'Chyba pri vytváraní rezervácie');
    }

    // Get service details
    const { data: serviceData, error: serviceError } = await supabase
      .from('services')
      .select('name')
      .eq('id', body.serviceId)
      .single();

    if (serviceError || !serviceData) {
      throw new Error('Služba nebola nájdená');
    }

    // Format date and time for email
    const bookingDate = new Date(body.dateTime);
    const formattedDate = format(bookingDate, 'EEEE d. MMMM yyyy', { locale: sk });
    const formattedTime = format(bookingDate, 'HH:mm');

    console.log('Preparing to send confirmation email...');
    console.log('Email data:', {
      to: body.clientEmail,
      name: body.clientName,
      serviceName: serviceData.name,
      date: formattedDate,
      time: formattedTime,
      bookingId: bookingData.id
    });

    try {
      // Send confirmation email
      const emailResult = await sendBookingConfirmationEmail({
        to: body.clientEmail,
        name: body.clientName,
        serviceName: serviceData.name,
        date: formattedDate,
        time: formattedTime,
        bookingId: bookingData.id
      });
      
      console.log('Email sent successfully:', emailResult);
    } catch (emailError: any) {
      console.error('Error sending confirmation email:', emailError);
      // Don't throw here, we still want to return the booking data
      // but log the error for debugging
    }
    
    return NextResponse.json(bookingData);
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error.message || 'Chyba pri vytváraní rezervácie' },
      { status: 500 }
    );
  }
}
