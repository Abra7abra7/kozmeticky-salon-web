'use client'

import { loadStripe } from '@stripe/stripe-js'
import { stripeConfig } from './config'

let stripePromise: Promise<any> | null = null

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripeConfig.publicKey)
  }
  return stripePromise
}
