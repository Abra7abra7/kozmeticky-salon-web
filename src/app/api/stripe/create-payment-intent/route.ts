import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = 'eur', description, metadata } = body
    
    if (!amount) {
      return NextResponse.json(
        { error: 'Chýba suma platby' },
        { status: 400 }
      )
    }
    
    // Vytvorenie payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe vyžaduje centy
      currency,
      description,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Chyba pri vytváraní platby' },
      { status: 500 }
    )
  }
}
