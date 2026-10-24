import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Shapes, Image, Sparkles, Save, Trash2, RotateCcw, Copy, Download, Plus, X } from 'lucide-react';
import { palettes, stickerLibrary, backgrounds, creativePrompts, CanvasElement } from '../data';
import { useAppContext } from '../App';

export default function InspirationRoom() {
  const { canvas, compositions } = useAppContext();
  const { state, addElement, updateElement, removeElement, setBackground, setPalette, reset, loadComposition } = canvas;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'palette' | 'stickers' | 'background' | 'prompt' | 'save'>('palette');
  const [prompt, setPrompt] = useState('');
  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; elX: number; elY: number } | null>(null);

  // Generate creative prompt
  const generatePrompt = () => {
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    const activity = pick(creativePrompts.activities);
    const mood = pick(creativePrompts.moods);
    const material = pick(creativePrompts.materials);
    const theme = pick(creativePrompts.themes);
    setPrompt(`Create a ${mood} ${activity} using ${material}, inspired by "${theme}".`);
  };

  // Add sticker to canvas
  const addSticker = (sticker: typeof stickerLibrary[0]) => {
    const el: CanvasElement = {
      id: `el_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      type: 'sticker',
      content: sticker.content,
      x: 50 + Math.random() * 200,
      y: 50 + Math.random() * 200,
      rotation: Math.random() * 30 - 15,
      scale: 1,
      color: state.palette[0] || '#40332F',
      zIndex: state.elements.length,
    };
    addElement(el);
    setSelectedId(el.id);
  };

  // Drag handling
  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    e.preventDefault();
    const el = state.elements.find(el => el.id === id);
    if (!el) return;
    setSelectedId(id);
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, elX: el.x, elY: el.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    updateElement(dragRef.current.id, { x: dragRef.current.elX + dx, y: dragRef.current.elY + dy });
  };

  const handlePointerUp = () => { dragRef.current = null; };

  // Save composition
  const handleSave = () => {
    if (!saveName.trim()) return;
    compositions.save({
      id: `comp_${Date.now()}`,
      name: saveName,
      elements: state.elements,
      background: state.background,
      palette: state.palette,
      createdAt: new Date().toISOString(),
    });
    setShowSaveDialog(false);
    setSaveName('');
  };

  // Copy palette to clipboard
  const copyPalette = () => {
    navigator.clipboard.writeText(state.palette.join(', ')).catch(() => {});
  };

  const selectedEl = state.elements.find(el => el.id === selectedId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="handwritten text-xl text-berry mb-1">create</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">Inspiration Room</h1>
        <p className="text-pencil mt-1 text-sm">Build color palettes, arrange stickers, and create compositions.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Canvas */}
        <div className="lg:col-span-3">
          <div ref={canvasRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl border border-ink/10 overflow-hidden select-none"
            style={{ backgroundColor: state.background }}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={() => setSelectedId(null)}>
            
            {/* Grid dots for reference */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #40332F 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* Canvas elements */}
            {state.elements.map(el => (
              <div key={el.id}
                className={`canvas-element ${selectedId === el.id ? 'selected' : ''}`}
                style={{
                  left: el.x, top: el.y,
                  transform: `rotate(${el.rotation}deg) scale(${el.scale})`,
                  zIndex: el.zIndex,
                  color: el.color,
                  fontSize: '2rem',
                  lineHeight: 1,
                }}
                onPointerDown={e => handlePointerDown(e, el.id)}
                onClick={e => { e.stopPropagation(); setSelectedId(el.id); }}>
                {el.content}
              </div>
            ))}

            {/* Empty state */}
            {state.elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-pencil/40">
                <div className="text-center">
                  <Shapes className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm">Add stickers from the panel →</p>
                </div>
              </div>
            )}
          </div>

          {/* Canvas controls */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={() => setShowSaveDialog(true)} className="btn-press flex items-center gap-1 px-3 py-1.5 rounded-full border border-ink/10 text-xs font-medium hover:bg-ink/5">
              <Save className="w-3 h-3" /> Save
            </button>
            <button onClick={() => setShowLoadDialog(true)} className="btn-press flex items-center gap-1 px-3 py-1.5 rounded-full border border-ink/10 text-xs font-medium hover:bg-ink/5">
              <Download className="w-3 h-3" /> Load
            </button>
            <button onClick={reset} className="btn-press flex items-center gap-1 px-3 py-1.5 rounded-full border border-ink/10 text-xs font-medium hover:bg-ink/5">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            {selectedEl && (
              <button onClick={() => { removeElement(selectedEl.id); setSelectedId(null); }}
                className="btn-press flex items-center gap-1 px-3 py-1.5 rounded-full border border-berry/30 text-xs font-medium text-berry hover:bg-berry/5">
                <Trash2 className="w-3 h-3" /> Remove Selected
              </button>
            )}
          </div>
        </div>

        {/* Tools panel */}
        <div className="lg:col-span-1">
          {/* Tool tabs */}
          <div className="flex lg:flex-col gap-1 mb-3 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'palette' as const, icon: Palette, label: 'Colors' },
              { id: 'stickers' as const, icon: Shapes, label: 'Stickers' },
              { id: 'background' as const, icon: Image, label: 'Background' },
              { id: 'prompt' as const, icon: Sparkles, label: 'Prompt' },
              { id: 'save' as const, icon: Save, label: 'Saved' },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTool(t.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors
                  ${activeTool === t.id ? 'bg-ink text-cream' : 'text-pencil hover:bg-ink/5'}`}>
                <t.icon className="w-4 h-4" /> <span className="hidden lg:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Tool content */}
          <div className="paper-card p-3 max-h-[500px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTool === 'palette' && (
                <motion.div key="palette" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xs font-medium mb-2">Palette Presets</h3>
                  <div className="space-y-2 mb-4">
                    {palettes.map(p => (
                      <button key={p.id} onClick={() => setPalette(p.colors)}
                        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-ink/5 text-left">
                        <div className="flex gap-0.5">
                          {p.colors.map((c, i) => <div key={i} className="w-4 h-4 rounded-full border border-ink/10" style={{ backgroundColor: c }} />)}
                        </div>
                        <span className="text-xs">{p.name}</span>
                      </button>
                    ))}
                  </div>
                  <h3 className="text-xs font-medium mb-2">Current Palette</h3>
                  <div className="flex gap-1 mb-2">
                    {state.palette.map((c, i) => (
                      <div key={i} className="relative group">
                        <div className="w-8 h-8 rounded-lg border border-ink/10" style={{ backgroundColor: c }} />
                        <input type="color" value={c} onChange={e => {
                          const newP = [...state.palette]; newP[i] = e.target.value; setPalette(newP);
                        }} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setPalette([...state.palette, '#40332F'])} className="p-1 rounded hover:bg-ink/5"><Plus className="w-3 h-3" /></button>
                    {state.palette.length > 1 && (
                      <button onClick={() => setPalette(state.palette.slice(0, -1))} className="p-1 rounded hover:bg-ink/5"><X className="w-3 h-3" /></button>
                    )}
                    <button onClick={copyPalette} className="p-1 rounded hover:bg-ink/5"><Copy className="w-3 h-3" /></button>
                  </div>
                </motion.div>
              )}

              {activeTool === 'stickers' && (
                <motion.div key="stickers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xs font-medium mb-2">Add to Canvas</h3>
                  <div className="grid grid-cols-4 gap-1">
                    {stickerLibrary.map(s => (
                      <button key={s.id} onClick={() => addSticker(s)} title={s.label}
                        className="aspect-square flex items-center justify-center text-xl rounded-lg hover:bg-ink/5 transition-colors">
                        {s.content}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-pencil mt-2">Click to add. Drag to move on canvas.</p>
                </motion.div>
              )}

              {activeTool === 'background' && (
                <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xs font-medium mb-2">Canvas Background</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {backgrounds.map(bg => (
                      <button key={bg.id} onClick={() => setBackground(bg.value)}
                        className={`aspect-square rounded-lg border-2 transition-all ${state.background === bg.value ? 'border-berry' : 'border-ink/10'}`}
                        style={{ backgroundColor: bg.value }} title={bg.name}>
                        <span className="text-[8px] text-ink/50">{bg.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTool === 'prompt' && (
                <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xs font-medium mb-2">Creative Prompt</h3>
                  <button onClick={generatePrompt}
                    className="w-full py-2 px-3 rounded-lg bg-butter/30 text-sm font-medium hover:bg-butter/50 transition-colors mb-3">
                    ✨ Generate Prompt
                  </button>
                  {prompt && (
                    <div className="paper-card p-3">
                      <p className="text-sm italic text-ink">{prompt}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-pencil mt-2">Get inspired with random creative challenges.</p>
                </motion.div>
              )}

              {activeTool === 'save' && (
                <motion.div key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xs font-medium mb-2">Saved Compositions</h3>
                  {compositions.compositions.length === 0 ? (
                    <p className="text-xs text-pencil">No saved compositions yet. Create something and save it!</p>
                  ) : (
                    <div className="space-y-2">
                      {compositions.compositions.map(c => (
                        <div key={c.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-ink/5">
                          <div className="flex gap-0.5">
                            {c.palette.slice(0, 3).map((col, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: col }} />)}
                          </div>
                          <span className="text-xs flex-1 truncate">{c.name}</span>
                          <button onClick={() => loadComposition(c)} className="p-1 rounded hover:bg-ink/10 text-xs">Load</button>
                          <button onClick={() => compositions.remove(c.id)} className="p-1 rounded hover:bg-berry/10 text-berry"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Selected element controls */}
          {selectedEl && (
            <div className="paper-card p-3 mt-3">
              <h3 className="text-xs font-medium mb-2">Selected Element</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-pencil">Rotation: {selectedEl.rotation.toFixed(0)}°</label>
                  <input type="range" min="-180" max="180" value={selectedEl.rotation}
                    onChange={e => updateElement(selectedEl.id, { rotation: Number(e.target.value) })}
                    className="w-full h-1 rounded-full appearance-none bg-ink/10" />
                </div>
                <div>
                  <label className="text-[10px] text-pencil">Size: {selectedEl.scale.toFixed(1)}x</label>
                  <input type="range" min="0.5" max="3" step="0.1" value={selectedEl.scale}
                    onChange={e => updateElement(selectedEl.id, { scale: Number(e.target.value) })}
                    className="w-full h-1 rounded-full appearance-none bg-ink/10" />
                </div>
                <div>
                  <label className="text-[10px] text-pencil">Color</label>
                  <input type="color" value={selectedEl.color}
                    onChange={e => updateElement(selectedEl.id, { color: e.target.value })}
                    className="w-8 h-6 rounded border border-ink/10" />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => updateElement(selectedEl.id, { zIndex: selectedEl.zIndex + 1 })} className="text-[10px] px-2 py-1 rounded bg-ink/5">↑ Forward</button>
                  <button onClick={() => updateElement(selectedEl.id, { zIndex: Math.max(0, selectedEl.zIndex - 1) })} className="text-[10px] px-2 py-1 rounded bg-ink/5">↓ Back</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Dialog */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 backdrop-blur-sm p-4"
            onClick={() => setShowSaveDialog(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="paper-card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <h3 className="font-medium mb-3">Save Composition</h3>
              <input type="text" value={saveName} onChange={e => setSaveName(e.target.value)} placeholder="Give it a name..."
                className="w-full px-3 py-2 rounded-lg border border-ink/10 text-sm mb-3 focus:outline-none focus:border-berry" autoFocus />
              <div className="flex gap-2">
                <button onClick={() => setShowSaveDialog(false)} className="flex-1 py-2 border border-ink/10 rounded-full text-sm">Cancel</button>
                <button onClick={handleSave} disabled={!saveName.trim()} className="flex-1 py-2 bg-ink text-cream rounded-full text-sm disabled:opacity-50">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load Dialog */}
      <AnimatePresence>
        {showLoadDialog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 backdrop-blur-sm p-4"
            onClick={() => setShowLoadDialog(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="paper-card p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <h3 className="font-medium mb-3">Load Composition</h3>
              {compositions.compositions.length === 0 ? (
                <p className="text-sm text-pencil">No saved compositions yet.</p>
              ) : (
                <div className="space-y-2">
                  {compositions.compositions.map(c => (
                    <button key={c.id} onClick={() => { loadComposition(c); setShowLoadDialog(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-ink/5 text-left">
                      <div className="flex gap-0.5">
                        {c.palette.slice(0, 4).map((col, i) => <div key={i} className="w-4 h-4 rounded-full border border-ink/10" style={{ backgroundColor: col }} />)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-[10px] text-pencil">{c.elements.length} elements · {new Date(c.createdAt).toLocaleDateString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <button onClick={() => setShowLoadDialog(false)} className="w-full mt-3 py-2 border border-ink/10 rounded-full text-sm">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
