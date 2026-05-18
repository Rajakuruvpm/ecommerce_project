import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCredentials } from '../redux/slices/authSlice'
import { Message, Loader } from '../components/UI'
import { User, ShieldCheck } from 'lucide-react'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const [role, setRole] = useState(location.pathname.includes('admin') ? 'admin' : 'user')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirect = new URLSearchParams(search).get('redirect') || '/'

    const { isAuthenticated, user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.isAdmin && role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate(redirect)
            }
        }
    }, [navigate, redirect, isAuthenticated, user, role])

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const { data } = await axios.post('/api/users/login', { email, password })
            
            if (role === 'admin' && !data.isAdmin) {
                setError('Not authorized as an admin')
                setLoading(false)
                return
            }

            dispatch(setCredentials(data))
            
            if (data.isAdmin && role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate(redirect)
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Login</h2>
                    <p className="mt-3 text-gray-500 font-medium">Please select your portal to continue</p>
                </div>

                {/* Role Selection */}
                <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
                    <button
                        onClick={() => setRole('user')}
                        className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-bold transition-all ${
                            role === 'user' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <User className="h-4 w-4 mr-2" />
                        User
                    </button>
                    <button
                        onClick={() => setRole('admin')}
                        className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-bold transition-all ${
                            role === 'admin' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Admin
                    </button>
                </div>

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 px-5 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 px-5 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95 mt-4 ${
                            role === 'admin' 
                            ? 'bg-gray-900 text-white hover:bg-black shadow-gray-200' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                        }`}
                    >
                        {role === 'admin' ? 'Access Admin Portal' : 'Sign In'}
                    </button>
                </form>

                {role === 'user' && (
                    <div className="mt-10 text-center">
                        <span className="text-gray-500 font-medium">New here? </span>
                        <Link to={`/register?redirect=${redirect}`} className="text-blue-600 font-black hover:underline">
                            Join Now
                        </Link>
                    </div>
                )}
                
                {role === 'admin' && (
                    <p className="mt-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Restricted Access Area
                    </p>
                )}
            </div>
        </div>
    )
}

export default LoginPage
