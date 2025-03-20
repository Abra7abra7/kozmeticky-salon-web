'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { addDays, format, startOfDay, isAfter, isBefore, isToday, isWeekend } from 'date-fns'
import { sk } from 'date-fns/locale'

type TeamMember = {
  id: string;
  name: string;
  position: string;
  image_url: string;
}

type Props = {
  serviceId: string;
  teamMembers: TeamMember[];
  selectedTeamMemberId: string;
  selectedDate: string;
  selectedTime: string;
  onSelect: (data: { teamMemberId: string; date: string; time: string }) => void;
  onBack: () => void;
}

// Mock available time slots
const generateTimeSlots = (date: Date, teamMemberId: string) => {
  // Simulate unavailable times randomly
  const unavailableTimes = new Set([
    '10:00', '11:30', '14:00', '16:30'
  ])
  
  // If weekend, fewer time slots
  const isWeekendDay = isWeekend(date)
  
  // Time slots from 9:00 to 18:00
  const slots = []
  const startHour = isWeekendDay ? 10 : 9
  const endHour = isWeekendDay ? 15 : 18
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      // Skip times already passed today
      if (isToday(date)) {
        const now = new Date()
        const slotTime = new Date(date)
        slotTime.setHours(hour, minute)
        
        if (isBefore(slotTime, now)) {
          continue
        }
      }
      
      slots.push({
        time: timeString,
        available: !unavailableTimes.has(timeString)
      })
    }
  }
  
  return slots
}

export default function BookingStepDateTime({ 
  serviceId, 
  teamMembers, 
  selectedTeamMemberId, 
  selectedDate, 
  selectedTime,
  onSelect,
  onBack
}: Props) {
  const [activeTeamMemberId, setActiveTeamMemberId] = useState(selectedTeamMemberId || '')
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null)
  const [activeTime, setActiveTime] = useState(selectedTime || '')
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{ time: string; available: boolean }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Generate date range for next 14 days
  const today = startOfDay(new Date())
  const dateRange = Array.from({ length: 14 }, (_, i) => addDays(today, i))
  
  // Update available time slots when date or team member changes
  useEffect(() => {
    if (selectedDateObj && activeTeamMemberId) {
      setIsLoading(true)
      
      // In a real app, we would fetch available slots from the API
      // Here we'll use our mock function
      const formattedDate = format(selectedDateObj, 'yyyy-MM-dd')
      
      // Simulate API call
      setTimeout(() => {
        const slots = generateTimeSlots(selectedDateObj, activeTeamMemberId)
        setAvailableTimeSlots(slots)
        setIsLoading(false)
      }, 500)
    }
  }, [selectedDateObj, activeTeamMemberId])
  
  const handleContinue = () => {
    if (!activeTeamMemberId || !selectedDateObj || !activeTime) return
    
    const formattedDate = format(selectedDateObj, 'yyyy-MM-dd')
    
    onSelect({
      teamMemberId: activeTeamMemberId,
      date: formattedDate,
      time: activeTime
    })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Vyberte termín
      </h2>
      
      {/* Team member selection */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Vyberte špecialistu</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`p-4 rounded-lg border text-center transition-colors cursor-pointer ${
                activeTeamMemberId === member.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTeamMemberId(member.id)}
            >
              <div className="relative h-20 w-20 mx-auto rounded-full overflow-hidden mb-3">
                <Image
                  src={member.image_url}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h4 className="font-medium text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Date selection */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Vyberte dátum</h3>
        
        <div className="flex overflow-x-auto pb-4 -mx-2">
          {dateRange.map((date) => {
            const isSelected = selectedDateObj && startOfDay(selectedDateObj).getTime() === startOfDay(date).getTime()
            const dayName = format(date, 'EEE', { locale: sk })
            const dayNumber = format(date, 'd')
            const month = format(date, 'MMM', { locale: sk })
            
            return (
              <div
                key={date.toISOString()}
                className="px-2 w-24 flex-shrink-0"
              >
                <button
                  className={`w-full p-3 rounded-lg border text-center transition-colors ${
                    isSelected
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDateObj(date)}
                >
                  <div className="text-xs uppercase">{dayName}</div>
                  <div className="text-xl font-bold">{dayNumber}</div>
                  <div className="text-xs">{month}</div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Time selection */}
      {selectedDateObj && activeTeamMemberId ? (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Vyberte čas</h3>
          
          {isLoading ? (
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Načítavam dostupné termíny...</p>
            </div>
          ) : availableTimeSlots.length === 0 ? (
            <div className="text-center p-8 border rounded-lg bg-gray-50">
              <p className="text-gray-600">Žiadne dostupné termíny pre vybraný dátum.</p>
              <p className="mt-2 text-gray-500">Skúste prosím iný dátum alebo špecialistu.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot.time}
                  className={`p-2 rounded-lg text-center ${
                    !slot.available
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : activeTime === slot.time
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-200 hover:border-primary-300'
                  }`}
                  disabled={!slot.available}
                  onClick={() => setActiveTime(slot.time)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg bg-gray-50">
          <p className="text-gray-600">Najprv vyberte špecialistu a dátum.</p>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <button
          className="btn-outline px-6 py-2"
          onClick={onBack}
        >
          Späť
        </button>
        
        <button
          className="btn-primary px-6 py-2"
          disabled={!activeTeamMemberId || !selectedDateObj || !activeTime}
          onClick={handleContinue}
        >
          Pokračovať
        </button>
      </div>
    </motion.div>
  )
}
