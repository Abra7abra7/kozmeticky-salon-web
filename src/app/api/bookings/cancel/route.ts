import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Chýba ID rezervácie' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    
    // Get the booking to check if it can be cancelled
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Rezervácia nebola nájdená' },
        { status: 404 }
      );
    }

    // Check if the booking is within 24 hours
    const bookingDate = new Date(booking.date_time);
    const now = new Date();
    const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      return NextResponse.json(
        { error: 'Rezerváciu nie je možné zrušiť menej ako 24 hodín pred termínom' },
        { status: 400 }
      );
    }

    // Cancel the booking
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Chyba pri rušení rezervácie' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Rezervácia bola úspešne zrušená' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Interná chyba servera' },
      { status: 500 }
    );
  }
}
