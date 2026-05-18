import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, LogOut, Search, Heart } from 'lucide-react'
import { logout } from '../redux/slices/authSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const { cartItems } = useSelector((state) => state.cart)

    const [keyword, setKeyword] = React.useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/?search=${keyword}`)
        } else {
            navigate('/')
        }
    }

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center shrink-0">
                        <Link to="/" className="text-3xl font-black text-blue-600 tracking-tighter">
                            E-SHOP
                        </Link>
                    </div>

                    <div className="flex-1 max-w-2xl px-12 hidden md:block">
                        <form onSubmit={submitHandler} className="relative group">
                            <input
                                type="text"
                                placeholder="Search for premium products..."
                                className="w-full bg-gray-100 border-2 border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:bg-white focus:border-blue-600 transition-all outline-none text-sm font-medium shadow-inner"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                        </form>
                    </div>

                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-6">
                            <Link to="/wishlist" className="relative group text-gray-400 hover:text-red-500 transition-all duration-300">
                                <Heart className="h-6 w-6" />
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                            </Link>

                            <Link to="/cart" className="relative group text-gray-400 hover:text-blue-600 transition-all duration-300">
                                <ShoppingCart className="h-6 w-6" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </span>
                                )}
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                            </Link>
                        </div>

                        <div className="h-6 w-px bg-gray-100 hidden sm:block"></div>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all group">
                                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                        {user?.name?.charAt(0)}
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{user?.name}</span>
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                >
                                    <LogOut className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Link 
                                    to="/login" 
                                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 hover:-translate-y-0.5"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
