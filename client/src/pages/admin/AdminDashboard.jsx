import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import axios from 'axios'

const AdminDashboard = () => {
    const [stats, setStats] = useState({ products: 0, users: 0, orders: 0, sales: 0 })

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        Promise.all([
            axios.get('/api/products'),
            axios.get('/api/users', config),
            axios.get('/api/orders', config),
        ]).then(([{ data: products }, { data: users }, { data: orders }]) => {
            const sales = orders.reduce((sum, o) => sum + (o.isPaid ? o.totalPrice : 0), 0)
            setStats({ products: products.length, users: users.length, orders: orders.length, sales })
        }).catch(() => {})
    }, [])

    const cards = [
        { name: 'Total Sales', value: `₹${stats.sales.toFixed(2)}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Active Users', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Products', value: stats.products, icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    ]

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {cards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                        <div className={`${stat.bg} p-4 rounded-2xl mr-4`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Link to="/admin/products" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col items-center text-center">
                    <div className="bg-gray-50 p-6 rounded-full group-hover:bg-blue-50 transition-colors mb-6">
                        <Package className="h-12 w-12 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Products</h2>
                    <p className="text-gray-500">Add, edit, or remove products from the store catalogue.</p>
                </Link>

                <Link to="/admin/orders" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col items-center text-center">
                    <div className="bg-gray-50 p-6 rounded-full group-hover:bg-purple-50 transition-colors mb-6">
                        <ShoppingCart className="h-12 w-12 text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Orders</h2>
                    <p className="text-gray-500">Track shipments, update order status, and view customer details.</p>
                </Link>
            </div>
        </div>
    )
}

export default AdminDashboard
