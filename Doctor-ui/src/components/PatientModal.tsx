import Modal from 'react-modal'

type NewPatientsModalProps = {
    isOpen: boolean,
    onRequestClose: () => void,
    title: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phone: number,
    email: string,
    
}

export function PatientModal({ isOpen, onRequestClose, title, name, dateOfBirth, gender, address, phone, email}:NewPatientsModalProps){

 

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
            <form className="modal-patients">
            <label>Nome completo    
                <input
                    type="text"
                    id="input-full"
                    className="input-modal"
                    value={name}
                    disabled
            /></label>
            <div className="double-input">
            <label>Data de nascimento
                <input
                    type="text"
                    id="input-mini"
                    className="input-modal"
                    value={ dateOfBirth}
                    disabled
            /></label>
            <label>Genero
                <select
                    id="input-mini" 
                    className="input-modal"
                    value={gender}
                    disabled
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
                    value={address}
                    disabled
            /></label>
            <label>Telefone
                <input
                    type="text"
                    id="input-full"
                    className="input-modal"
                    value={phone}
                    disabled
            /></label>
            <label>Email
                <input
                    type="text"
                    id="input-full"
                    className="input-modal"
                    value={email}
                    disabled
            /></label>
            </form>
        </Modal>
    )
}