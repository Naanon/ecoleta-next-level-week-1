import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './styles.css'

const RegistrationCompleted = () => {
    return (
        <div id="registration-completed">
            <Link to="/">
                <div className="checked">
                    <span className="icon">
                        <FiCheckCircle />
                    </span>
                    <span className="text">
                        Cadastro concluído!
                </span>
                </div>
            </Link>
        </div>
    )
}

export default RegistrationCompleted