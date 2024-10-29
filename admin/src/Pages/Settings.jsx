import { useState } from 'react'
import { Save, Bell, Lock, User, Mail } from 'lucide-react'

export default function Settings() {
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        notifications: {
            email: true,
            sms: false,
            push: true
        },
        theme: 'light'
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        setFormData(prevState => ({
            ...prevState,
            notifications: {
                ...prevState.notifications,
                [name]: checked
            }
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the updated settings to your backend
        console.log('Settings updated:', formData)
        alert('Settings updated successfully!')
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className="block mb-1">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-1">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Email Settings
                    </h2>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notification Preferences
                    </h2>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="email"
                                    checked={formData.notifications.email}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Receive email notifications
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="sms"
                                    checked={formData.notifications.sms}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Receive SMS notifications
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="push"
                                    checked={formData.notifications.push}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Receive push notifications
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Lock className="w-5 h-5 mr-2" />
                        Security
                    </h2>
                    <button type="button" className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90">
                        Change Password
                    </button>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 flex items-center">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}