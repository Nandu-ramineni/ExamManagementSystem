import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, FileText, Award, HelpCircle, Settings, UserPlus, Users, Power } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    
    const navItems = [
        { icon: Home, label: "Dashboard", path: "/onboarding" },
        { icon: UserPlus, label: "Add Student", path: "/add-student" },
        { icon: UserPlus, label: "Add Staff", path: "/add-staff" },
        { icon: Users, label: "Students", path: "/students" },
        { icon: Users, label: "Staff", path: "/staff" },
        { icon: Calendar, label: "Schedule", path: "/schedule" },
        { icon: FileText, label: "Assignments", path: "/assignments" },
        { icon: Award, label: "Grades", path: "/grades" },
        { icon: HelpCircle, label: "Help Center", path: "/help" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const logOutHandler = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-30 text-gray-800 bg-white p-2 rounded-md shadow-md"
                aria-label="Toggle sidebar"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <aside
                className={`fixed inset-y-0 left-0 z-20 w-52 h-screen bg-white shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen overflow-y-auto`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-20 border-b border-gray-200 sticky top-0 bg-white z-10">
                        <Link to="/" className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-8 w-8 text-indigo-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            <span className="text-xl font-bold text-gray-900">EduPortal</span>
                        </Link>
                    </div>
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="px-4 space-y-2">
                            {navItems.map((item, index) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <li key={index}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition duration-150 ease-in-out ${
                                                isActive
                                                    ? "bg-indigo-50 text-indigo-600"
                                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                            }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
                        <div className="flex items-center justify-between space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150 ease-in-out">
                            <div className="flex items-center space-x-3">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">John Doe</p>
                                    <p className="text-xs text-gray-500">View Profile</p>
                                </div>
                            </div>
                            <button
                                onClick={logOutHandler}
                                className="text-red-500 hover:text-red-600 transition-colors duration-150"
                                aria-label="Log out"
                            >
                                <Power className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
