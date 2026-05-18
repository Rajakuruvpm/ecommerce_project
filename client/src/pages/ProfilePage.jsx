import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Loader, Message } from '../components/UI'
import UserLayout from '../components/UserLayout'
import { ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react'

const ProfilePage = () => {
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(true)
    const [errorOrders, setErrorOrders] = useState(null)

    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        } else {
            const fetchMyOrders = async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }
                    const { data } = await axios.get('/api/orders/myorders', config)
                    setOrders(data)
                } catch (err) {
                    setErrorOrders(err.response?.data?.message || err.message)
                } finally {
                    setLoadingOrders(false)
                }
            }
            fetchMyOrders()
        }
    }, [navigate, isAuthenticated])

    return (
        <UserLayout>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                            <ShoppingBag className="h-6 w-6 mr-3 text-blue-600" /> My Orders
                        </h2>

                        {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : orders.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                                <Link to="/" className="text-blue-600 font-bold hover:underline flex items-center justify-center">
                                    Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-xs uppercase text-gray-400 font-bold border-b border-gray-50">
                                        <tr>
                                            <th className="py-4 px-4">Order ID</th>
                                            <th className="py-4 px-4">Date</th>
                                            <th className="py-4 px-4">Total</th>
                                            <th className="py-4 px-4">Paid</th>
                                            <th className="py-4 px-4">Delivered</th>
                                            <th className="py-4 px-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-6 px-4 font-mono text-[10px] text-gray-500">{order._id}</td>
                                                <td className="py-6 px-4 text-sm text-gray-600">{order.createdAt.substring(0, 10)}</td>
                                                <td className="py-6 px-4 font-bold text-gray-900">₹{order.totalPrice}</td>
                                                <td className="py-6 px-4">
                                                    {order.isPaid ? (
                                                        <span className="text-green-600 font-bold text-[10px] bg-green-50 px-2 py-1 rounded-full">Paid</span>
                                                    ) : (
                                                        <span className="text-red-500 font-bold text-[10px] bg-red-50 px-2 py-1 rounded-full">Pending</span>
                                                    )}
                                                </td>
                                                <td className="py-6 px-4">
                                                    {order.isDelivered ? (
                                                        <span className="text-green-600 font-bold text-[10px] bg-green-50 px-2 py-1 rounded-full">Delivered</span>
                                                    ) : (
                                                        <span className="text-orange-500 font-bold text-[10px] bg-orange-50 px-2 py-1 rounded-full">Processing</span>
                                                    )}
                                                </td>
                                                <td className="py-6 px-4 text-right">
                                                    <Link to={`/order/${order._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg inline-block transition-colors">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
            </div>
        </UserLayout>
    )
}

export default ProfilePage
