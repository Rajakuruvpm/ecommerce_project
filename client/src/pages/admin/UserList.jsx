import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader, Message } from '../../components/UI'
import { Check, X, Trash2, Shield } from 'lucide-react'
import axios from 'axios'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const { user: loggedInUser } = useSelector((state) => state.auth)

    useEffect(() => {
        if (loggedInUser && loggedInUser.isAdmin) {
            fetchUsers()
        } else {
            navigate('/login')
        }
    }, [loggedInUser, navigate])

    const fetchUsers = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
            const { data } = await axios.get('/api/users', config)
            setUsers(data)
        } catch (err) {
            setError(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
                await axios.delete(`/api/users/${id}`, config)
                fetchUsers()
            } catch (err) {
                alert(err.response?.data?.message || err.message)
            }
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Manage Users</h1>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-8 py-6">ID</th>
                                <th className="px-8 py-6">Name</th>
                                <th className="px-8 py-6">Email</th>
                                <th className="px-8 py-6">Admin</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-6 text-gray-500 font-mono text-[10px]">{user._id}</td>
                                    <td className="px-8 py-6 font-bold text-gray-900">{user.name}</td>
                                    <td className="px-8 py-6 text-gray-600">{user.email}</td>
                                    <td className="px-8 py-6">
                                        {user.isAdmin ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            disabled={user.isAdmin}
                                            onClick={() => deleteHandler(user._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-20"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default UserList
