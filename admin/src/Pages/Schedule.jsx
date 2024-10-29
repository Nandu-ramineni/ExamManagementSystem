

import  { useState, useMemo } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { addDays, format, startOfWeek } from 'date-fns'
const scheduleData = [
    {
        day: 'Monday', events: [
            { time: '09:00 AM - 10:30 AM', class: 'Mathematics', location: 'Room 101', type: 'Lecture' },
            { time: '11:00 AM - 12:30 PM', class: 'History', location: 'Room 203', type: 'Seminar' },
            { time: '02:00 PM - 03:30 PM', class: 'Physics Lab', location: 'Science Building', type: 'Lab' },
        ]
    },
    {
        day: 'Tuesday', events: [
            { time: '10:00 AM - 11:30 AM', class: 'Literature', location: 'Room 305', type: 'Lecture' },
            { time: '01:00 PM - 02:30 PM', class: 'Computer Science', location: 'IT Lab', type: 'Practical' },
        ]
    },
    {
        day: 'Wednesday', events: [
            { time: '09:00 AM - 10:30 AM', class: 'Chemistry', location: 'Room 102', type: 'Lecture' },
            { time: '11:00 AM - 12:30 PM', class: 'Physical Education', location: 'Gymnasium', type: 'Practical' },
            { time: '02:00 PM - 03:30 PM', class: 'Study Period', location: 'Library', type: 'Self-Study' },
        ]
    },
    {
        day: 'Thursday', events: [
            { time: '10:00 AM - 11:30 AM', class: 'Biology', location: 'Room 204', type: 'Lecture' },
            { time: '01:00 PM - 02:30 PM', class: 'Art', location: 'Art Studio', type: 'Practical' },
        ]
    },
    {
        day: 'Friday', events: [
            { time: '09:00 AM - 10:30 AM', class: 'Economics', location: 'Room 301', type: 'Lecture' },
            { time: '11:00 AM - 12:30 PM', class: 'Foreign Language', location: 'Language Lab', type: 'Practical' },
            { time: '02:00 PM - 03:30 PM', class: 'Career Counseling', location: 'Counseling Center', type: 'Session' },
        ]
    },
]

export default function Schedule() {
    const [selectedWeek, setSelectedWeek] = useState(startOfWeek(new Date()))

    const weekOptions = useMemo(() => {
        const options = []
        for (let i = -2; i <= 2; i++) {
            const weekStart = addDays(startOfWeek(new Date()), i * 7)
            options.push({
                value: weekStart.toISOString(),
                label: `Week of ${format(weekStart, 'MMM d, yyyy')}`,
            })
        }
        return options
    }, [])

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Weekly Schedule</h2>
                    <p className="text-sm text-gray-600 mt-1">View and manage your academic schedule</p>
                </div>
                <div className="p-6">
                    <div className="mb-6">
                        <select
                            className="w-full sm:w-[300px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            value={selectedWeek.toISOString()}
                            onChange={(e) => setSelectedWeek(new Date(e.target.value))}
                        >
                            {weekOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-8">
                        {scheduleData.map((day, index) => (
                            <div key={day.day}>
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">{day.day}</h3>
                                <div className="space-y-4">
                                    {day.events.map((event, eventIndex) => (
                                        <div key={eventIndex} className="bg-gray-50 rounded-lg p-4 shadow">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <div>
                                                    <h4 className="font-medium text-gray-800">{event.class}</h4>
                                                    <p className="text-sm text-gray-600">{event.type}</p>
                                                </div>
                                                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                                                    {event.type}
                                                </span>
                                            </div>
                                            <div className="border-t border-gray-200 my-2"></div>
                                            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <Clock className="mr-2 h-4 w-4" />
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="mr-2 h-4 w-4" />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {index < scheduleData.length - 1 && <div className="border-t border-gray-200 my-6"></div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <button className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
                        <Calendar className="inline-block mr-2 h-4 w-4" /> Add to Calendar
                    </button>
                </div>
            </div>
        </div>
    )
}