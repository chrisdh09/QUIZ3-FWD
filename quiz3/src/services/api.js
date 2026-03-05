const BASE_URL = "http://localhost:3001"

export async function getUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`)
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error);
        
    }
}

export async function postUsers(userData) {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

// Eliminar un usuario por ID
export async function deleteUser(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

// Actualizar un usuario por ID
export async function updateUser(id, userData) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

