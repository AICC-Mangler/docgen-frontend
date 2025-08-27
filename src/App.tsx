import React from 'react';
import MemberTest from './components/MemberTest';
import './App.css';
import Header from './layouts/header';
import Footer from './layouts/footer';

function App() {
  const envTest = import.meta.env.VITE_ENV_TEST;
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">envTest : {envTest}</h1>
          <MemberTest />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App
