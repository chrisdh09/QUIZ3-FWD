import React, { useState } from 'react'
import { postUsers } from "../services/api.js";

function Form() {
    // Estado que guarda los datos del formulario
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    })

    // Actualiza el estado cuando escribes en un input
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Envía los datos a la API y limpia el formulario
    const handleSubmit = async (e) => {
        e.preventDefault() // Evita recargar la página
        await postUsers(userData) // Envía datos a la BD
        setUserData({ name: '', email: '' }) // Limpia campos
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Input para el nombre */}
            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={userData.name}
                onChange={handleChange}
                required
            />
            {/* Input para el email */}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                required
            />
            {/* Botón para enviar */}
            <button type="submit">Enviar</button>
        </form>
    )
}

export default Form