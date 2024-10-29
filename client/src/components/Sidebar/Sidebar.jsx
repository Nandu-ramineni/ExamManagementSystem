import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { BiHomeAlt2 } from "react-icons/bi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoMdMenu } from "react-icons/io"; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <>
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-30 text-gray-800 dark:text-gray-200"
            >
                <IoMdMenu size={24} />
            </button>
            <div className={`navbar-container bg-white dark:bg-gray-800 shadow-lg rounded-tr-2xl h-screen rounded-br-2xl overflow-hidden fixed lg:static ${isOpen ? 'w-52' : 'w-0'} lg:w-52 h-full z-20 transition-all duration-300`}>
                <Link to='/' className="flex justify-center items-center gap-2 pt-6">
                    <h2 className="text-lg font-semibold pt-1 text-center text-gray-900 dark:text-gray-100">EMS</h2>
                </Link>
                <div className="block justify-start items-center pt-12">
                    <nav className="w-full flex justify-center">
                        <ul className="flex flex-col justify-start items-start">
                            <Link to='/dashboard' className="text-gray-800 dark:text-gray-200 text-lg font-normal py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-[#6918c5] dark:hover:text-[#8c5cff]">
                                <BiHomeAlt2 /> Dashboard
                            </Link>
                            <Link to='/exams' className="text-gray-800 dark:text-gray-200 text-lg font-normal py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-[#6918c5] dark:hover:text-[#8c5cff]">
                                <LiaChalkboardTeacherSolid /> Exams
                            </Link>
                            <Link to='/profile' className="text-gray-800 dark:text-gray-200 text-lg font-normal py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-[#6918c5] dark:hover:text-[#8c5cff]">
                                <IoSettingsOutline /> Profile
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
