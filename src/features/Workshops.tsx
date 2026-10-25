import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Heart, Calendar, MapPin, Clock, Users, ChevronLeft } from 'lucide-react';
import { workshops, categories, instructors, Workshop, Category } from '../data';
import { useAppContext } from '../App';

interface Props { selectedWorkshop?: Workshop; }

export default function WorkshopsPage({ selectedWorkshop }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>(searchParams.get('category') || '');
  const [skill, setSkill] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...workshops];
    if (search) result = result.filter(w => w.title.toLowerCase().includes(search.toLowerCase()) || w.instructor.toLowerCase().includes(search.toLowerCase()));
    if (category) result = result.filter(w => w.category === category);
    if (skill) result = result.filter(w => w.skillLevel === skill);
    result.sort((a, b) => sortBy === 'date' ? new Date(a.date).getTime() - new Date(b.date).getTime() : a.price - b.price);
    return result;
  }, [search, category, skill, sortBy]);

  const clearFilters = () => { setSearch(''); setCategory(''); setSkill(''); };
  const hasFilters = search || category || skill;

  if (selectedWorkshop) return <WorkshopDetail workshop={selectedWorkshop} onBack={() => window.history.back()} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="handwritten text-xl text-berry mb-1">discover</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">Workshops</h1>
        <p className="text-pencil mt-2">Find your next creative experience from {workshops.length} upcoming workshops.</p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pencil" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workshops..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/10 bg-paper text-sm focus:outline-none focus:border-berry" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`btn-press px-4 py-2.5 rounded-full border text-sm font-medium transition-colors ${showFilters ? 'bg-ink text-cream border-ink' : 'border-ink/10 text-ink hover:bg-ink/5'}`}>
            <Filter className="w-4 h-4 inline mr-1" /> Filters
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="paper-card p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-pencil mb-1 block">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => setCategory('')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!category ? 'bg-ink text-cream' : 'bg-ink/5 text-ink hover:bg-ink/10'}`}>All</button>
                    {categories.map(c => (
                      <button key={c.id} onClick={() => setCategory(c.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === c.id ? 'bg-ink text-cream' : 'bg-ink/5 text-ink hover:bg-ink/10'}`}>
                        {c.emoji} {c.name.split('&')[0].trim()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <label className="text-xs font-medium text-pencil mb-1 block">Skill Level</label>
                    <select value={skill} onChange={e => setSkill(e.target.value)} className="px-3 py-1.5 rounded-lg border border-ink/10 text-sm bg-cream">
                      <option value="">All levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="all-levels">All Levels</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-pencil mb-1 block">Sort by</label>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value as 'date' | 'price')} className="px-3 py-1.5 rounded-lg border border-ink/10 text-sm bg-cream">
                      <option value="date">Date</option>
                      <option value="price">Price</option>
                    </select>
                  </div>
                </div>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-berry font-medium hover:underline">Clear all filters</button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-lg font-medium mb-1">No workshops found</p>
          <p className="text-sm text-pencil">Try adjusting your filters or search terms.</p>
          {hasFilters && <button onClick={clearFilters} className="mt-3 text-sm text-berry font-medium hover:underline">Clear filters</button>}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Featured workshop */}
          {filtered.length > 0 && !hasFilters && (
            <FeaturedWorkshop workshop={filtered[0]} />
          )}
          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(hasFilters ? filtered : filtered.slice(1)).map((w, i) => (
              <WorkshopCard key={w.id} workshop={w} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturedWorkshop({ workshop }: { workshop: Workshop }) {
  const { savedWorkshops } = useAppContext();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Link to={`/workshops/${workshop.id}`} className="block paper-card p-6 hover:shadow-md transition-all group">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-36 rounded-lg flex items-center justify-center text-5xl shrink-0" style={{ backgroundColor: workshop.color + '40' }}>
            {workshop.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-ink/5 text-ink/70 mb-2 inline-block">Featured</span>
                <h3 className="font-[family-name:var(--font-display)] text-xl mb-1">{workshop.title}</h3>
              </div>
              <button onClick={(e) => { e.preventDefault(); savedWorkshops.toggle(workshop.id); }}
                className="p-2 rounded-full hover:bg-ink/5" aria-label="Save workshop">
                <Heart className={`w-5 h-5 ${savedWorkshops.isSaved(workshop.id) ? 'text-berry fill-berry' : 'text-pencil'}`} />
              </button>
            </div>
            <p className="text-sm text-pencil mb-3">{workshop.description}</p>
            <div className="flex flex-wrap gap-3 text-xs text-pencil">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(workshop.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{workshop.time} · {workshop.duration}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{workshop.location}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{workshop.spotsLeft} spots left</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-[family-name:var(--font-display)]">${workshop.price}</p>
            <p className="text-xs text-pencil">{workshop.skillLevel}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function WorkshopCard({ workshop, index }: { workshop: Workshop; index: number }) {
  const { savedWorkshops } = useAppContext();
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Link to={`/workshops/${workshop.id}`} className="block paper-card paper-card-hover p-4 transition-all h-full">
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: workshop.color + '40' }}>
            {workshop.emoji}
          </div>
          <button onClick={(e) => { e.preventDefault(); savedWorkshops.toggle(workshop.id); }}
            className="p-1.5 rounded-full hover:bg-ink/5" aria-label="Save workshop">
            <Heart className={`w-4 h-4 ${savedWorkshops.isSaved(workshop.id) ? 'text-berry fill-berry' : 'text-pencil'}`} />
          </button>
        </div>
        <h3 className="font-medium text-sm mb-1 leading-tight">{workshop.title}</h3>
        <p className="text-xs text-pencil mb-2">{workshop.instructor}</p>
        <div className="flex items-center gap-2 text-xs text-pencil mb-2">
          <Calendar className="w-3 h-3" />
          <span>{new Date(workshop.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {workshop.time}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-ink/5">
          <span className="text-xs px-2 py-0.5 rounded-full bg-ink/5">{workshop.skillLevel}</span>
          <span className="text-sm font-medium">${workshop.price}</span>
        </div>
      </Link>
    </motion.div>
  );
}

// Workshop Detail & Booking
function WorkshopDetail({ workshop, onBack }: { workshop: Workshop; onBack: () => void }) {
  const [bookingStep, setBookingStep] = useState(0); // 0=detail, 1-4=booking
  const [attendees, setAttendees] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);
  const { savedWorkshops, bookings } = useAppContext();
  const instructor = instructors.find(i => i.name === workshop.instructor);
  const related = workshops.filter(w => w.category === workshop.category && w.id !== workshop.id).slice(0, 3);

  const handleBooking = () => {
    const booking = { id: `b_${Date.now()}`, workshopId: workshop.id, attendees, name, email, total: workshop.price * attendees, createdAt: new Date().toISOString() };
    bookings.add(booking);
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="paper-card p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl mb-2">Booking Confirmed!</h2>
          <p className="text-sm text-pencil mb-6">This is a local demo booking. No real reservation has been made.</p>
          <div className="text-left paper-card p-4 mb-6">
            <h3 className="font-medium mb-2">{workshop.title}</h3>
            <div className="space-y-1 text-sm text-pencil">
              <p>Date: {new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <p>Time: {workshop.time} · {workshop.duration}</p>
              <p>Attendees: {attendees}</p>
              <p>Name: {name}</p>
              <p className="font-medium text-ink">Total: ${workshop.price * attendees}</p>
            </div>
          </div>
          <button onClick={onBack} className="btn-press px-6 py-2.5 bg-ink text-cream rounded-full text-sm font-medium">Browse More Workshops</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-pencil hover:text-ink mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to workshops
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="w-full h-48 md:h-64 rounded-xl flex items-center justify-center text-6xl mb-4" style={{ backgroundColor: workshop.color + '30' }}>
              {workshop.emoji}
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full mb-2 inline-block" style={{ backgroundColor: workshop.color + '40' }}>
                  {categories.find(c => c.id === workshop.category)?.name}
                </span>
                <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">{workshop.title}</h1>
              </div>
              <button onClick={() => savedWorkshops.toggle(workshop.id)} className="p-2 rounded-full hover:bg-ink/5 shrink-0" aria-label="Save">
                <Heart className={`w-6 h-6 ${savedWorkshops.isSaved(workshop.id) ? 'text-berry fill-berry' : 'text-pencil'}`} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-pencil leading-relaxed">{workshop.longDescription}</p>
          </div>

          {/* Instructor */}
          {instructor && (
            <div className="paper-card p-4 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: instructor.color + '40' }}>
                {instructor.emoji}
              </div>
              <div>
                <p className="font-medium text-sm">Taught by {instructor.name}</p>
                <p className="text-xs text-pencil">{instructor.specialty}</p>
              </div>
            </div>
          )}

          {/* Materials */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Materials Provided</h3>
            <div className="flex flex-wrap gap-2">
              {workshop.materials.map((m, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-ink/5">{m}</span>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Related Workshops</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {related.map(w => (
                  <Link key={w.id} to={`/workshops/${w.id}`} className="paper-card p-3 hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded flex items-center justify-center text-sm mb-2" style={{ backgroundColor: w.color + '40' }}>{w.emoji}</div>
                    <p className="text-xs font-medium leading-tight">{w.title}</p>
                    <p className="text-[10px] text-pencil mt-1">{new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking sidebar */}
        <div className="lg:col-span-1">
          <div className="paper-card p-5 sticky top-20">
            {bookingStep === 0 && (
              <div>
                <div className="mb-4">
                  <p className="text-3xl font-[family-name:var(--font-display)]">${workshop.price}</p>
                  <p className="text-xs text-pencil">per person</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-pencil"><Calendar className="w-4 h-4" />{new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  <div className="flex items-center gap-2 text-pencil"><Clock className="w-4 h-4" />{workshop.time} · {workshop.duration}</div>
                  <div className="flex items-center gap-2 text-pencil"><MapPin className="w-4 h-4" />{workshop.location}</div>
                  <div className="flex items-center gap-2 text-pencil"><Users className="w-4 h-4" />{workshop.spotsLeft} spots remaining</div>
                </div>
                <div className="mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${workshop.skillLevel === 'beginner' ? 'bg-mint/40' : workshop.skillLevel === 'intermediate' ? 'bg-butter/40' : 'bg-sky/40'}`}>{workshop.skillLevel}</span>
                </div>
                <button onClick={() => setBookingStep(1)} className="btn-press w-full py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors">
                  Book This Workshop
                </button>
                <p className="text-[10px] text-center text-pencil mt-2">Demo booking — no real reservation</p>
              </div>
            )}

            {bookingStep === 1 && (
              <div>
                <h3 className="font-medium mb-3">Choose Attendance</h3>
                <div className="mb-4">
                  <label className="text-xs text-pencil mb-1 block">Number of attendees</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAttendees(Math.max(1, attendees - 1))} className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink/5">-</button>
                    <span className="text-lg font-medium w-8 text-center">{attendees}</span>
                    <button onClick={() => setAttendees(Math.min(workshop.spotsLeft, attendees + 1))} className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink/5">+</button>
                  </div>
                </div>
                <p className="text-sm text-pencil mb-4">Total: <span className="font-medium text-ink">${workshop.price * attendees}</span></p>
                <div className="flex gap-2">
                  <button onClick={() => setBookingStep(0)} className="flex-1 py-2.5 border border-ink/10 rounded-full text-sm font-medium">Back</button>
                  <button onClick={() => setBookingStep(2)} className="flex-1 py-2.5 bg-ink text-cream rounded-full text-sm font-medium">Continue</button>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div>
                <h3 className="font-medium mb-3">Your Information</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs text-pencil mb-1 block">Name *</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required
                      className="w-full px-3 py-2 rounded-lg border border-ink/10 text-sm bg-cream focus:outline-none focus:border-berry" />
                  </div>
                  <div>
                    <label className="text-xs text-pencil mb-1 block">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      className="w-full px-3 py-2 rounded-lg border border-ink/10 text-sm bg-cream focus:outline-none focus:border-berry" />
                  </div>
                </div>
                {(!name || !email) && <p className="text-xs text-berry mb-2">Please fill in all fields.</p>}
                <div className="flex gap-2">
                  <button onClick={() => setBookingStep(1)} className="flex-1 py-2.5 border border-ink/10 rounded-full text-sm font-medium">Back</button>
                  <button onClick={() => name && email && setBookingStep(3)} disabled={!name || !email}
                    className="flex-1 py-2.5 bg-ink text-cream rounded-full text-sm font-medium disabled:opacity-50">Review</button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <h3 className="font-medium mb-3">Review Booking</h3>
                <div className="paper-card p-3 mb-4 text-sm space-y-1">
                  <p className="font-medium">{workshop.title}</p>
                  <p className="text-pencil">{new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · {workshop.time}</p>
                  <p className="text-pencil">Attendees: {attendees}</p>
                  <p className="text-pencil">Name: {name}</p>
                  <p className="text-pencil">Email: {email}</p>
                  <p className="font-medium text-ink pt-2 border-t border-ink/5">Total: ${workshop.price * attendees}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setBookingStep(2)} className="flex-1 py-2.5 border border-ink/10 rounded-full text-sm font-medium">Back</button>
                  <button onClick={handleBooking} className="flex-1 py-2.5 bg-berry text-white rounded-full text-sm font-medium">Confirm</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
