import { useEffect, useState } from "react";
import { getProfile } from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { Mail, } from "lucide-react"
const Header = () => {
    const [profile, setProfile] = useState({});
    const [id, setId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded);
            setId(decoded.id);
        }
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            if (id) {
                const response = await getProfile(id);
                if (response.status === 200) {
                    setProfile(response.data);
                }
            }
        };
        fetchProfile();
    }, [id]);

    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <h1 className="text-3xl font-bold mb-4 sm:mb-0">
                        Welcome, {profile.name || 'User'}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">{profile.rollNumber}</span>
                        </div>
                        <div>
                            <span className="font-medium">{profile.rollNumber || ''}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="h-5 w-5" />
                            <span className="font-medium">{profile.email || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
