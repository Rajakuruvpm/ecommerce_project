import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-blue-400 transition-all hover:scale-105 inline-block cursor-default">E-SHOP</h3>
                        <p className="text-gray-400 text-sm">
                            Premium quality products delivered to your doorstep. Experience the best online shopping with us.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Featured</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Newsletter</h4>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-all">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} E-Shop Inc. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
