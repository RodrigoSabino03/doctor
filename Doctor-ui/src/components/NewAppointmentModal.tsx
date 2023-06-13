import Modal from 'react-modal';
import { Button } from './Button';

import '../styles/appointmentModal.css'
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';

type NewAppointmentModalProps = {
    isOpen: boolean,
    onRequestClose: () => void,
    title: string,
}
type Patient = {
    id: number,
    name: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phone: number,
    email: string,
}

export function NewAppointmentModal({ isOpen, onRequestClose, title}:NewAppointmentModalProps){
    const [patients, setPatients] = useState<Patient[]>([]);
    const [patient, setPatient] = useState('');
    const [date, setDate] = useState('');
    const [schedule, setSchedule] = useState('');
    const [specialty, setSpecialty] = useState('');

    function successfullyCreatedAppointment(){
        if(window.confirm("Consulta marcada com sucesso")){
            onRequestClose();
        }
    }

    function handleCreateNewAppointment(e: FormEvent) {
        e.preventDefault();

        const appointment = {
            date, 
            schedule, 
            specialty,
            patient
        }

        api.post("/appointment", appointment)
        successfullyCreatedAppointment();
    }

    useEffect(() => {
        api.get("/patients")
        .then(response => {
            const patients = response.data
    
            setPatients(patients)
            
        })
    }, [patients])


    return(
        <Modal
            closeTimeoutMS={2000}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
        <div className="header-modal">
            <h2 className="title-modal">{title}</h2>
            <button
                    className="react-modal-close"
                    type="button"
                    onClick={onRequestClose}
                    
                >
                    X
            </button>
        </div>
        <form onSubmit={handleCreateNewAppointment} className="modal-appointment">
            <label>Especialidade
                    <select
                        name="specialty" 
                        id="input-full"
                        value={specialty}
                        onChange={e => setSpecialty(e.target.value)}>
                        <option value="0" >Selecione a Especialidade</option>
                        <option value="Clínico Geral">Clínico Geral</option>
                        <option value="Cardiologia">Cardiologia</option>  
                        <option value="Neurologista">Neurologista</option>   
                    </select></label>
                <div className="double-input">
                    <label>Data da consulta
                        <input
                            type="text" 
                            name="dateOfBirth" 
                            id="input-mini"
                            placeholder="ex: dd-mm-yyyy"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                    /></label>

                    <label>horario
                        <input 
                            type="text" 
                            name="name" 
                            id="input-mini" 
                            value={schedule}
                            onChange={e => setSchedule(e.target.value)}
                    /></label>
                </div>
                <label>Paciente
                    <select
                        name="patient" 
                        id="input-full"
                        value={patient}
                        onChange={e => setPatient(e.target.value)}
                        >
                            <option value="0">Selecione o Paciente</option>
                        {
                            patients.map(patient => (
                                <option key={patient.id} value={patient.name}>{patient.name}</option>
                            ))
                        }

                    </select></label>
            <div className="btn-submit">
                <Button type="submit">Agendar</Button>
            </div>
            
        </form>

        </Modal>
    )
}