import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Resume from './pages/Resume';
import About from './pages/About';
import Projects from './pages/Projects';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
