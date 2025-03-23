'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CancelBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCancelBooking = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId: params.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chyba pri rušení rezervácie');
      }

      setSuccess(true);
      toast.success('Rezervácia bola úspešne zrušená');
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);

    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-lg mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              Zrušenie rezervácie
            </h1>

            {success ? (
              <div className="text-green-600 mb-4">
                <p>Vaša rezervácia bola úspešne zrušená.</p>
                <p className="text-sm mt-2">
                  Budete presmerovaní na hlavnú stránku...
                </p>
              </div>
            ) : (
              <>
                <p className="mb-6">
                  Ste si istí, že chcete zrušiť túto rezerváciu? 
                  Tento krok nie je možné vrátiť späť.
                </p>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleCancelBooking}
                    disabled={isLoading}
                    className="btn-primary flex-1"
                  >
                    {isLoading ? 'Ruší sa...' : 'Áno, zrušiť rezerváciu'}
                  </button>
                  <button
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="btn-outline flex-1"
                  >
                    Späť
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
