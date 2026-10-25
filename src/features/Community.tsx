import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { instructors, workshops } from '../data';

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="handwritten text-xl text-berry mb-1">our people</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">The Community Studio</h1>
        <p className="text-pencil mt-2 max-w-xl">Meet the instructors and creatives who make Little Day Studio a warm, inclusive space for exploration and making.</p>
      </div>

      {/* Values */}
      <div className="paper-card p-6 md:p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-3 right-3 text-3xl opacity-20">♡</div>
        <h2 className="font-[family-name:var(--font-display)] text-xl mb-4">Our Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🌱', title: 'Growth', desc: 'Everyone starts somewhere. We honor the beginner\'s mind.' },
            { emoji: '🤝', title: 'Inclusion', desc: 'Creative spaces should welcome all backgrounds and abilities.' },
            { emoji: '✨', title: 'Wonder', desc: 'We believe in the magic of making things with your hands.' },
            { emoji: '🌿', title: 'Sustainability', desc: 'Mindful materials, mindful practices, mindful community.' },
          ].map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <span className="text-2xl block mb-2">{v.emoji}</span>
              <h3 className="font-medium text-sm mb-1">{v.title}</h3>
              <p className="text-xs text-pencil">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instructors */}
      <h2 className="font-[family-name:var(--font-display)] text-2xl mb-6">Our Instructors</h2>
      <div className="space-y-6 mb-12">
        {instructors.map((inst, i) => {
          const instWorkshops = workshops.filter(w => inst.workshops.includes(w.id));
          return (
            <motion.div key={inst.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="paper-card p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Portrait */}
                  <div className="shrink-0">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto md:mx-0" style={{ backgroundColor: inst.color + '30' }}>
                      {inst.emoji}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-display)] text-xl mb-1">{inst.name}</h3>
                    <p className="text-sm font-medium mb-2" style={{ color: inst.color }}>{inst.specialty}</p>
                    <p className="text-sm text-pencil leading-relaxed mb-4">{inst.bio}</p>
                    
                    {/* Their workshops */}
                    {instWorkshops.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-pencil mb-2">Upcoming workshops:</p>
                        <div className="flex flex-wrap gap-2">
                          {instWorkshops.map(w => (
                            <Link key={w.id} to={`/workshops/${w.id}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/5 text-xs font-medium hover:bg-ink/10 transition-colors">
                              <span>{w.emoji}</span> {w.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Community Gallery */}
      <h2 className="font-[family-name:var(--font-display)] text-2xl mb-6">Community Gallery</h2>
      <p className="text-sm text-pencil mb-4">Illustrative examples of the kind of creative work our community produces. These are fictional samples to showcase the range of activities at Little Day Studio.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { emoji: '🌸', bg: '#C9E8D3', label: 'Botanical watercolor' },
          { emoji: '🏺', bg: '#DCCBFF', label: 'Hand-built vessel' },
          { emoji: '📖', bg: '#FFE58F', label: 'Art journal spread' },
          { emoji: '🌿', bg: '#C9E8D3', label: 'Nature sketch' },
          { emoji: '📸', bg: '#B9DDF7', label: 'Golden hour photo' },
          { emoji: '✂️', bg: '#E98BAE', label: 'Collage poem' },
          { emoji: '🎨', bg: '#FFC6AD', label: 'Ink wash study' },
          { emoji: '📰', bg: '#FFE58F', label: 'Handmade zine' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <div className="paper-card p-4 text-center aspect-square flex flex-col items-center justify-center" style={{ backgroundColor: item.bg + '20' }}>
              <span className="text-4xl mb-2">{item.emoji}</span>
              <p className="text-[10px] text-pencil">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-[10px] text-pencil text-center italic">All gallery items are illustrative content representing the types of work created in our workshops.</p>
    </div>
  );
}
