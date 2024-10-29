import  { useState } from 'react'
import { Search, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react'

const faqData = [
    {
        question: "How do I reset my password?",
        answer: "To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email address."
    },
    {
        question: "Where can I find my class schedule?",
        answer: "Your class schedule is available in the 'Schedule' section of your student dashboard. You can view it by day, week, or month."
    },
    {
        question: "How do I submit an assignment?",
        answer: "To submit an assignment, go to the 'Assignments' section, find the relevant assignment, and click on 'Submit'. Follow the prompts to upload your work."
    },
    {
        question: "What should I do if I'm having technical issues?",
        answer: "For technical issues, please contact our IT support team at support@school.edu or call the helpdesk at (555) 123-4567."
    },
]

export default function Help() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Help Center</h1>
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for help..."
                        className="w-full p-2 pl-10 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" />
                </div>
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                {filteredFAQs.map((faq, index) => (
                    <div key={index} className="mb-4 bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold mb-2 flex items-center">
                            <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                            {faq.question}
                        </h3>
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-white p-4 rounded-lg shadow flex items-center">
                        <MessageCircle className="w-6 h-6 mr-3 text-primary" />
                        <div>
                            <h3 className="font-semibold">Chat Support</h3>
                            <p className="text-sm text-gray-600">Available 24/7</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex items-center">
                        <Phone className="w-6 h-6 mr-3 text-primary" />
                        <div>
                            <h3 className="font-semibold">Phone Support</h3>
                            <p className="text-sm text-gray-600">(555) 123-4567</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex items-center">
                        <Mail className="w-6 h-6 mr-3 text-primary" />
                        <div>
                            <h3 className="font-semibold">Email Support</h3>
                            <p className="text-sm text-gray-600">support@school.edu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}