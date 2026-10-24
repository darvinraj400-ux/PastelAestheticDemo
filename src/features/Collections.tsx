import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { collections, workshops } from '../data';
import { useAppContext } from '../App';

export default function CollectionsPage() {
  const [searchParams] = useSearchParams();
  const initialCollection = searchParams.get('collection') || '';
  const [activeCollection, setActiveCollection] = useState(initialCollection || collections[0].id);
  const { canvas } = useAppContext();

  const collection = collections.find(c => c.id === activeCollection) || collections[0];
  const collectionWorkshops = workshops.filter(w => collection.workshops.includes(w.id));
  const currentIndex = collections.findIndex(c => c.id === activeCollection);

  const goToCollection = (id: string) => setActiveCollection(id);
  const prev = () => goToCollection(collections[(currentIndex - 1 + collections.length) % collections.length].id);
  const next = () => goToCollection(collections[(currentIndex + 1) % collections.length].id);

  const loadPresetInInspiration = () => {
    canvas.setPalette(collection.palette);
    canvas.setBackground(collection.palette[0] + '20');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="handwritten text-xl text-berry mb-1">curated</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">The Little Collections</h1>
        <p className="text-pencil mt-2">Seasonal creative collections to inspire your next project.</p>
      </div>

      {/* Collection tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {collections.map(c => (
          <button key={c.id} onClick={() => goToCollection(c.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${activeCollection === c.id ? 'bg-ink text-cream' : 'bg-paper border border-ink/10 text-ink hover:bg-ink/5'}`}>
            <span>{c.emoji}</span> {c.name}
          </button>
        ))}
      </div>

      {/* Active collection */}
      <AnimatePresence mode="wait">
        <motion.div key={activeCollection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          {/* Hero section */}
          <div className="paper-card p-8 md:p-12 mb-8 relative overflow-hidden" style={{ borderLeft: `6px solid ${collection.color}` }}>
            <div className="absolute top-4 right-4 text-6xl opacity-10">{collection.emoji}</div>
            <div className="max-w-2xl relative z-10">
              <span className="text-4xl block mb-3">{collection.emoji}</span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-2">{collection.name}</h2>
              <p className="handwritten text-lg mb-3" style={{ color: collection.color }}>{collection.tagline}</p>
              <p className="text-pencil leading-relaxed mb-6">{collection.description}</p>
              
              {/* Palette */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-pencil">Palette:</span>
                <div className="flex gap-1">
                  {collection.palette.map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border border-ink/10" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              {/* Creative prompt */}
              <div className="bg-cream/50 rounded-lg p-4 mb-4">
                <p className="text-xs font-medium text-pencil mb-1">✨ Creative Prompt</p>
                <p className="text-sm italic">{collection.prompt}</p>
              </div>

              <button onClick={loadPresetInInspiration}
                className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-ink/10 hover:bg-ink/5">
                <Sparkles className="w-4 h-4" /> Load in Inspiration Room
              </button>
            </div>
          </div>

          {/* Collection workshops */}
          <div className="mb-8">
            <h3 className="font-[family-name:var(--font-display)] text-xl mb-4">Workshops in this collection</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {collectionWorkshops.map((w, i) => (
                <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/workshops/${w.id}`} className="block paper-card paper-card-hover p-4 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: w.color + '40' }}>{w.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{w.title}</p>
                        <p className="text-xs text-pencil">{w.instructor}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-pencil">
                      <span>{new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {w.time}</span>
                      <span className="font-medium text-ink">${w.price}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-ink/5">
        <button onClick={prev} className="btn-press flex items-center gap-1 text-sm font-medium text-pencil hover:text-ink">
          <ChevronLeft className="w-4 h-4" /> {collections[(currentIndex - 1 + collections.length) % collections.length].name}
        </button>
        <button onClick={next} className="btn-press flex items-center gap-1 text-sm font-medium text-pencil hover:text-ink">
          {collections[(currentIndex + 1) % collections.length].name} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
