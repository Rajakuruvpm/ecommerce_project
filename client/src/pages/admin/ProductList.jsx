import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productSlice'
import { Loader, Message } from '../../components/UI'
import { Plus, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'

const ProductList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { items: products, loading, error } = useSelector((state) => state.products)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(fetchProducts())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, user])

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
                await axios.delete(`/api/products/${id}`, config)
                dispatch(fetchProducts())
            } catch (err) {
                alert(err.response?.data?.message || err.message)
            }
        }
    }

    const createProductHandler = () => {
        navigate('/admin/product/create')
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900">Products Catalogue</h1>
                <button
                    onClick={createProductHandler}
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Product
                </button>
            </div>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-8 py-6">Product</th>
                                <th className="px-8 py-6">ID</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Price</th>
                                <th className="px-8 py-6">Stock</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center">
                                            <img src={product.image} className="w-12 h-12 rounded-xl object-cover mr-4" />
                                            <span className="font-bold text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-gray-500 font-mono text-[10px]">{product._id}</td>
                                    <td className="px-8 py-6 text-gray-600 font-medium">{product.category}</td>
                                    <td className="px-8 py-6 font-bold text-gray-900">₹{product.price}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.countInStock} Left
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <Link to={`/admin/product/${product._id}/edit`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors inline-block">
                                            <Edit className="h-5 w-5" />
                                        </Link>
                                        <button onClick={() => deleteHandler(product._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="h-5 w-5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ProductList
