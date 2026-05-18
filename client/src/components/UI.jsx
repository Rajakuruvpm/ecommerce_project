import React from 'react'

export const Loader = () => (
    <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
)

export const Message = ({ variant = 'info', children }) => {
    const styles = {
        info: 'bg-blue-50 text-blue-700 border-blue-100',
        danger: 'bg-red-50 text-red-700 border-red-100',
        success: 'bg-green-50 text-green-700 border-green-100',
    }

    return (
        <div className={`p-4 rounded-lg border ${styles[variant]} text-sm font-medium my-4`}>
            {children}
        </div>
    )
}
