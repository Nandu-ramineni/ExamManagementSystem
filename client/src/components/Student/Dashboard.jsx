
import { useState, useEffect } from 'react'
import Header from "./Header"
import { Book, Calendar, GraduationCap, Clock, Bell, ChartBar, CheckCircle } from 'lucide-react'

const Dashboard = () => {
    const [assignments, setAssignments] = useState([])
    const [grades, setGrades] = useState([])
    const [courses, setCourses] = useState([])
    const [events, setEvents] = useState([])
    const [performance, setPerformance] = useState({})
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        // Simulating API calls to fetch data
        setAssignments([
            { id: 1, title: 'Math Homework', dueDate: '2024-03-15', course: 'Mathematics' },
            { id: 2, title: 'Physics Lab Report', dueDate: '2024-03-18', course: 'Physics' },
            { id: 3, title: 'Literature Essay', dueDate: '2024-03-20', course: 'English Literature' },
        ])

        setGrades([
            { id: 1, course: 'Chemistry', grade: 'A', date: '2024-03-10' },
            { id: 2, course: 'History', grade: 'B+', date: '2024-03-08' },
            { id: 3, course: 'Computer Science', grade: 'A-', date: '2024-03-05' },
        ])

        setCourses([
            { id: 1, name: 'Mathematics', progress: 70 },
            { id: 2, name: 'Physics', progress: 65 },
            { id: 3, name: 'English Literature', progress: 80 },
            { id: 4, name: 'Chemistry', progress: 75 },
        ])

        setEvents([
            { id: 1, title: 'Math Quiz', date: '2024-03-17', time: '10:00 AM' },
            { id: 2, title: 'Study Group', date: '2024-03-19', time: '3:00 PM' },
            { id: 3, title: 'Career Fair', date: '2024-03-22', time: '1:00 PM' },
        ])

        setPerformance({
            gpa: 3.7,
            ranking: 15,
            totalStudents: 150,
            attendanceRate: 95,
        })

        setNotifications([
            { id: 1, message: 'New grade posted for Physics', type: 'grade' },
            { id: 2, message: 'Reminder: Math homework due tomorrow', type: 'assignment' },
            { id: 3, message: 'You\'ve been invited to join a study group', type: 'social' },
        ])
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 grid gap-6">
                        {/* Upcoming Assignments */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <Calendar className="mr-2 text-blue-500" />
                                Upcoming Assignments
                            </h3>
                            <ul className="space-y-4">
                                {assignments.map(assignment => (
                                    <li key={assignment.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{assignment.title}</p>
                                            <p className="text-sm text-gray-600">{assignment.course}</p>
                                        </div>
                                        <div className="text-sm text-gray-600 flex items-center">
                                            <Clock className="mr-1 h-4 w-4" />
                                            {assignment.dueDate}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Calendar View */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <Calendar className="mr-2 text-green-500" />
                                Upcoming Events
                            </h3>
                            <ul className="space-y-4">
                                {events.map(event => (
                                    <li key={event.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{event.title}</p>
                                            <p className="text-sm text-gray-600">{event.date}</p>
                                        </div>
                                        <div className="text-sm text-gray-600">{event.time}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Performance Summary */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <ChartBar className="mr-2 text-purple-500" />
                                Performance Summary
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Current GPA</p>
                                    <p className="text-2xl font-bold">{performance.gpa}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Class Ranking</p>
                                    <p className="text-2xl font-bold">{performance.ranking} / {performance.totalStudents}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Attendance Rate</p>
                                    <p className="text-2xl font-bold">{performance.attendanceRate}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Recent Grades */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <GraduationCap className="mr-2 text-green-500" />
                                Recent Grades
                            </h3>
                            <ul className="space-y-4">
                                {grades.map(grade => (
                                    <li key={grade.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{grade.course}</p>
                                            <p className="text-sm text-gray-600">{grade.date}</p>
                                        </div>
                                        <div className="text-lg font-bold text-green-600">{grade.grade}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Enrolled Courses */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <Book className="mr-2 text-purple-500" />
                                Enrolled Courses
                            </h3>
                            <ul className="space-y-4">
                                {courses.map(course => (
                                    <li key={course.id}>
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-medium">{course.name}</p>
                                            <p className="text-sm text-gray-600">{course.progress}%</p>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <Bell className="mr-2 text-yellow-500" />
                                Notifications
                            </h3>
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
                </div>
            </main>
        </div>
    )
}

export default Dashboard