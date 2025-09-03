import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './layouts/header';
import Footer from './layouts/footer';
import Sidebar from './layouts/sidebar';
import Dashboard from './components/pages/dashboard';
import Notices from './components/pages/Notice/page';
import NoticeDetail from './components/pages/Notice/NoticeDetail';
import Project from './components/pages/project/page';
import ProjectDetail from './components/pages/project/projectDetail';
import Timeline from './components/pages/timeline/page';
import TimelineDetail from './components/pages/timeline/timeline';
import { useSidebarStore } from './stores/useSidebarStore';
import RequirementDocumentViewer from './components/pages/document/requirementDocumentViewer';
import DocumentRequest from './components/pages/document/documentRequest';
import GenerateDocument from './components/pages/document/GenerateDocument';
import SignUpPage from './components/pages/Authentication/SignUpPage';
import LoginPage from './components/pages/Authentication/LoginPage';
import MyPage from './components/pages/MyPage';
import IdFindPage from './components/pages/Authentication/IdFindPage';
import PasswordFindPage from './components/pages/Authentication/PasswordFindPage';
import IntroPage from './components/pages/IntroPage';
import DocumentPage from './components/pages/document/page';
import DocumentList from './components/pages/document/documentList';
import FunctionalDocumentViewer from './components/pages/document/FunctionalDocumentViewer';
import PolicyDocumentViewer from './components/pages/document/PolicyDocumentViewer';


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
            <div className="max-w-6xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/intro" element={<IntroPage />} />
                <Route path="/id-find" element={<IdFindPage />} />
                <Route path="/password-find" element={<PasswordFindPage />} />
                <Route path="/documents" element={<DocumentPage />} />
                <Route
                  path="/documents/project/:project_id"
                  element={<DocumentList />}
                />
                <Route
                  path="/documents/generate/:project_id"
                  element={<GenerateDocument />}
                />
                <Route
                  path="/documents/prd_viewer/:document_id"
                  element={<RequirementDocumentViewer />}
                />
                <Route
                  path="/documents/fsd_viewer/:document_id"
                  element={<FunctionalDocumentViewer />}
                />
                <Route
                  path="/documents/spd_viewer/:document_id"
                  element={<PolicyDocumentViewer />}
                />
                <Route path="/notices" element={<Notices />} />
                <Route path="/notices/:id" element={<NoticeDetail />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/timelines" element={<Timeline />} />
                <Route
                  path="/timelines/projects/:id"
                  element={<TimelineDetail />}
                />
                <Route
                  path="/prd-viewer-test/:document_id"
                  element={<RequirementDocumentViewer />}
                />
                <Route path="/request-prd" element={<DocumentRequest />} />
                <Route
                  path="/generate-document"
                  element={<GenerateDocument />}
                />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage" element={<MyPage />} />
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
