import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { useDispatch } from 'react-redux'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const addToWishlistHandler = (e) => {
        e.preventDefault()
        dispatch(addToWishlist({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price
        }))
    }

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
            <div className="relative block overflow-hidden">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image' }}
                    />
                </Link>
                <button
                    onClick={addToWishlistHandler}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                >
                    <Heart className="h-5 w-5" />
                </button>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 pointer-events-none transition-all" />
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <Link to={`/product/${product._id}`}>
                        <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex items-center text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-xs font-bold text-gray-600">{product.rating}</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    <button className="bg-blue-50 text-blue-600 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
