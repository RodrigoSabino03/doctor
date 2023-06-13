import { ReactNode, useState } from 'react';
import { api } from '../services/api';

import deleteImg from '../assets/delete.png'
import editImg from '../assets/edit.png'
import { EditAppointmentModal } from './EditAppointmentModal';

type AppointmentItemProps = {
    specialty: string,
    date: string,
    schedule: string,
    status: ReactNode
}


export function AppointmentItem(props: AppointmentItemProps){
    const [isEditAppointmentModal, setIsEditAppointmentModal] = useState(false);
    function handleConfirmDelete(){
        if(!window.confirm('Tem certeza que quer deletar a consulta?')){
            return 
        }

        api.delete(`/appointment/${props.date}/${props.schedule}`)
        
    }

    function handleCheckedStatus(){
        if(!window.confirm('Tem certeza que quer concluir a consulta?')){
            return 
        }
        api.put(`/appointment/${props.date}/${props.schedule}`, {newStatus: "Executado"})
  
    }



    function handleOpenEditAppointmentModal(){
        setIsEditAppointmentModal(true)
    }
    function handleCloseEditAppointmentModal(){
        setIsEditAppointmentModal(false)
    }

    
    return(
        <div className="item-container">
            <p>{props.specialty}</p>
            <p>{props.date}</p>
            <p>{props.schedule}</p>
            <button className="btn-status"onClick={handleCheckedStatus}>
                <p>{props.status}</p>
            </button>

            <div className="btns-appointment">
            <button onClick={handleOpenEditAppointmentModal}>
                <img  src={editImg} alt="editar" />
            </button>

            <button onClick={handleConfirmDelete}>
                <img  src={deleteImg} alt="lixeira" />
            </button>

            </div>



            <EditAppointmentModal isOpen={isEditAppointmentModal} onRequestClose={handleCloseEditAppointmentModal} date={props.date} schedule={props.schedule} />

        </div>
    )
}