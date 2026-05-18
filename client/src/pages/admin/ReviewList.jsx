import React from 'react'
import { Star, MessageSquare, Trash2 } from 'lucide-react'
import axios from 'axios'

const ReviewList = () => {
    const [reviews, setReviews] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const fetchReviews = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
            const { data } = await axios.get('/api/products/reviews/all', config)
            setReviews(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchReviews()
    }, [])

    const deleteHandler = async (productId, reviewId) => {
        if (window.confirm('Delete this review?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
                await axios.delete(`/api/products/reviews/${productId}/${reviewId}`, config)
                fetchReviews()
            } catch (err) {
                alert(err.response?.data?.message || err.message)
            }
        }
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-900">Product Reviews</h1>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Rating</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Comment</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-gray-500 font-medium italic">No reviews found</td>
                            </tr>
                        ) : reviews.map((review) => (
                            <tr key={review._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900">{review.product}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-600">{review.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-yellow-400">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500 max-w-xs truncate">{review.comment}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => deleteHandler(review.productId, review._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ReviewList
