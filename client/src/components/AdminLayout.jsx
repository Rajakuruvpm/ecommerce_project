import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LayoutDashboard, Package, Users, Star, LogOut, Menu, X, Store } from 'lucide-react'
import { logout } from '../redux/slices/authSlice'

const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/products', icon: Package, label: 'Product' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/reviews', icon: Star, label: 'Review' },
]

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    React.useEffect(() => {
        if (!isAuthenticated || !user?.isAdmin) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated, user])

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white flex flex-col transition-all duration-300 shrink-0`}>
                {/* Logo */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
                    {!collapsed && (
                        <div className="flex items-center space-x-2">
                            <Store className="h-6 w-6 text-blue-400" />
                            <span className="text-lg font-black tracking-tight">E-SHOP</span>
                            <span className="text-[10px] font-bold bg-blue-600 px-2 py-0.5 rounded-full uppercase">Admin</span>
                        </div>
                    )}
                    <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-auto">
                        {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 space-y-1 px-3">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center px-3 py-3 rounded-xl font-medium transition-all group ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`
                            }
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            {!collapsed && <span className="ml-3 text-sm">{label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* User + Logout */}
                <div className="border-t border-gray-700 px-3 py-4">
                    {!collapsed && (
                        <div className="px-3 py-2 mb-2">
                            <p className="text-xs text-gray-500 font-medium">Logged in as</p>
                            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                        </div>
                    )}
                    <button
                        onClick={logoutHandler}
                        className="flex items-center w-full px-3 py-3 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all font-medium"
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="ml-3 text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                            <Store className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Management Portal</p>
                            <h2 className="text-sm font-bold text-gray-900 leading-none">Welcome back, {user?.name}</h2>
                        </div>
                    </div>
                    <NavLink to="/" className="bg-gray-50 text-gray-600 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight hover:bg-blue-600 hover:text-white transition-all border border-gray-100 shadow-sm">
                        ← Back to Store
                    </NavLink>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
