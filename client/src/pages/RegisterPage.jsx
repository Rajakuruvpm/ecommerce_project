import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCredentials } from '../redux/slices/authSlice'
import { Message, Loader } from '../components/UI'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirect = new URLSearchParams(search).get('redirect') || '/'

    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [navigate, redirect, isAuthenticated])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setLoading(true)
        setError(null)
        try {
            const { data } = await axios.post('/api/users', { name, email, password })
            dispatch(setCredentials(data))
            navigate(redirect)
        } catch (err) {
            setError(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                    <p className="mt-2 text-gray-500">Join our premium shopping community</p>
                </div>

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-500">Already have an account? </span>
                    <Link to={`/login?redirect=${redirect}`} className="text-blue-600 font-bold hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
