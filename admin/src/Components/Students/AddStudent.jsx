
import { useState } from "react"
import { UserRegister } from "../../services/api"
import { User, Mail, Lock, Hash, Loader } from 'lucide-react'

const formInitialValues = {
    name: '',
    email: '',
    password: '',
    role: 'student',
    rollNumber: '',
}

const AddStudent = () => {
    const [data, setData] = useState(formInitialValues)
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        const newErrors = {}
        if (!data.name.trim()) newErrors.name = "Name is required"
        if (!data.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid"
        if (!data.password) newErrors.password = "Password is required"
        else if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters"
        if (!data.rollNumber.trim()) newErrors.rollNumber = "Roll Number is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const changeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            setIsLoading(true)
            try {
                const response = await UserRegister(data)
                if (response.status === 201) {
                    setSuccess('Student added successfully')
                    setData(formInitialValues)
                    setErrors({})
                }
            } catch (error) {
                setErrors({ submit: 'Failed to add student. Please try again.' })
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Student</h2>
            {success && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Success</p>
                    <p>{success}</p>
                </div>
            )}
            {errors.submit && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{errors.submit}</p>
                </div>
            )}
            <form onSubmit={submitHandler} noValidate>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={changeHandler}
                            className={`pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''
                                }`}
                            required
                        />
                    </div>
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={changeHandler}
                            className={`pl-10  py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''
                                }`}
                            required
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={changeHandler}
                            className={`pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : ''
                                }`}
                            required
                        />
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="rollNumber" className="block mb-2 text-sm font-medium text-gray-700">
                        Roll Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Hash className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="rollNumber"
                            id="rollNumber"
                            value={data.rollNumber}
                            onChange={changeHandler}
                            className={`pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.rollNumber ? 'border-red-500' : ''
                                }`}
                            required
                        />
                    </div>
                    {errors.rollNumber && <p className="mt-2 text-sm text-red-600">{errors.rollNumber}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Adding Student...
                        </>
                    ) : (
                        'Add Student'
                    )}
                </button>
            </form>
        </div>
    )
}

export default AddStudent