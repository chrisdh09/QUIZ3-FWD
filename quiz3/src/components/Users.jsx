import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser, updateUser } from '../services/api.js'


function Users() {
    // Estado para guardar los usuarios
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({ name: '', email: '' })

    // Traer usuarios al cargar el componente
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const data = await getUsers()
            setUsers(data)
        } catch (error) {
            console.error('Error al traer usuarios:', error)
        } finally {
            setLoading(false)
        }
    }

    // Función para eliminar usuario
    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await deleteUser(id)
                setUsers(users.filter(user => user.id !== id))
            } catch (error) {
                console.error('Error al eliminar usuario:', error)
            }
        }
    }

    // Función para editar usuario
    const handleEdit = (user) => {
        setEditingId(user.id)
        setEditData({ name: user.name, email: user.email })
    }

    // Función para guardar cambios
    const handleSave = async (id) => {
        try {
            await updateUser(id, editData)
            setUsers(users.map(user => 
                user.id === id ? { ...user, ...editData } : user
            ))
            setEditingId(null)
        } catch (error) {
            console.error('Error al actualizar usuario:', error)
        }
    }

    // Función para cancelar edición
    const handleCancel = () => {
        setEditingId(null)
        setEditData({ name: '', email: '' })
    }

    return (
        <div>
            <h1>Usuarios Registrados</h1>
            
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : users.length === 0 ? (
                <p>No hay usuarios registrados.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    {editingId === user.id ? (
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td>
                                    {editingId === user.id ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editingId === user.id ? (
                                        <>
                                            <button onClick={() => handleSave(user.id)}>Guardar</button>
                                            <button onClick={handleCancel}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(user)}>Editar</button>
                                            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Users