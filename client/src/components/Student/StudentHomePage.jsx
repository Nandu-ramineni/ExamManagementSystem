import { useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Exams from "./Exams";
import ExamView from "./ExamView";
import Dashboard from "./Dashboard";
import Schedule from "./Schedule";
import Assignments from "./Assignments";
import Help from "./Help";
import Settings from "./Settings";
import Results from "./Results";

const StudentHomePage = () => {
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
                    <Route path="/exams" element={<Exams/>} />
                    <Route path="/exams/:id" element={<ExamView/>} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </main>
        </div>
    )
}

export default StudentHomePage