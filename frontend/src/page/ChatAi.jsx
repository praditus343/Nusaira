import React from 'react';
import { Send } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import Header from '../componen/Header';
import imgAi from "../assets/img/landing_page_sebelum_daftar/landingsb17.png";

const ChatInterface = () => {
    return (
        <div className='bg-white w-full min-h-screen'>
            <Header />
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-10 mb-40">
                <div className="w-96 h-96 mb-6">
                    <img
                        src={imgAi}
                        alt="Robot Avatar"
                        className="w-full h-full"
                    />
                </div>
                <h1 className="text-lg text-gray-800 mb-6">
                    Apa yang bisa saya bantu?
                </h1>
                <div className="w-full relative border border-blue-600 rounded-xl">
                    <input
                        type="text"
                        placeholder="Kirim Pertanyaan Ke NusAI"
                        className="w-full px-4 py-3 pr-14 border border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        className="absolute right-0 top-0 h-full px-8 bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                        <Send className="w-6 h-6 text-white " />
                    </button>
                </div>
            </div>
        </div>
    );
};


function ChatAi() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <ChatInterface />
                <div className='mt-40'>
                    <Footer />
                </div>
            </div>
        </div>

    );
}

export default ChatAi;