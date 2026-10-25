import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Calendar, Heart } from 'lucide-react';
import { workshops, categories, collections, instructors } from '../data';
import { useAppContext } from '../App';

export default function HomePage() {
  const navigate = useNavigate();
  const { newsletter } = useAppContext();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 right-[15%] text-4xl opacity-60">✿</motion.div>
          <motion.div animate={{ y: [0, -5, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-40 left-[10%] text-3xl opacity-40">★</motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-32 right-[25%] text-2xl opacity-50">◇</motion.div>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute top-[30%] right-[8%] text-5xl opacity-30">✦</motion.div>
          <div className="absolute bottom-20 left-[20%] w-32 h-32 bg-peach/20 rounded-full blur-2xl" />
          <div className="absolute top-[40%] left-[5%] w-24 h-24 bg-lilac/20 rounded-full blur-xl" />
          <div className="absolute bottom-[30%] right-[10%] w-28 h-28 bg-mint/20 rounded-full blur-xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="handwritten text-2xl text-berry mb-2">welcome to</p>
              <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-ink leading-tight mb-4">
                Make room for<br />
                <span className="text-berry doodle-underline">a little wonder.</span>
              </h1>
              <p className="text-lg text-pencil max-w-md mb-8">
                Discover creative workshops, build your inspiration, and find small moments of joy in making.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/workshops')}
                  className="btn-press inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors">
                  Find Your Next Workshop <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate('/inspiration')}
                  className="btn-press inline-flex items-center gap-2 px-6 py-3 bg-peach/30 text-ink rounded-full font-medium hover:bg-peach/50 transition-colors border border-peach">
                  <Sparkles className="w-4 h-4" /> Enter the Inspiration Room
                </button>
              </div>
            </motion.div>

            {/* Hero collage */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Paper layers */}
                <div className="absolute inset-8 bg-paper rounded-lg shadow-lg rotate-2 border border-ink/5" />
                <div className="absolute inset-12 bg-butter/30 rounded-lg rotate-[-3deg] border border-ink/5" />
                
                {/* Workshop cards collage */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="absolute top-8 left-8 w-40 h-48 paper-card p-3 rotate-[-5deg]">
                  <div className="w-full h-24 bg-mint/40 rounded mb-2 flex items-center justify-center text-3xl">🌿</div>
                  <p className="text-xs font-medium text-ink">Botanical Art</p>
                  <p className="text-[10px] text-pencil">with Sage Williams</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                  className="absolute top-16 right-8 w-36 h-44 paper-card p-3 rotate-[4deg]">
                  <div className="w-full h-20 bg-lilac/40 rounded mb-2 flex items-center justify-center text-3xl">🏺</div>
                  <p className="text-xs font-medium text-ink">Ceramics</p>
                  <p className="text-[10px] text-pencil">with Tomás Rivera</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                  className="absolute bottom-16 left-16 w-44 h-40 paper-card p-3 rotate-[2deg]">
                  <div className="w-full h-20 bg-peach/40 rounded mb-2 flex items-center justify-center text-3xl">🎨</div>
                  <p className="text-xs font-medium text-ink">Watercolor</p>
                  <p className="text-[10px] text-pencil">with Mira Chen</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                  className="absolute bottom-8 right-12 w-32 h-36 paper-card p-3 rotate-[-3deg]">
                  <div className="w-full h-16 bg-butter/40 rounded mb-2 flex items-center justify-center text-3xl">📔</div>
                  <p className="text-xs font-medium text-ink">Journaling</p>
                  <p className="text-[10px] text-pencil">with Lena Park</p>
                </motion.div>

                {/* Decorative stickers */}
                <div className="absolute top-4 right-20 text-2xl animate-float">✿</div>
                <div className="absolute bottom-4 left-4 text-xl animate-wiggle">★</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="handwritten text-xl text-berry mb-1">what's coming up</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">Upcoming Workshops</h2>
          </div>
          <Link to="/workshops" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-berry transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workshops.slice(0, 6).map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/workshops/${w.id}`} className="block paper-card paper-card-hover p-4 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: w.color + '40' }}>
                    {w.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-ink text-sm leading-tight mb-1">{w.title}</h3>
                    <p className="text-xs text-pencil mb-1">{w.instructor}</p>
                    <div className="flex items-center gap-2 text-xs text-pencil">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>·</span>
                      <span>{w.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-ink/5 text-ink/70">{w.skillLevel}</span>
                  <span className="text-sm font-medium">${w.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <Link to="/workshops" className="sm:hidden mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink">
          View all workshops <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Categories */}
      <section className="bg-paper border-y border-ink/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="handwritten text-xl text-berry mb-1 text-center">explore by interest</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-10">Creative Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/workshops?category=${cat.id}`}
                  className="block paper-card p-4 text-center hover:shadow-md transition-all group">
                  <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                  <span className="text-xs font-medium text-ink leading-tight">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="handwritten text-xl text-berry mb-1">curated for you</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-10">The Little Collections</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {collections.map((col, i) => (
            <motion.div key={col.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/collections?collection=${col.id}`}
                className="block paper-card p-6 hover:shadow-md transition-all group" style={{ borderLeft: `4px solid ${col.color}` }}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{col.emoji}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl mb-1">{col.name}</h3>
                    <p className="text-sm text-pencil mb-3">{col.tagline}</p>
                    <div className="flex gap-1">
                      {col.palette.map((c, j) => (
                        <div key={j} className="w-5 h-5 rounded-full border border-ink/10" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Preview */}
      <section className="bg-paper border-y border-ink/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="handwritten text-xl text-berry mb-1 text-center">the people behind the studio</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-10">Our Instructors</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instructors.map((inst, i) => (
              <motion.div key={inst.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to="/community" className="block text-center group">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 transition-transform group-hover:scale-110" style={{ backgroundColor: inst.color + '40' }}>
                    {inst.emoji}
                  </div>
                  <p className="text-sm font-medium text-ink">{inst.name}</p>
                  <p className="text-xs text-pencil">{inst.specialty.split('&')[0].trim()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="paper-card p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-4 left-4 text-xl opacity-30">✿</div>
          <div className="absolute bottom-4 right-4 text-xl opacity-30">★</div>
          <p className="handwritten text-xl text-berry mb-1">stay inspired</p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-3">Join our creative newsletter</h2>
          <p className="text-sm text-pencil mb-6">Get workshop announcements, creative prompts, and seasonal inspiration. This is a local demo—no real emails are sent.</p>
          
          <NewsletterForm />
        </div>
      </section>

      {/* Take the Quiz CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-lilac/30 rounded-2xl p-8 md:p-12 text-center">
          <span className="text-4xl mb-4 block">✨</span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-3">What's Your Creative Mood?</h2>
          <p className="text-pencil mb-6 max-w-md mx-auto">Take our playful quiz to discover your creative personality and get personalized workshop recommendations.</p>
          <Link to="/quiz" className="btn-press inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors">
            <Heart className="w-4 h-4" /> Take the Quiz
          </Link>
        </div>
      </section>
    </div>
  );
}

function NewsletterForm() {
  const { newsletter } = useAppContext();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newsletter.subscribe(email);
  };

  if (newsletter.status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-mint-dark">
        <p className="font-medium text-ink">✓ Thanks for signing up!</p>
        <p className="text-sm text-pencil mt-1">This is a local demo. No email was actually sent.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
        className="flex-1 px-4 py-2.5 rounded-full border border-ink/10 bg-cream text-sm focus:outline-none focus:border-berry" />
      <button type="submit" disabled={newsletter.status === 'loading'}
        className="btn-press px-6 py-2.5 bg-ink text-cream rounded-full text-sm font-medium hover:bg-ink/90 transition-colors disabled:opacity-50">
        {newsletter.status === 'loading' ? '...' : 'Subscribe'}
      </button>
      {newsletter.status === 'error' && <p className="text-xs text-berry w-full">Please enter a valid email address.</p>}
    </form>
  );
}
