import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/slices/cartSlice'
import { CreditCard } from 'lucide-react'

const PaymentPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector((state) => state.cart)

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const [paymentMethod] = useState(savedPaymentMethod || 'Razorpay')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div className="max-w-md mx-auto px-4 py-20">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex flex-col items-center mb-10">
                    <div className="bg-blue-50 p-4 rounded-2xl mb-4">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Payment</h1>
                    <p className="text-gray-500 mt-1">Select your preferred method</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        <div
                            className="flex items-center justify-between p-5 rounded-2xl border-2 border-blue-600 bg-blue-50/50 transition-all cursor-default"
                        >
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full border-2 border-blue-600 bg-blue-600 mr-4 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                </div>
                                <span className="font-bold text-gray-900">Razorpay (UPI, Card, NetBanking)</span>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-5" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                    >
                        Review Order
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PaymentPage
