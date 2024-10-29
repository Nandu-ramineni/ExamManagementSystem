import { useState, useEffect } from 'react'
import Header from './Header'
import { Calendar, Users, FileText, Bell, ChartBar, Clock, CheckCircle } from 'lucide-react'

const Dashboard = () => {
    const [classes, setClasses] = useState([])
    const [upcomingAssignments, setUpcomingAssignments] = useState([])
    const [recentActivities, setRecentActivities] = useState([])
    const [studentPerformance, setStudentPerformance] = useState({})
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        setClasses([
            { id: 1, name: 'Mathematics 101', time: '09:00 AM - 10:30 AM', students: 30 },
            { id: 2, name: 'Physics 202', time: '11:00 AM - 12:30 PM', students: 25 },
            { id: 3, name: 'Computer Science 301', time: '02:00 PM - 03:30 PM', students: 20 },
        ])

        setUpcomingAssignments([
            { id: 1, title: 'Math Quiz', class: 'Mathematics 101', dueDate: '2024-03-20' },
            { id: 2, title: 'Physics Lab Report', class: 'Physics 202', dueDate: '2024-03-22' },
            { id: 3, title: 'Programming Project', class: 'Computer Science 301', dueDate: '2024-03-25' },
        ])

        setRecentActivities([
            { id: 1, action: 'Graded assignments', class: 'Mathematics 101', time: '2 hours ago' },
            { id: 2, action: 'Posted new study material', class: 'Physics 202', time: '1 day ago' },
            { id: 3, action: 'Scheduled office hours', class: 'Computer Science 301', time: '3 days ago' },
        ])

        setStudentPerformance({
            averageGrade: 85,
            topPerformer: 'Jane Doe',
            needsImprovement: 3,
            attendanceRate: 92,
        })

        setNotifications([
            { id: 1, message: 'New message from student in Mathematics 101', type: 'message' },
            { id: 2, message: 'Reminder: Department meeting tomorrow', type: 'event' },
            { id: 3, message: '5 new assignment submissions in Physics 202', type: 'assignment' },
        ])
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Today's Classes */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Calendar className="mr-2 text-blue-500" />
                            Today{"'"}s Classes
                        </h2>
                        <ul className="space-y-4">
                            {classes.map(cls => (
                                <li key={cls.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{cls.name}</p>
                                        <p className="text-sm text-gray-600">{cls.time}</p>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="mr-1 h-4 w-4" />
                                        {cls.students}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Upcoming Assignments */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <FileText className="mr-2 text-green-500" />
                            Upcoming Assignments
                        </h2>
                        <ul className="space-y-4">
                            {upcomingAssignments.map(assignment => (
                                <li key={assignment.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{assignment.title}</p>
                                        <p className="text-sm text-gray-600">{assignment.class}</p>
                                    </div>
                                    <div className="text-sm text-gray-600 flex items-center">
                                        <Clock className="mr-1 h-4 w-4" />
                                        {assignment.dueDate}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Student Performance Overview */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <ChartBar className="mr-2 text-purple-500" />
                            Student Performance
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600">Average Grade</p>
                                <p className="text-2xl font-bold">{studentPerformance.averageGrade}%</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Top Performer</p>
                                <p className="text-lg font-medium">{studentPerformance.topPerformer}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Students Needing Improvement</p>
                                <p className="text-lg font-medium">{studentPerformance.needsImprovement}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Attendance Rate</p>
                                <p className="text-lg font-medium">{studentPerformance.attendanceRate}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Clock className="mr-2 text-yellow-500" />
                            Recent Activities
                        </h2>
                        <ul className="space-y-4">
                            {recentActivities.map(activity => (
                                <li key={activity.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{activity.action}</p>
                                        <p className="text-sm text-gray-600">{activity.class}</p>
                                    </div>
                                    <div className="text-sm text-gray-600">{activity.time}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Bell className="mr-2 text-red-500" />
                            Notifications
                        </h2>
                        <ul className="space-y-4">
                            {notifications.map(notification => (
                                <li key={notification.id} className="flex items-start">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                                    <p>{notification.message}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard