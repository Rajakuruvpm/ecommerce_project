import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../redux/slices/cartSlice'
import { Truck } from 'lucide-react'

const ShippingPage = () => {
    const { shippingAddress } = useSelector((state) => state.cart)
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (
        <div className="max-w-md mx-auto px-4 py-20">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex flex-col items-center mb-10">
                    <div className="bg-blue-50 p-4 rounded-2xl mb-4">
                        <Truck className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Shipping</h1>
                    <p className="text-gray-500 mt-1">Where should we send your gear?</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="123 Luxury Ln"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="Modern City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="12345"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                            placeholder="Premium Land"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                    >
                        Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ShippingPage
