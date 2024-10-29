import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExam } from "../../services/api";
import { Calendar, Clock, MapPin, BookOpen, CheckCircle } from 'lucide-react';

const Exam = () => {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        center: "",
        duration: "",
        status: "upcoming",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createExam(formData);
            if(response.status === 201) {
                alert("Exam created successfully!");
                navigate("/teacherDashboard/exams"); 
            }
        } catch (error) {
            alert("Failed to create exam. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center m-auto h-screen">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <BookOpen className="mr-2 text-primary" />
                Create New Exam
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter exam name"
                            />
                            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date and Time</label>
                        <div className="relative">
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Exam Center</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="center"
                                value={formData.center}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter exam center"
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter duration"
                            />
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-black border border-gray-300 p-3 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center justify-center"
                    >
                        <CheckCircle className="mr-2" size={20} />
                        Create Exam
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Exam;