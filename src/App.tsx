import React from 'react';
import MemberTest from './components/MemberTest';
import './App.css';

function App() {
  const envTest = import.meta.env.VITE_ENV_TEST;
  
  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
        <h1>독젠 (Docgen) 프로젝트</h1>
        <p>백엔드 NestJS + 프론트엔드 React + Axios 연동 테스트</p>
        {envTest && <p style={{ fontSize: '14px', color: '#666' }}>환경: {envTest}</p>}
      </header>
      
      <main>
        <MemberTest />
      </main>
    </div>
  );
}

export default App
