import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { User, ShoppingBag, Heart, LogOut, ShieldCheck } from 'lucide-react'
import { logout } from '../redux/slices/authSlice'

const UserLayout = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                        {/* Avatar */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-8 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                                <User className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-white font-bold text-lg leading-tight">{user?.name}</p>
                            <p className="text-blue-200 text-xs mt-1 truncate">{user?.email}</p>
                        </div>

                
                        <nav className="p-3 space-y-1">
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
                                }
                            >
                                <ShoppingBag className="h-4 w-4 mr-3" /> My Orders
                            </NavLink>
                            <NavLink
                                to="/wishlist"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
                                }
                            >
                                <Heart className="h-4 w-4 mr-3" /> Wishlist
                            </NavLink>
                            {user?.isAdmin && (
                                <NavLink
                                    to="/admin/dashboard"
                                    className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                    <ShieldCheck className="h-4 w-4 mr-3" /> Admin Panel
                                </NavLink>
                            )}
                        </nav>

                        <div className="px-3 pb-3">
                            <button
                                onClick={logoutHandler}
                                className="flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                            >
                                <LogOut className="h-4 w-4 mr-3" /> Logout
                            </button>
                        </div>
                    </div>
                </aside>


                <main className="lg:col-span-3">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default UserLayout
