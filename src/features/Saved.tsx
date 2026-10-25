import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Palette, Bookmark, Sparkles, Trash2, X, ExternalLink } from 'lucide-react';
import { workshops } from '../data';
import { useAppContext } from '../App';

export default function SavedPage() {
  const { savedWorkshops, compositions, savedPalettes, quizResult } = useAppContext();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'workshops' | 'compositions' | 'palettes' | 'quiz'>('workshops');

  const savedWs = workshops.filter(w => savedWorkshops.saved.includes(w.id));
  const hasContent = savedWs.length > 0 || compositions.compositions.length > 0 || savedPalettes.palettes.length > 0 || quizResult.result;

  const clearAll = () => {
    savedWorkshops.clearAll();
    compositions.clearAll();
    setShowClearConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="handwritten text-xl text-berry mb-1">your collection</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">My Collection</h1>
          <p className="text-pencil mt-1 text-sm">Everything you've saved and created.</p>
        </div>
        {hasContent && (
          <button onClick={() => setShowClearConfirm(true)} className="text-xs text-berry font-medium hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 border-b border-ink/5">
        {[
          { id: 'workshops' as const, label: 'Workshops', icon: Heart, count: savedWs.length },
          { id: 'compositions' as const, label: 'Compositions', icon: Bookmark, count: compositions.compositions.length },
          { id: 'palettes' as const, label: 'Palettes', icon: Palette, count: savedPalettes.palettes.length },
          { id: 'quiz' as const, label: 'Quiz Result', icon: Sparkles, count: quizResult.result ? 1 : 0 },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
              ${activeTab === tab.id ? 'border-berry text-ink' : 'border-transparent text-pencil hover:text-ink'}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
            {tab.count > 0 && <span className="text-[10px] bg-ink/10 px-1.5 py-0.5 rounded-full">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'workshops' && (
          <motion.div key="workshops" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {savedWs.length === 0 ? (
              <EmptyState emoji="♡" title="No saved workshops yet" description="Browse workshops and save the ones that catch your eye." action={{ to: '/workshops', label: 'Explore Workshops' }} />
            ) : (
              <div className="space-y-2">
                {savedWs.map(w => (
                  <div key={w.id} className="paper-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: w.color + '40' }}>{w.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/workshops/${w.id}`} className="font-medium text-sm hover:text-berry">{w.title}</Link>
                      <p className="text-xs text-pencil">{w.instructor} · {new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${w.price}</p>
                    </div>
                    <button onClick={() => savedWorkshops.toggle(w.id)} className="p-2 rounded-full hover:bg-berry/10 text-berry" aria-label="Remove">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'compositions' && (
          <motion.div key="compositions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {compositions.compositions.length === 0 ? (
              <EmptyState emoji="🎨" title="No saved compositions" description="Create something in the Inspiration Room and save it here." action={{ to: '/inspiration', label: 'Open Inspiration Room' }} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {compositions.compositions.map(c => (
                  <div key={c.id} className="paper-card p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{c.name}</p>
                        <p className="text-[10px] text-pencil">{c.elements.length} elements · {new Date(c.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-1">
                        <Link to="/inspiration" onClick={() => compositions.duplicate(c.id)} className="p-1.5 rounded hover:bg-ink/5 text-xs">
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button onClick={() => compositions.remove(c.id)} className="p-1.5 rounded hover:bg-berry/10 text-berry">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {c.palette.map((col, i) => <div key={i} className="w-5 h-5 rounded-full border border-ink/10" style={{ backgroundColor: col }} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'palettes' && (
          <motion.div key="palettes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {savedPalettes.palettes.length === 0 ? (
              <EmptyState emoji="🎨" title="No saved palettes" description="Build color palettes in the Inspiration Room and save your favorites." action={{ to: '/inspiration', label: 'Open Inspiration Room' }} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {savedPalettes.palettes.map((p, i) => (
                  <div key={i} className="paper-card p-4 flex items-center gap-3">
                    <div className="flex gap-1">
                      {p.map((c, j) => <div key={j} className="w-6 h-6 rounded-full border border-ink/10" style={{ backgroundColor: c }} />)}
                    </div>
                    <span className="text-xs flex-1">Palette #{i + 1}</span>
                    <button onClick={() => savedPalettes.remove(i)} className="p-1.5 rounded hover:bg-berry/10 text-berry">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {quizResult.result ? (
              <div className="paper-card p-6 text-center" style={{ borderTop: `4px solid ${quizResult.result.color}` }}>
                <span className="text-4xl block mb-2">{quizResult.result.emoji}</span>
                <h3 className="font-[family-name:var(--font-display)] text-xl mb-2">{quizResult.result.title}</h3>
                <p className="text-sm text-pencil mb-4 max-w-md mx-auto">{quizResult.result.description}</p>
                <div className="flex gap-2 justify-center">
                  <Link to="/quiz" className="btn-press px-4 py-2 rounded-full border border-ink/10 text-sm font-medium hover:bg-ink/5">Retake Quiz</Link>
                  <Link to="/workshops" className="btn-press px-4 py-2 rounded-full bg-ink text-cream text-sm font-medium hover:bg-ink/90">See Recommendations</Link>
                </div>
              </div>
            ) : (
              <EmptyState emoji="✨" title="No quiz result yet" description="Take the Creative Mood Quiz to discover your creative personality." action={{ to: '/quiz', label: 'Take the Quiz' }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear confirm dialog */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 backdrop-blur-sm p-4"
            onClick={() => setShowClearConfirm(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="paper-card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <h3 className="font-medium mb-2">Clear your collection?</h3>
              <p className="text-sm text-pencil mb-4">This will remove all saved workshops and compositions. This cannot be undone.</p>
              <div className="flex gap-2">
                <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2 border border-ink/10 rounded-full text-sm">Cancel</button>
                <button onClick={clearAll} className="flex-1 py-2 bg-berry text-white rounded-full text-sm">Clear All</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ emoji, title, description, action }: { emoji: string; title: string; description: string; action: { to: string; label: string } }) {
  return (
    <div className="text-center py-12">
      <span className="text-4xl block mb-3">{emoji}</span>
      <p className="font-medium mb-1">{title}</p>
      <p className="text-sm text-pencil mb-4">{description}</p>
      <Link to={action.to} className="btn-press inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream rounded-full text-sm font-medium hover:bg-ink/90">
        {action.label}
      </Link>
    </div>
  );
}
