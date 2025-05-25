import { reactive, computed } from 'vue'

const state = reactive({
    currentUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
    users: JSON.parse(localStorage.getItem('registeredUsers')) || []
})

const login = (email, password) => {
    const user = state.users.find(u => u.email === email && u.password === password)
    if (user) {
        state.currentUser = user
        localStorage.setItem('loggedInUser', JSON.stringify(user))
        return true
    }
    return false
}

const register = (name, email, password, role = 'user') => {
    const exists = state.users.some(u => u.email === email)
    if (exists) return false

    const newUser = { name, email, password, role }
    state.users.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(state.users))
    return login(email, password)
}

const logout = () => {
    state.currentUser = null
    localStorage.removeItem('loggedInUser')
}

export default {
    state,
    login,
    register,
    logout,
    isAdmin: computed(() => state.currentUser?.role === 'admin'),
    isLoggedIn: computed(() => !!state.currentUser)
}