import { useHistory } from "react-router-dom";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

import '../styles/home.css'

export function Home(){

    var history = useHistory();

    function handleBtnDoctor(){
        history.push("/loginDoctor")
    }

    function handleBtnPatient(){
        history.push("/loginPatient")
    }

    return(
        <div className="home-container">
            <Header />
            <h2>Bem vindo ao seu Hospital Virtual</h2>
            <h4>faça seu login</h4>
            <div className="btn-category">
                <Button onClick={handleBtnDoctor}>Medico</Button>
                <span>ou</span>
                <Button onClick={handleBtnPatient}>Paciente</Button>
            </div>
        </div>
    )
}