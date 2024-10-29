import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExams } from "../../services/api";
import { format, isPast, isFuture } from "date-fns";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

export default function Component() {
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("upcoming");

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await getExams();
                setExams(response.data);
                filterExams(response.data, "upcoming");
            } catch (err) {
                setError("Failed to load exams. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchExams();
    }, []);

    const filterExams = (examList, filterType) => {
        let filtered;
        if (filterType === "upcoming") {
            filtered = examList.filter(exam => isFuture(new Date(exam.date)));
        } else if (filterType === "completed") {
            filtered = examList.filter(exam => isPast(new Date(exam.date)));
        } else {
            filtered = examList;
        }
        setFilteredExams(filtered);
        setFilter(filterType);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-red-500 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">Error</h3>
                    <p className="mt-1 text-gray-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight">Available Exams</h1>
                <p className="mt-2 text-lg">Choose an exam to start your assessment</p>
            </div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Exam List</h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => filterExams(exams, "all")}
                                    className={`px-4 py-2 rounded-md ${filter === "all"
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => filterExams(exams, "upcoming")}
                                    className={`px-4 py-2 rounded-md ${filter === "upcoming"
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    Upcoming
                                </button>
                                <button
                                    onClick={() => filterExams(exams, "completed")}
                                    className={`px-4 py-2 rounded-md ${filter === "completed"
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    Completed
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Center
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredExams.map((exam) => (
                                    <tr key={exam._id} className="transition duration-300 ease-in-out hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{exam.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <CalendarIcon className="h-4 w-4 mr-2" />
                                                {format(new Date(exam.date), "MMMM d, yyyy")}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-2" />
                                                {exam.duration} minutes
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <MapPinIcon className="h-4 w-4 mr-2" />
                                                {exam.center}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/studentDashboard/exams/${exam._id}`}>
                                                <button
                                                    className={`py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isPast(new Date(exam.date))
                                                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                        }`}
                                                    disabled={isPast(new Date(exam.date))}
                                                >
                                                    {isPast(new Date(exam.date)) ? "Completed" : "Start Exam"}
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}