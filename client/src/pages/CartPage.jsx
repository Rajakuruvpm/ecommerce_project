import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Message } from '../components/UI'

const CartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart)

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-10 flex items-center">
                <ShoppingBag className="h-8 w-8 mr-4 text-blue-600" />
                Shopping Bag
            </h1>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-xl mb-6">Your bag is currently empty.</p>
                    <Link to="/" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                        Go Shopping <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.product} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center group transition-all hover:shadow-md">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl mr-6" />
                                <div className="flex-grow">
                                    <Link to={`/product/${item.product}`} className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </Link>
                                    <p className="text-gray-500 text-sm mt-1 font-medium">₹{item.price}</p>
                                </div>

                                <div className="flex items-center space-x-6 mr-10">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                                        className="bg-gray-100 border-none rounded-xl py-2 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCartHandler(item.product)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                    <span className="font-bold text-gray-900">
                                        ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-black text-blue-600">
                                        ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <button
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-gray-200 flex items-center justify-center group"
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
