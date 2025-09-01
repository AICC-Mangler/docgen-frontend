import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './layouts/header';
import Footer from './layouts/footer';
import Sidebar from './layouts/sidebar';
import Dashboard from './components/pages/dashboard';
import Documents from './components/pages/document';
import Notices from './components/pages/notice';
import Hashtag from './components/pages/hashtag';
import MemberTest from './components/page';
import { useSidebarStore } from './stores/useSidebarStore';
import RequirementDocumentViewer from './components/pages/document/requirementDocumentViewer';
import DocumentRequest from './components/pages/document/documentRequest';
import GenerateDocument from './components/pages/document/GenerateDocument';

function App() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <Router>
      <div className="min-h-screen flex">
        <div className={`flex ${isOpen ? 'block' : 'hidden'}`}>
          {/* 사이드바 */}
          <Sidebar isOpen={isOpen} onToggle={toggle} />
        </div>
        {/* 메인 콘텐츠 영역 - 사이드바 상태에 따라 너비 조정 */}
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <Header onMenuToggle={toggle} sidebarOpen={isOpen} />
          <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/hashtag" element={<Hashtag />} />
                <Route path="/member-test" element={<MemberTest />} />
                <Route
                  path="/prd-viewer-test/:document_id"
                  element={<RequirementDocumentViewer/>}
                />
                <Route
                  path="/request-prd"
                  element={<DocumentRequest />}
                />
                <Route
                  path="/generate-document"
                  element={<GenerateDocument />}
                />
                
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
