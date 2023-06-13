import { useEffect, useState } from "react";
import { AppointmentItem } from "../components/AppointmentItem";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { NewAppointmentModal } from "../components/NewAppointmentModal";
import { api } from "../services/api";

import '../styles/patient.css'

type Appointment = {
    id: number,
    date: string,
    schedule: string,
    specialty: string,
    status: string,
}

export function Patient(){
    const [isNewAppointmentModal, setIsNewAppointmentModal] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[]>([])


    function handleOpenNewAppointmentModal(){
        setIsNewAppointmentModal(true)
    }
    function handleCloseNewAppointmentModal(){
        setIsNewAppointmentModal(false)
    }


    useEffect(() => {
        api.get("/appointments")
        .then(response => {
            const appointments = response.data
    
            setAppointments(appointments)
            
        })
    }, [])

    return(
        <div className="container-patient">
            <Header />
            <div className="content-patient">
                <div className="appointments-section">
                    <div className="appointments-header">
                        <h4>Consultas</h4>
                        <Button onClick={handleOpenNewAppointmentModal}>Novo</Button>
                    </div>
                    <div className="items-appointments">
                        {appointments.map(appointment => (
                                    <AppointmentItem
                                        key={appointment.id}
                                        date={appointment.date} 
                                        schedule={appointment.schedule} 
                                        specialty={appointment.specialty} 
                                        status={appointment.status} 
                                
                                    />
                                ))}

                    </div>
                </div>
            </div>
            <NewAppointmentModal title="Agende a sua consulta" isOpen={isNewAppointmentModal} onRequestClose={handleCloseNewAppointmentModal} />

        </div>
            


    )
}