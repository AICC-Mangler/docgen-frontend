
import React, { useState } from 'react';
import MemberTest from './components/MemberTest';
import './App.css';
import Header from './layouts/header';
import Footer from './layouts/footer';
import Sidebar from './layouts/sidebar';

function App() {
  const envTest = import.meta.env.VITE_ENV_TEST;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* 사이드바 */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">envTest : {envTest}</h1>
            <MemberTest />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
