import  { useContext, useState } from 'react'
import { DataContext } from '../Context/DataProvider';
import Sidebar from '../Components/Sidebar/Sidebar';
import { Route, Routes } from "react-router-dom"
import ProtectedRoutes from '../Components/ProtectedRoutes/ProtectedRoutes';
import Login from '../Components/Auth/Login';
import Dashboard from './Dashboard';
import AddStudent from '../Components/Students/AddStudent';
import AddStaff from '../Components/Staff/AddStaff';
import Students from '../Components/Students/Students';
import Staff from '../Components/Staff/Staff';
import Help from './Help';
import Settings from './Settings';
import Schedule from './Schedule';
const HomePage = () => {
    const { account } = useContext(DataContext);
    const isAuthenticated = !!account;
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
            <div className={`flex-1 ${isOpen ? "ml-52" : ""} transition-all duration-300`}>
            <Routes>
                <Route path="/onboarding" element={<ProtectedRoutes element={<Dashboard/>} isAuthenticated={isAuthenticated} />} />
                <Route path='/' element={<Login/>}/>
                <Route path="/students" element={<ProtectedRoutes element={<Students/>} isAuthenticated={isAuthenticated} />} />
                <Route path="/staff" element={<ProtectedRoutes element={<Staff/>} isAuthenticated={isAuthenticated} />} />
                <Route path="/add-student" element={<ProtectedRoutes element={<AddStudent/>} isAuthenticated={isAuthenticated} />} />
                <Route path="/add-staff" element={<ProtectedRoutes element={<AddStaff/>} isAuthenticated={isAuthenticated} />} />
                <Route path="/help" element={<ProtectedRoutes element={<Help/>} isAuthenticated={isAuthenticated} />} />
                <Route path="/settings" element={<ProtectedRoutes element={<Settings/>} isAuthenticated={isAuthenticated} />} />
                <Route path="/schedule" element={<ProtectedRoutes element={<Schedule/>} isAuthenticated={isAuthenticated} />} />
            </Routes>
            </div>
        </div>
    )
}

export default HomePage