import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser, updateUser } from '../services/api.js'


function Users() {
    // Guardar lista de usuarios
    const [users, setUsers] = useState([])
    // Guardar qué usuario se está editando
    const [editingId, setEditingId] = useState(null)
    // Guardar los datos mientras se editan
    const [editData, setEditData] = useState({ name: '', email: '' })

    // Traer usuarios cuando carga el componente
    useEffect(() => {
        getUsers().then(data => setUsers(data))
    }, [])

    // Función para eliminar un usuario
    const handleDelete = (id) => {
        // Pregunta de confirmación
        if (confirm('¿Eliminar?')) {
            // Elimina de la API
            deleteUser(id)
            // Elimina de la lista (filter deja todos excepto el eliminado)
            setUsers(users.filter(user => user.id !== id))
        }
    }

    // Función para editar un usuario
    const handleEdit = (user) => {
        // Marcar este usuario como el que se está editando
        setEditingId(user.id)
        // Cargar sus datos actuales en el formulario
        setEditData({ name: user.name, email: user.email })
    }

    // Función para guardar los cambios
    const handleSave = (id) => {
        // Actualizar en la API
        updateUser(id, editData)
        // Actualizar en la lista
        setUsers(users.map(u => 
            u.id === id ? { ...u, ...editData } : u
        ))
        // Dejar de editar
        setEditingId(null)
    }

    // Función para cancelar la edición
    const handleCancel = () => {
        setEditingId(null)
    }

    // Si no hay usuarios, mostrar mensaje
    if (users.length === 0) {
        return <h1>Sin usuarios</h1>
    }

    // Mostrar lista de usuarios
    return (
        <div>
            {/* Título */}
            <h1>Usuarios</h1>
            
            {/* Lista desordenada */}
            <ul>
                {/* Recorrer cada usuario y crear un <li> */}
                {users.map(user => (
                    <li key={user.id}>
                        {/* Si se está editando, mostrar inputs */}
                        {editingId === user.id ? (
                            <div>
                                {/* Input para nombre */}
                                <input 
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                />
                                
                                {/* Input para email */}
                                <input 
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                />
                                
                                {/* Botón para guardar */}
                                <button onClick={() => handleSave(user.id)}>
                                    Guardar
                                </button>
                                
                                {/* Botón para cancelar */}
                                <button onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <div>
                                {/* Si NO se está editando, mostrar datos */}
                                {/* Mostrar nombre y email */}
                                {user.name} - {user.email}
                                
                                {/* Botón para editar */}
                                <button onClick={() => handleEdit(user)}>
                                    Editar
                                </button>
                                
                                {/* Botón para eliminar */}
                                <button onClick={() => handleDelete(user.id)}>
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users