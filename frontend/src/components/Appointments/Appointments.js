import React from 'react';
import ReactCalendar from '../ReactCalendar/ReactCalendar.js';


function Appointments() {
  return (
    <div className='appointments-container'>
        <h4 className='staff-title'>Schedule Appointment with your Medical Professional</h4>
        <form action="" className='appointments-form'>
            <h5>Check the calendar for available hours</h5>
            <ReactCalendar />
        </form>
    </div>
  )
}

export default Appointments;