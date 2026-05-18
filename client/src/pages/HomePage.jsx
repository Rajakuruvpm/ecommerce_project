import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import ProductCard from '../components/ProductCard'
import { Loader, Message } from '../components/UI'

const HomePage = () => {
    const dispatch = useDispatch()
    const { search } = useLocation()
    const keyword = new URLSearchParams(search).get('search') || ''

    const { items: products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
                    Discover Premium <span className="text-blue-600">Essentials</span>
                </h1>
                <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                    High-performance gear crafted for your daily adventures. Quality you can feel, style you can see.
                </p>
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage
