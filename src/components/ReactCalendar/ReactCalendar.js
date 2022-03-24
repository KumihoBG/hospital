import React, { useState } from 'react';
import Calendar from 'react-calendar';

function ReactCalendar() {
    const today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
    const [date, setDate] = useState(tomorrow);
    const [checkDate, setCheckDate] = useState(false);
    const [appointment, setAppointment] = useState('');
        
    const onChange = date => {
        setDate(date);
        setCheckDate(date <= today);
        checkDateForAppointment();
        setAppointment(date.toLocaleDateString('en-US'));
    }

    function checkDateForAppointment() {
        console.log(checkDate);
        if(!checkDate) {
            setAppointment(date.toLocaleDateString('en-US'));
            console.log(appointment);
        }    
    }

    console.log(appointment);

    return (
        <>
            <div className='calendar-container'>
                <Calendar
                    value={date}
                    onChange={onChange}
                 />
            </div>
            <div className="date-info">
                <h5>Scheduling Information</h5>
                <p className='date-text'>Current date: {new Date().toLocaleDateString('en-US')}</p>
                {checkDate
                ? <div>
                    <p className='date-text'>Your desired date cannot be set in the past. Please, choose another date.</p>
                    <p className='date-text'>What do you think about <span className='selected'>{tomorrow.toLocaleDateString('en-US')}</span>?</p>
                    </div>
                : <div>
                    {!appointment
                    ? <div><p className='date-text'>Select appointment date from the calendar above: <span className='selected'>{appointment}</span></p></div>
                    : <div><p className='date-text'>Current appointment date: <span className='selected'>{date.toLocaleDateString('en-Us')}</span></p>
                    </div>
                    }
                </div>
                }
            </div>
        </>

    )
}

export default ReactCalendar;