import '../styles/patientItem.css'

import deleteImg from '../assets/delete.png'
import editImg from '../assets/edit.png'
import dataImg from '../assets/data.png'

import { useState } from 'react';
import { api } from '../services/api';
import { PatientModal } from './PatientModal'
import { EditPatientsModal } from './EditPatientModal'

type PatientItemProps = {
    name: string,
    dateOfBirth: string,
    email: string,
}


export function PatientItem(props: PatientItemProps){
    const [isEditPatientsModal, setIsEditPatientsModal] = useState(false);
    const [isPatientModal, setIsPatientModal] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(0);

    function handleOpenPatientsModal(){
        setIsPatientModal(true)
        api.get(`/patient/${props.email}`)
        .then(response => {
            const patient = response.data
            
            setName(patient.name)
            setDateOfBirth(patient.dateOfBirth)
            setGender(patient.gender)
            setAddress(patient.address)
            setPhone(patient.phone)
            setEmail(patient.email)


        })
    }
    function handleClosePatientsModal(){
        setIsPatientModal(false)
    }
    function handleOpenEditPatientsModal(){
        setIsEditPatientsModal(true)
        api.get(`/patient/${props.email}`)
        .then(response => {
            const patient = response.data
            setEmail(patient.email)
        })
    }
    function handleCloseEditPatientsModal(){
        setIsEditPatientsModal(false)
    }

    function handleConfirmDelete(){
        if(!window.confirm('Are you sure you want to delete')){
            return
        }

        api.delete(`/patient/${props.email}`)
    }

    return(
        <div className="item-container">
            <p id="name">{props.name}</p>
            <p >{props.dateOfBirth}</p>

            <div className="buttons">
                <button onClick={handleOpenPatientsModal}>
                    <img  src={dataImg} alt="paciente" />
                </button>
                <button onClick={handleOpenEditPatientsModal}>
                    <img  src={editImg} alt="editar" />
                </button>
                <button onClick={handleConfirmDelete}>
                    <img  src={deleteImg} alt="lixeira" />
                </button>
            </div>

            <EditPatientsModal 
                isOpen={isEditPatientsModal} 
                onRequestClose={handleCloseEditPatientsModal} 
                email={email}
            />
            
            <PatientModal
                 name={name} 
                 dateOfBirth={dateOfBirth}
                     
                 gender={gender} address={address} 
                 phone={phone} email={email} 
                 title="Dados do paciente" 
                 isOpen={isPatientModal} 
                 onRequestClose={handleClosePatientsModal} 
            />

        </div>
    )
}