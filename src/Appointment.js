import React, {useState} from 'react';

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');
    return `${h}:${m}`;
}

export const Appointment = ({customer: {firstName}}) => (
    <div>{firstName}</div>
);

export const AppointmentsDayView = ({appointments}) => {
    const [selectedAppointment, setSelectedAppointment] = useState(0);
    console.log({...appointments[selectedAppointment]})
    return (
        <div id="appointmentsDayView">
            <ol>
                {appointments.map((appointment, i) => (
                    <li key={appointment.startsAt}>
                        <button type="button" onClick={() => setSelectedAppointment(i)}>
                            {appointmentTimeOfDay(appointment)}
                        </button>
                    </li>))}
            </ol>
            <Appointment {...appointments[selectedAppointment]} />
        </div>
    );
};
