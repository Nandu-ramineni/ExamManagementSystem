import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../services/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 
import {jwtDecode} from 'jwt-decode';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;
                if (userRole === "teacher") {
                    navigate("/teacherDashboard");
                } else if (userRole === "student") {
                    navigate("/studentDashboard");
                } else {
                    navigate("/unauthorized");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem("token");
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await UserLogin({ email, password });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;
                if (userRole === "teacher") {
                    navigate("/teacherDashboard");
                } else if (userRole === "student") {
                    navigate("/studentDashboard");
                } else {
                    navigate("/unauthorized");
                }
            } else {
                setError("Invalid email or password.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Login</h2>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="relative">
                        <label htmlFor="email" className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white"
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full py-2 mt-4 text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        disabled={loading}
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don{"'"}t have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
