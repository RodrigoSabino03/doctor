import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { api } from "../services/api";

import '../styles/loginDoctor.css'

export function LoginDoctor(){
    const [crmDoctor, setCrmDoctor] = useState('');

    var history = useHistory();

    function handleAuthDoctor(e: FormEvent){
        e.preventDefault();

        const crm = crmDoctor 



        api.get(`/doctor/${crm}`)
        .then(response => {
            const doctor = response.data
            
            if(doctor.crm === crm) {
                history.push("/doctor")
            }
        })

    }

    return(
        <div className="login-container">
            <Header />
            <h2>Faça login com o seus dados</h2>

            <form onSubmit={handleAuthDoctor}>
                <label>CRM
                    <input
                        type="text"
                        value={crmDoctor}
                        onChange={e => setCrmDoctor(e.target.value)}
                    /></label>
                    <div className="button-login">
                        <Button type="submit">Entrar</Button>
                    </div>
            </form>
        </div>


    )
}