import MemberTest from './components/MemberTest';
import './App.css';
import Header from './layouts/header';
import Footer from './layouts/footer';

function App() {
  const envTest = 'test';
  return (
    <div>
      <Header />
      <main>
        <h1>envTest : {envTest}</h1>
        <MemberTest />
      </main>
      <Footer />
    </div>
  );
}

export default App;
