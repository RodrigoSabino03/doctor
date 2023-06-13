import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { api } from "../services/api";

export function LoginPatient(){
    const [emailPatient, setEmailPatient] = useState('')
    
    var history = useHistory();

    function handleAuthPatient(e: FormEvent){
        e.preventDefault();


        const email = emailPatient

        //checkar no banco de dados se existe esse email
        api.get(`/patient/${email}`)
        .then(response => {
            const patient = response.data
            
            if(patient.email === email) {
                history.push("/patient")
            }
        })
    }
    
    return(
        <div className="login-container">
            <Header />
            <h2>Faça login com o seus dados</h2>
            <form onSubmit={handleAuthPatient}>
                <label>Email
                    <input 
                        type="text"
                        value={emailPatient}
                        onChange={e => setEmailPatient(e.target.value)}
                        
                    /></label>
                    <div className="button-login">
                        <Button type="submit">Entrar</Button>
                    </div>
            </form>
        </div>
    
    
    )
    
}