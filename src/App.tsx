import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { LearningPaths } from './pages/LearningPaths';
import { Resources } from './pages/Resources';
import { Blog } from './pages/Blog';
import { Videos } from './pages/Videos';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main className="pt-16">
        <Home />
        <LearningPaths />
        <Courses />
        <Resources />
        <Blog />
        <Videos />
        <Gallery />
        <About />
        <Contact />
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
