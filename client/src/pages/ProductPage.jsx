import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails } from '../redux/slices/productSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { Loader, Message } from '../components/UI'
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from 'lucide-react'

const ProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const { product, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty
        }))
        navigate('/cart')
    }

    if (loading) return <Loader />
    if (error) return <Message variant="danger">{error}</Message>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Results
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">{product.category}</span>
                        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h1>
                        <div className="flex items-center mt-4">
                            <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                            <span className={`ml-6 px-3 py-1 rounded-full text-xs font-bold ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 flex-1">{product.description}</p>

                    <div className="space-y-6">
                        {product.countInStock > 0 && (
                            <div className="flex items-center space-x-6">
                                <span className="font-semibold text-gray-700">Quantity</span>
                                <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-gray-50">
                                    <button
                                        disabled={qty <= 1}
                                        onClick={() => setQty(qty - 1)}
                                        className="p-3 hover:bg-white rounded-xl transition-all disabled:opacity-30"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-gray-800">{qty}</span>
                                    <button
                                        disabled={qty >= product.countInStock}
                                        onClick={() => setQty(qty + 1)}
                                        className="p-3 hover:bg-white rounded-xl transition-all disabled:opacity-30"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className="w-full bg-blue-600 text-white flex items-center justify-center py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <ShoppingBag className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                            Add to Shopping Bag
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <h2 className="text-3xl font-black text-gray-900 mb-10">Customer Reviews</h2>
                {product.reviews && product.reviews.length === 0 && (
                    <div className="bg-gray-50 p-8 rounded-3xl text-center text-gray-500 font-medium border-2 border-dashed border-gray-200">
                        No reviews yet. Be the first to review this product!
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {product.reviews && product.reviews.map((review) => (
                        <div key={review._id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <p className="text-xs text-gray-400 font-medium">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage
