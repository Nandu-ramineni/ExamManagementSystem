import { useEffect, useState } from "react"
import { deleteUserById, getTeachers } from "../../services/api"
import * as XLSX from 'xlsx'
import { Download, Trash2, Search, AlertCircle, Loader } from 'lucide-react'
import { useDebounce } from 'use-debounce'

const Staff = () => {
    const [staff, setStaff] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [staffPerPage] = useState(10)

    useEffect(() => {
        const fetchStaff = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await getTeachers()
                setStaff(response.data)
            } catch (error) {
                console.error("Error while fetching staff", error)
                setError("Failed to load staff. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }
        fetchStaff()
    }, [])

    const deleteStaff = async (userId) => {
        if (window.confirm("Are you sure you want to delete this staff member?")) {
            try {
                const response = await deleteUserById(userId)
                if (response.status === 200) {
                    const updatedUsers = staff.filter(member => member._id !== userId)
                    setStaff(updatedUsers)
                    alert("Staff member deleted successfully")
                }
            } catch (error) {
                console.error("Error while deleting staff member", error)
                alert("Failed to delete staff member. Please try again.")
            }
        }
    }

    const exportToExcel = () => {
        const exportData = staff.map(member => ({
            Username: member.name,
            Email: member.email,
            StaffID: member.staffId || 'N/A'
        }))
        const worksheet = XLSX.utils.json_to_sheet(exportData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Staff")
        XLSX.writeFile(workbook, "StaffData.xlsx")
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )

    // Pagination
    const indexOfLastStaff = currentPage * staffPerPage
    const indexOfFirstStaff = indexOfLastStaff - staffPerPage
    const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Staff Data</h2>
                <button
                    onClick={exportToExcel}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition duration-300"
                >
                    <Download size={20} />
                    Export to Excel
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="w-10 h-10 text-blue-500 animate-spin" />
                </div>
            ) : error ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <div className="flex items-center">
                        <AlertCircle className="w-6 h-6 mr-2" />
                        <p>{error}</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                            <thead>
                                <tr className="text-left">
                                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Name</th>
                                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Email</th>
                                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Staff ID</th>
                                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStaff.map(member => (
                                    <tr key={member._id}>
                                        <td className="border-b  border-gray-200 px-6 py-4">{member.name}</td>
                                        <td className="border-b border-gray-200 px-6 py-4">
                                            <a href={`mailto:${member.email}`} className="text-blue-500 hover:text-blue-600">{member.email}</a>
                                        </td>
                                        <td className="border-b border-gray-200 px-6 py-4">{member.staffId || 'N/A'}</td>
                                        <td className="border-b border-gray-200 px-6 py-4">
                                            <button
                                                onClick={() => deleteStaff(member._id)}
                                                className="text-red-500 hover:text-red-600 transition duration-300"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredStaff.length > staffPerPage && (
                        <div className="flex justify-center mt-6">
                            {Array.from({ length: Math.ceil(filteredStaff.length / staffPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={`mx-1 px-4 py-2 border rounded ${
                                        currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Staff