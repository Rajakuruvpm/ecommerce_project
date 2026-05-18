import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader, Message } from '../../components/UI'
import { Eye, ExternalLink } from 'lucide-react'
import axios from 'axios'

const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const { user: loggedInUser } = useSelector((state) => state.auth)

    useEffect(() => {
        if (loggedInUser && loggedInUser.isAdmin) {
            fetchOrders()
        } else {
            navigate('/login')
        }
    }, [loggedInUser, navigate])

    const fetchOrders = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
            const { data } = await axios.get('/api/orders', config)
            setOrders(data)
        } catch (err) {
            setError(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Manage Orders</h1>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-8 py-6">ID</th>
                                <th className="px-8 py-6">User</th>
                                <th className="px-8 py-6">Date</th>
                                <th className="px-8 py-6">Total</th>
                                <th className="px-8 py-6">Paid</th>
                                <th className="px-8 py-6">Delivered</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-6 text-gray-500 font-mono text-[10px]">{order._id}</td>
                                    <td className="px-8 py-6 font-bold text-gray-900">{order.user && order.user.name}</td>
                                    <td className="px-8 py-6 text-gray-500">{order.createdAt.substring(0, 10)}</td>
                                    <td className="px-8 py-6 font-black text-gray-900">₹{order.totalPrice}</td>
                                    <td className="px-8 py-6">
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-[10px]">Paid</span>
                                        ) : (
                                            <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-[10px]">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        {order.isDelivered ? (
                                            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-[10px]">Delivered</span>
                                        ) : (
                                            <span className="text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full text-[10px]">Processing</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Link to={`/order/${order._id}`} className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                            <Eye className="h-5 w-5" />
                                        </Link>
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

export default OrderList
