import { useEffect, useState } from "react";
import { AppointmentItem } from "../components/AppointmentItem";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { NewAppointmentModal } from "../components/NewAppointmentModal";
import { NewPatientsModal } from "../components/NewPatientsModal";
import { PatientItem } from "../components/PatientItem";
import { api } from "../services/api";

import '../styles/doctor.css'

type Patient = {
    id: number,
    name: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phone: number,
    email: string,
}

type Appointment = {
    id: number,
    date: string,
    schedule: string,
    specialty: string,
    status: string,
}



export function Doctor(){
    const [patients, setPatients] = useState<Patient[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([])

    const [isNewPatientsModal, setIsNewPatientsModal] = useState(false);
    const [isNewAppointmentModal, setIsNewAppointmentModal] = useState(false);
 

    function handleOpenNewPatientsModal(){
        setIsNewPatientsModal(true)
    }
    function handleCloseNewPatientsModal(){
        setIsNewPatientsModal(false)
    }
    function handleOpenNewAppointmentModal(){
        setIsNewAppointmentModal(true)
    }
    function handleCloseNewAppointmentModal(){
        setIsNewAppointmentModal(false)
    }

    

    useEffect(() => {
        api.get("/patients")
        .then(response => {
            const patients = response.data
    
            setPatients(patients)
            
        })
    }, [patients])

    useEffect(() => {
        api.get("/appointments")
        .then(response => {
            const appointments = response.data
    
            setAppointments(appointments)
            
        })
    }, [appointments])

    return(
        <div className="container-doctor">
            <Header />
            <div className="content-doctor">
                <div className="patients-section">
                    <div className="patients-header">
                        <h4>Pacientes</h4>
                        <Button onClick={handleOpenNewPatientsModal}>Novo</Button>
                    </div>
                    <div className="items-patients">
                        {patients.map(patient => (
                            <PatientItem key={patient.id} name={patient.name} dateOfBirth={patient.dateOfBirth } email={patient.email} />
                            ))}
                    </div>
                </div>
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
            <NewPatientsModal title="Cadastre o seu paciente" isOpen={isNewPatientsModal} onRequestClose={handleCloseNewPatientsModal} />
            <NewAppointmentModal title="Agende a sua consulta" isOpen={isNewAppointmentModal} onRequestClose={handleCloseNewAppointmentModal} />
        </div>

        
            


    )
}