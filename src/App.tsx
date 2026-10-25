import { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Palette, Calendar, Sparkles, BookOpen, Users, Home, Bookmark } from 'lucide-react';
import { useSavedWorkshops, useSavedCompositions, useBookings, useSavedPalettes, useQuizResult, useCanvasState, useNewsletter } from './store';
import { workshops } from './data';
import HomePage from './features/HomePage';
import WorkshopsPage from './features/Workshops';
import CalendarPage from './features/Calendar';
import InspirationRoom from './features/InspirationRoom';
import QuizPage from './features/Quiz';
import CollectionsPage from './features/Collections';
import CommunityPage from './features/Community';
import SavedPage from './features/Saved';

// Global context
interface AppContextType {
  savedWorkshops: ReturnType<typeof useSavedWorkshops>;
  compositions: ReturnType<typeof useSavedCompositions>;
  bookings: ReturnType<typeof useBookings>;
  savedPalettes: ReturnType<typeof useSavedPalettes>;
  quizResult: ReturnType<typeof useQuizResult>;
  canvas: ReturnType<typeof useCanvasState>;
  newsletter: ReturnType<typeof useNewsletter>;
}

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => useContext(AppContext)!;

// Navigation
function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { saved } = useAppContext().savedWorkshops;

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/workshops', label: 'Workshops', icon: BookOpen },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
    { to: '/inspiration', label: 'Inspiration Room', icon: Palette },
    { to: '/quiz', label: 'Creative Quiz', icon: Sparkles },
    { to: '/collections', label: 'Collections', icon: Heart },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/saved', label: 'My Collection', icon: Bookmark },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">✿</span>
          <span className="font-[family-name:var(--font-display)] text-lg text-ink">Little Day Studio</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === l.to ? 'bg-ink/5 text-ink' : 'text-pencil hover:text-ink hover:bg-ink/5'}`}>
              {l.label}
            </Link>
          ))}
          {saved.length > 0 && (
            <Link to="/saved" className="relative ml-2 px-3 py-2 rounded-lg text-sm font-medium text-berry">
              <Heart className="w-4 h-4 inline" fill="currentColor" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-berry text-white text-[10px] rounded-full flex items-center justify-center">{saved.length}</span>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-ink/5" aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream border-b border-ink/5 overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${location.pathname === l.to ? 'bg-ink/5 text-ink' : 'text-pencil hover:text-ink'}`}>
                  <l.icon className="w-4 h-4" />
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-ink text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✿</span>
              <span className="font-[family-name:var(--font-display)] text-lg">Little Day Studio</span>
            </div>
            <p className="text-cream/70 text-sm">Make room for a little wonder. A creative community for workshops, art, and small moments of joy.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <div className="space-y-2 text-sm text-cream/70">
              <Link to="/workshops" className="block hover:text-cream">Workshops</Link>
              <Link to="/calendar" className="block hover:text-cream">Calendar</Link>
              <Link to="/inspiration" className="block hover:text-cream">Inspiration Room</Link>
              <Link to="/quiz" className="block hover:text-cream">Creative Quiz</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Community</h4>
            <div className="space-y-2 text-sm text-cream/70">
              <Link to="/community" className="block hover:text-cream">Our Instructors</Link>
              <Link to="/collections" className="block hover:text-cream">Collections</Link>
              <Link to="/saved" className="block hover:text-cream">My Collection</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cream/10 text-center text-sm text-cream/50">
          <p>This is a demo creative studio. No real bookings are processed.</p>
          <p className="mt-1">© 2024 Little Day Studio — Fictional creative community</p>
        </div>
      </div>
    </footer>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    window.scrollTo(0, 0);
  }
  return null;
}

export default function App() {
  const savedWorkshops = useSavedWorkshops();
  const compositions = useSavedCompositions();
  const bookings = useBookings();
  const savedPalettes = useSavedPalettes();
  const quizResult = useQuizResult();
  const canvas = useCanvasState();
  const newsletter = useNewsletter();

  const context: AppContextType = { savedWorkshops, compositions, bookings, savedPalettes, quizResult, canvas, newsletter };

  return (
    <AppContext.Provider value={context}>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen paper-bg">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/workshops" element={<WorkshopsPage />} />
              <Route path="/workshops/:id" element={<WorkshopDetail />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/inspiration" element={<InspirationRoom />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/saved" element={<SavedPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}

// Workshop detail route wrapper
function WorkshopDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const workshop = workshops.find(w => w.id === id);
  if (!workshop) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-xl mb-4">Workshop not found</p>
        <button onClick={() => navigate('/workshops')} className="px-4 py-2 bg-ink text-cream rounded-lg">Back to Workshops</button>
      </div>
    );
  }
  return <WorkshopsPage selectedWorkshop={workshop} />;
}
