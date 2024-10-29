import { useState, useEffect } from 'react'
import Header from "../Components/Sidebar/Header"
import { Users, FileText, Calendar, ChevronRight } from 'lucide-react'
import { getStudents } from '../services/api'

const Dashboard = () => {
    const [stats, setStats] = useState({ students: 0, courses: 0, exams: 0 });
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [studentCount, setStudentCount] = useState(0);
    
    
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true); 
            try {
                const response = await getStudents();
                const count = response.data.length;
                setStudentCount(count); 
                setStats({ students: count, courses: 25, exams: 50 }); 
            } catch (error) {
                console.error("Error while fetching students", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        setRecentActivities([
            { id: 1, type: 'exam', message: 'New exam scheduled: Mathematics 101', time: '2 hours ago' },
            { id: 2, type: 'course', message: 'Course updated: Introduction to Physics', time: '1 day ago' },
            { id: 3, type: 'student', message: 'New student registered: John Doe', time: '3 days ago' },
        ]);
    }, []);

    const StatCard = ({ title, value, icon: Icon }) => (
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-indigo-100 p-3 mr-4">
                <Icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <p className="text-2xl font-bold text-indigo-600">{value}</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-6 sm:p-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
                    
                    {loading ? (
                        <p>Loading...</p> 
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <StatCard title="Total Students" value={stats.students} icon={Users} />
                            <StatCard title="Active Courses" value={stats.courses} icon={FileText} />
                            <StatCard title="Upcoming Exams" value={stats.exams} icon={Calendar} />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
                            <ul className="divide-y divide-gray-200">
                                {recentActivities.map((activity) => (
                                    <li key={activity.id} className="py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {activity.type === 'exam' && <Calendar className="w-6 h-6 text-indigo-600" />}
                                                {activity.type === 'course' && <FileText className="w-6 h-6 text-green-600" />}
                                                {activity.type === 'student' && <Users className="w-6 h-6 text-blue-600" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                                                <p className="text-sm text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                            <div className="space-y-4">
                                <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between transition duration-150 ease-in-out">
                                    <span className="flex items-center">
                                        <Users className="w-5 h-5 mr-3 text-indigo-600" />
                                        <span className="text-gray-700">Manage Students</span>
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between transition duration-150 ease-in-out">
                                    <span className="flex items-center">
                                        <FileText className="w-5 h-5 mr-3 text-green-600" />
                                        <span className="text-gray-700">Create New Course</span>
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between transition duration-150 ease-in-out">
                                    <span className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                                        <span className="text-gray-700">Schedule Exam</span>
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;
