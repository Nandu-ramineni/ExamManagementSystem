import { useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Settings from "../Student/Settings";
import Help from "../Student/Help";
import Assignments from "../Student/Assignments";
import Schedule from "../Student/Schedule";
import Exam from "./Exam";
import Dashboard from "./Dashboard";
import Exams from "./Exams";
import AddQuestions from "./AddQuestions";


const TeacherHomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <main className={`flex-1 ${isOpen ? "ml-52" : ""} transition-all duration-300`}>
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/help" element={<Help/>} />
                    <Route path="/assignments" element={<Assignments/>} />
                    <Route path="/schedule" element={<Schedule/>} />
                    <Route path="/add-exam" element={<Exam/>} />
                    <Route path="/exams" element={<Exams/>} />
                    <Route path="/exams/:examId" element={<AddQuestions/>} />
                </Routes>
            </main>
        </div>
    )
}

export default TeacherHomePage