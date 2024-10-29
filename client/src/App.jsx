import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import StudentHomePage from "./components/Student/StudentHomePage";
import TeacherHomePage from "./components/Teacher/TeacherHomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={"Unauthorized"} />
        <Route element={<PrivateRoute requiredRole="teacher" />}>
          <Route path="/teacherDashboard/*" element={<TeacherHomePage/>} />
        </Route>
        <Route element={<PrivateRoute requiredRole="student" />}>
          <Route path="/studentDashboard/*" element={<StudentHomePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
