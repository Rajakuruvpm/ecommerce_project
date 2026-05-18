import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Loader, Message } from '../components/UI'
import { CreditCard, Package, Truck, Calendar, CheckCircle, XCircle, Star } from 'lucide-react'

const OrderPage = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [paying, setPaying] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
                const { data } = await axios.get(`/api/orders/${id}`, config)
                setOrder(data)
            } catch (err) {
                setError(err.response?.data?.message || err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    const payHandler = async () => {
        setPaying(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
     
            await axios.put(`/api/orders/${id}/pay`, {
                id: 'PAYMENT_ID_MOCK',
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                email_address: order.user.email
            }, config)

           
            const { data } = await axios.get(`/api/orders/${id}`, config)
            setOrder(data)
        } catch (err) {
            alert(err.response?.data?.message || err.message)
        } finally {
            setPaying(false)
        }
    }

    const [showReviewModal, setShowReviewModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [submittingReview, setSubmittingReview] = useState(false)

    const submitReviewHandler = async (e) => {
        e.preventDefault()
        setSubmittingReview(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            await axios.post(`/api/products/${selectedProduct}/reviews`, { rating, comment }, config)
            alert('Review submitted successfully!')
            setShowReviewModal(false)
            setComment('')
            setRating(5)
        } catch (err) {
            alert(err.response?.data?.message || err.message)
        } finally {
            setSubmittingReview(false)
        }
    }

    if (loading) return <Loader />
    if (error) return <Message variant="danger">{error}</Message>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-10 overflow-hidden text-ellipsis">Order #{order._id}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900">
                            <Truck className="h-5 w-5 mr-3 text-blue-600" /> Shipping Info
                        </h2>
                        <div className="text-gray-600 space-y-2">
                            <p><strong className="text-gray-900">Name:</strong> {order.user.name}</p>
                            <p><strong className="text-gray-900">Email:</strong> {order.user.email}</p>
                            <p>
                                <strong className="text-gray-900">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                        </div>
                        <div className={`mt-6 p-4 rounded-2xl flex items-center ${order.isDelivered ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                            {order.isDelivered ? (
                                <><Calendar className="h-5 w-5 mr-2" /> Delivered on {order.deliveredAt}</>
                            ) : (
                                <><Package className="h-5 w-5 mr-2" /> Processing Shipment</>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900">
                            <CreditCard className="h-5 w-5 mr-3 text-blue-600" /> Payment Info
                        </h2>
                        <p className="text-gray-600">
                            <strong className="text-gray-900">Method:</strong> {order.paymentMethod}
                        </p>
                        <div className={`mt-6 p-4 rounded-2xl flex items-center ${order.isPaid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {order.isPaid ? (
                                <><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Paid on {new Date(order.paidAt).toLocaleString()}</>
                            ) : (
                                <><XCircle className="h-5 w-5 mr-2 text-red-500" /> Payment Pending</>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900">
                            Order Items
                        </h2>
                        <div className="space-y-4">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl mr-4" />
                                        <div>
                                            <Link to={`/product/${item.product}`} className="font-bold text-gray-800 hover:text-blue-600">
                                                {item.name}
                                            </Link>
                                            <div className="text-gray-900 font-bold">
                                                {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    {order.isPaid && (
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(item.product)
                                                setShowReviewModal(true)
                                            }}
                                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center"
                                        >
                                            <Star className="h-4 w-4 mr-2" />
                                            Write Review
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600"><span>Items</span><span>₹{order.itemsPrice || (order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹{order.shippingPrice}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Tax</span><span>₹{order.taxPrice}</span></div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-black text-blue-600">₹{order.totalPrice}</span>
                            </div>
                        </div>

                        {!order.isPaid && (
                            <button
                                onClick={payHandler}
                                disabled={paying}
                                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl hover:shadow-green-100 flex items-center justify-center disabled:opacity-50"
                            >
                                <CreditCard className="h-5 w-5 mr-2" />
                                {paying ? 'Processing...' : `Pay ₹${order.totalPrice}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

          
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">Rate this product</h2>
                        <form onSubmit={submitReviewHandler} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4 text-center">Your Rating</label>
                                <div className="flex justify-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`p-1 transition-all transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                        >
                                            <Star className={`h-8 w-8 ${star <= rating ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Comment</label>
                                <textarea
                                    required
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none resize-none"
                                    rows="4"
                                    placeholder="Tell us what you think..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowReviewModal(false)}
                                    className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingReview}
                                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 disabled:opacity-50"
                                >
                                    {submittingReview ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderPage
