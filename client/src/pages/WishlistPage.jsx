import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../redux/slices/wishlistSlice'
import UserLayout from '../components/UserLayout'
import { Heart, Trash2, ArrowRight } from 'lucide-react'

const WishlistPage = () => {
    const dispatch = useDispatch()
    const { wishlistItems } = useSelector((state) => state.wishlist)

    return (
        <UserLayout>
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center">
                    <Heart className="h-6 w-6 mr-3 text-red-500 fill-current" /> My Wishlist
                </h1>

            {wishlistItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-xl mb-6">Your wishlist is empty.</p>
                    <Link to="/" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                        Discover Products <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistItems.map((item) => (
                        <div key={item.product} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                            <Link to={`/product/${item.product}`}>
                                <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                            </Link>
                            <div className="p-6">
                                <Link to={`/product/${item.product}`} className="font-bold text-gray-900 block truncate mb-2">
                                    {item.name}
                                </Link>
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-blue-600">₹{item.price}</span>
                                    <button
                                        onClick={() => dispatch(removeFromWishlist(item.product))}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </UserLayout>
    )
}

export default WishlistPage
