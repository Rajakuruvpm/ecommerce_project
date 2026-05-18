import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')
const parsedUser = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null

const initialState = {
    user: parsedUser,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, ...user } = action.payload
            state.user = user
            state.token = token
            state.isAuthenticated = true
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
    },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
