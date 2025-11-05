// src/components/ui/AppointmentDetails/AppointmentDetails.tsx
import React from 'react'
import { BookingDate, TimeSlot } from '@/hooks/useCalendar'
import { Icon } from '@/components/ui/icon'
import './AppointmentDetails.scss'

interface AppointmentDetailsProps {
  selectedDateObj: BookingDate | undefined
  selectedTimeObj: TimeSlot | null
  isConfirmed: boolean
  onBookingConfirm: () => void
  onNewBooking: () => void
  formatDateFull: (date: Date) => string
}

export const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  selectedDateObj,
  selectedTimeObj,
  isConfirmed,
  onBookingConfirm,
  onNewBooking,
  formatDateFull,
}) => {
  if (!isConfirmed) {
    return (
      <div className="appointment-details">
        <h3 className="appointment-details__title">Appointment Details</h3>
        
        {selectedTimeObj ? (
          <div className="appointment-details__content">
            <div className="appointment-details__item">
              <span className="appointment-details__label">Date:</span>
              <span className="appointment-details__value">
                {selectedDateObj && formatDateFull(selectedDateObj.date)}
              </span>
            </div>
            <div className="appointment-details__item">
              <span className="appointment-details__label">Time:</span>
              <span className="appointment-details__value">{selectedTimeObj.time}</span>
            </div>
            <div className="appointment-details__item">
              <span className="appointment-details__label">Consultation Type:</span>
              <span className="appointment-details__value">30-minute consultation</span>
            </div>
            <div className="appointment-details__item">
              <span className="appointment-details__label">Format:</span>
              <span className="appointment-details__value">Zoom / Google Meet</span>
            </div>
            
            <button 
              className="appointment-details__confirm-button"
              onClick={onBookingConfirm}
            >
              Confirm
            </button>
            
            
          </div>
        ) : (
          <div className="appointment-details__placeholder">
            <div className="appointment-details__placeholder-icon">
              <Icon name="calendar" size={62} alt="Calendar icon" />
            </div>
            <p className="appointment-details__placeholder-text">
              Select a date and time to see appointment details
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="appointment-details appointment-details--confirmed">
      <div className="appointment-details__success-icon">✅</div>
      <h3 className="appointment-details__success-title">Booking Confirmed!</h3>
      
      <div className="appointment-details__success-details">
        <div className="appointment-details__success-item">
          <span className="appointment-details__success-label">Date & Time:</span>
          <span className="appointment-details__success-value">
            {selectedDateObj && formatDateFull(selectedDateObj.date)} at {selectedTimeObj?.time}
          </span>
        </div>
        <div className="appointment-details__success-item">
          <span className="appointment-details__success-label">With:</span>
          <span className="appointment-details__success-value">Colabsys Studio Project Manager</span>
        </div>
        <div className="appointment-details__success-item">
          <span className="appointment-details__success-label">Meeting Type:</span>
          <span className="appointment-details__success-value">Consultation</span>
        </div>
      </div>
      
      <div className="appointment-details__instructions">
        <h4>What's Next?</h4>
        <ul>
          <li>You'll receive a reminder email 1 hour before the meeting</li>
          <li>Join link will be sent 15 minutes before the start</li>
          <li>Duration: 30 minutes</li>
          <li>Please prepare your project questions</li>
        </ul>
      </div>
      
      <button 
        className="appointment-details__new-booking-button"
        onClick={onNewBooking}
      >
        Create New Booking
      </button>
    </div>
  )
}