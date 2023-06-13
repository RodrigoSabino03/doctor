import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../services/api';



import '../styles/PatientsModal.css'
import { Button } from './Button';

type NewPatientsModalProps = {
    isOpen: boolean,
    onRequestClose: () => void,
    email: string,
    
}

export function EditPatientsModal({ isOpen, onRequestClose, email }: NewPatientsModalProps){
    const [newName, setNewName] = useState('');
    const [newDateOfBirth, setNewDateOfBirth] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState(0);
    const [newEmail, setNewEmail] = useState('');

    function successfullyPatient(){
        if(window.confirm("Paciente editado com sucesso")){
            return onRequestClose();
        }
        
        
    }


    function handleEditPatient(e: FormEvent){
        e.preventDefault();

        api.put(`/patient/${email}`, {
                newName: newName, 
                newDateOfBirth: newDateOfBirth, 
                newGender: newGender, 
                newAddress: newAddress, 
                newPhone: newPhone, 
                newEmail: newEmail, 
        })
        successfullyPatient();
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
            <h2 className="title-modal">Edite o Paciente</h2>
                <button
                    className="react-modal-close"
                    type="button"
                    onClick={onRequestClose}
                    
                >
                    X
                </button>

                
            </div>
            <form onSubmit={handleEditPatient} className="modal-patients">
                <label>Nome completo    
                    <input
                        type="text"
                        id="input-full"
                        className="input-modal"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                /></label>
                <div className="double-input">
                    <label>Data de nascimento
                    <input
                        type="text"
                        id="input-mini"
                        className="input-modal"
                        placeholder="ex: dd-mm-yyyy"
                        value={newDateOfBirth}
                        onChange={e => setNewDateOfBirth(e.target.value)}
                /></label>
                <label>Genero
                    <select
                        id="input-mini" 
                        className="input-modal"
                        value={newGender}
                        onChange={e => setNewGender(e.target.value)}
                        >
                        <option value="0" ></option>
                        <option value="masculino">masculino</option>
                        <option value="Feminino">Feminino</option>  
                        <option value="Outros">Outros</option>   
                    </select></label>
                </div>
                <label>Endereço 
                    <input
                        type="text"
                        id="input-full"
                        className="input-modal"
                        value={newAddress}
                        onChange={e => setNewAddress(e.target.value)}
                /></label>
                <label>Telefone
                    <input
                        type="text"
                        id="input-full"
                        className="input-modal"
                        value={newPhone}
                        onChange={e => setNewPhone(Number(e.target.value))}
                /></label>
                <label>Email
                    <input
                        type="text"
                        id="input-full"
                        className="input-modal"
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)}
                /></label>

                <Button type="submit">Editar</Button>
            </form>
        </Modal>
    )
}