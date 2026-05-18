import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Message } from '../components/UI'

const PlaceOrderPage = () => {
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

    const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10)
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    const placeOrderHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            const { data } = await axios.post('/api/orders', {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            }, config)
            navigate(`/order/${data._id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-50 pb-4">Shipping Details</h2>
                        <p className="text-gray-600">
                            <strong className="text-gray-900">Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-50 pb-4">Payment Method</h2>
                        <p className="text-gray-600">
                            <strong className="text-gray-900">Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-50 pb-4">Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                            <div className="space-y-4">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center group">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl mr-4" />
                                        <Link to={`/product/${item.product}`} className="flex-grow font-bold text-gray-800 hover:text-blue-600 transition-colors">
                                            {item.name}
                                        </Link>
                                        <span className="text-gray-900 font-medium">
                                            {item.qty} x ₹{item.price} = <span className="font-bold">₹{(item.qty * item.price).toFixed(2)}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600">
                                <span>Items</span>
                                <span>₹{itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>₹{shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>₹{taxPrice}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-black text-blue-600">₹{totalPrice}</span>
                            </div>
                        </div>
                        <button
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-100 active:scale-95"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage
