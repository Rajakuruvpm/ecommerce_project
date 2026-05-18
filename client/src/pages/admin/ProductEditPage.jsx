import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Loader, Message } from '../../components/UI'
import { ArrowLeft, Save } from 'lucide-react'

const ProductEditPage = () => {
    const { id } = useParams()
    const { pathname } = useLocation()
    const isCreate = id === 'create' || pathname.endsWith('/create')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [fetching, setFetching] = useState(!isCreate)

    const navigate = useNavigate()

    useEffect(() => {
        if (isCreate) return
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`)
                setName(data.name)
                setPrice(data.price)
                setImage(data.image)
                setCategory(data.category)
                setCountInStock(data.countInStock)
                setDescription(data.description)
            } catch (err) {
                setError(err.response?.data?.message || err.message)
            } finally {
                setFetching(false)
            }
        }
        fetchProduct()
    }, [id, isCreate])

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            if (isCreate) {
                await axios.post('/api/products', { name, price, image, category, countInStock, description }, config)
            } else {
                await axios.put(`/api/products/${id}`, { name, price, image, category, countInStock, description }, config)
            }
            navigate('/admin/products')
        } catch (err) {
            setError(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Link to="/admin/products" className="flex items-center text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Products
            </Link>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">{isCreate ? 'Add Product' : 'Edit Product'}</h1>

                {fetching ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Count In Stock</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-4 focus:bg-white focus:border-blue-500 transition-all outline-none resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center disabled:opacity-50"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            {loading ? 'Saving...' : isCreate ? 'Create Product' : 'Update Product'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProductEditPage
