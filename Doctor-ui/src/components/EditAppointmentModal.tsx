import Modal from 'react-modal';
import { Button } from './Button';

import '../styles/appointmentModal.css'
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';

type NewAppointmentModalProps = {
    isOpen: boolean,
    onRequestClose: () => void,
    date: string,
    schedule: string,
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

export function EditAppointmentModal({ isOpen, onRequestClose, date, schedule}:NewAppointmentModalProps){
    const [patients, setPatients] = useState<Patient[]>([]);
    const [newPatient, setNewPatient] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newSchedule, setNewSchedule] = useState('');
    const [newSpecialty, setNewSpecialty] = useState('');

    function confirmEditAppointment(){
        if(window.confirm("Consulta Editada com sucesso")){
            onRequestClose();
        }
    }

    useEffect(() => {
        api.get("/patients")
        .then(response => {
            const patients = response.data
    
            setPatients(patients)
            
        })
    }, [patients])

    function handleEditAppointment(e: FormEvent){
        e.preventDefault();
        confirmEditAppointment()

        api.put(`/appointment/${date}/${schedule}`, {
                newDate: newDate, 
                newSchedule: newSchedule, 
                newSpecialty: newSpecialty,  
                newPatient: newPatient,  
        })        
    }



    return(
        <Modal
            closeTimeoutMS={2000}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
        <div className="header-modal">
            <h2 className="title-modal">Edite a consulta</h2>
            <button
                    className="react-modal-close"
                    type="button"
                    onClick={onRequestClose}
                    
                >
                    X
            </button>
        </div>
        <form onSubmit={handleEditAppointment} className="modal-appointment">
            <label>Especialidade
                    <select
                        name="specialty" 
                        id="input-full"
                        value={newSpecialty}
                        onChange={e => setNewSpecialty(e.target.value)}>
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
                            value={newDate}
                            onChange={e => setNewDate(e.target.value)}
                    /></label>

                    <label>horario
                        <input 
                            type="text" 
                            name="name" 
                            id="input-mini" 
                            value={newSchedule}
                            onChange={e => setNewSchedule(e.target.value)}
                    /></label>
                </div>
                <label>Paciente
                    <select
                        name="patient" 
                        id="input-full"
                        value={newPatient}
                        onChange={e => setNewPatient(e.target.value)}
                        >
                            <option value="0">Selecione o Paciente</option>
                        {
                            patients.map(patient => (
                                <option key={patient.id} value={patient.name}>{patient.name}</option>
                            ))
                        }

                    </select></label>
            <div className="btn-submit">
                <Button type="submit">Editar</Button>
            </div>
            
        </form>

        </Modal>
    )
}