import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, MapPin } from 'lucide-react';
import { workshops, categories } from '../data';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const filteredWorkshops = useMemo(() => {
    let ws = workshops.filter(w => {
      const d = new Date(w.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
    if (categoryFilter) ws = ws.filter(w => w.category === categoryFilter);
    return ws.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [month, year, categoryFilter]);

  const workshopsByDate = useMemo(() => {
    const map: Record<string, typeof workshops> = {};
    filteredWorkshops.forEach(w => {
      const day = new Date(w.date).getDate().toString();
      if (!map[day]) map[day] = [];
      map[day].push(w);
    });
    return map;
  }, [filteredWorkshops]);

  const selectedWorkshops = selectedDate ? (workshopsByDate[selectedDate] || []) : [];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const nextWorkshop = workshops.filter(w => new Date(w.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="handwritten text-xl text-berry mb-1">plan ahead</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">Workshop Calendar</h1>
      </div>

      {/* Next upcoming shortcut */}
      {nextWorkshop && (
        <div className="paper-card p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">{nextWorkshop.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-pencil">Next workshop</p>
            <Link to={`/workshops/${nextWorkshop.id}`} className="font-medium text-sm hover:text-berry">{nextWorkshop.title}</Link>
            <p className="text-xs text-pencil">{new Date(nextWorkshop.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {nextWorkshop.time}</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="btn-press p-2 rounded-full hover:bg-ink/5"><ChevronLeft className="w-5 h-5" /></button>
          <h2 className="font-[family-name:var(--font-display)] text-xl min-w-[180px] text-center">{monthName}</h2>
          <button onClick={nextMonth} className="btn-press p-2 rounded-full hover:bg-ink/5"><ChevronRight className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center gap-2">
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-ink/10 text-sm bg-cream">
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
          </select>
          <div className="flex rounded-lg border border-ink/10 overflow-hidden">
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 text-xs font-medium ${view === 'calendar' ? 'bg-ink text-cream' : 'bg-cream'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-xs font-medium ${view === 'list' ? 'bg-ink text-cream' : 'bg-cream'}`}>List</button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar / List */}
        <div className="lg:col-span-2">
          {view === 'calendar' ? (
            <div className="paper-card p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-xs font-medium text-pencil py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                  const hasWorkshops = day && workshopsByDate[day.toString()];
                  const isSelected = selectedDate === day?.toString();
                  return (
                    <button key={i} onClick={() => day && setSelectedDate(day.toString())}
                      className={`aspect-square rounded-lg text-sm flex flex-col items-center justify-center relative transition-colors
                        ${!day ? '' : isSelected ? 'bg-ink text-cream' : hasWorkshops ? 'bg-butter/30 hover:bg-butter/50' : 'hover:bg-ink/5'}`}>
                      {day && <span>{day}</span>}
                      {hasWorkshops && !isSelected && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-berry" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredWorkshops.length === 0 ? (
                <div className="text-center py-12 text-pencil">
                  <CalIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No workshops this month.</p>
                </div>
              ) : (
                filteredWorkshops.map(w => (
                  <Link key={w.id} to={`/workshops/${w.id}`} className="block paper-card p-3 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: w.color + '40' }}>{w.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{w.title}</p>
                        <p className="text-xs text-pencil">{new Date(w.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {w.time}</p>
                      </div>
                      <span className="text-sm font-medium">${w.price}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Selected date details */}
        <div>
          <div className="paper-card p-4 sticky top-20">
            <h3 className="font-medium mb-3">
              {selectedDate ? `Workshops on ${selectedDate}` : 'Select a date'}
            </h3>
            {selectedDate && selectedWorkshops.length === 0 && (
              <p className="text-sm text-pencil">No workshops scheduled for this day.</p>
            )}
            {selectedWorkshops.map(w => (
              <motion.div key={w.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                <Link to={`/workshops/${w.id}`} className="block p-3 rounded-lg hover:bg-ink/5 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{w.emoji}</span>
                    <span className="font-medium text-sm">{w.title}</span>
                  </div>
                  <div className="space-y-0.5 text-xs text-pencil ml-7">
                    <p className="flex items-center gap-1"><Clock className="w-3 h-3" />{w.time} · {w.duration}</p>
                    <p className="flex items-center gap-1"><MapPin className="w-3 h-3" />{w.location}</p>
                    <p>{w.instructor} · ${w.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
            {!selectedDate && (
              <p className="text-sm text-pencil">Click a date to see scheduled workshops.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
