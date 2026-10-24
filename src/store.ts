import { useState, useEffect, useCallback } from 'react';
import { SavedComposition, CanvasElement, Booking, QuizResult } from './data';

// Local storage helpers
const getStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch { return fallback; }
};

const setStorage = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

// Saved workshops
export function useSavedWorkshops() {
  const [saved, setSaved] = useState<string[]>(() => getStorage('lds_saved_workshops', []));
  useEffect(() => { setStorage('lds_saved_workshops', saved); }, [saved]);
  const toggle = useCallback((id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);
  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);
  const clearAll = useCallback(() => setSaved([]), []);
  return { saved, toggle, isSaved, clearAll };
}

// Saved compositions
export function useSavedCompositions() {
  const [compositions, setCompositions] = useState<SavedComposition[]>(() => getStorage('lds_compositions', []));
  useEffect(() => { setStorage('lds_compositions', compositions); }, [compositions]);
  const save = useCallback((comp: SavedComposition) => {
    setCompositions(prev => {
      const existing = prev.findIndex(c => c.id === comp.id);
      if (existing >= 0) { const next = [...prev]; next[existing] = comp; return next; }
      return [...prev, comp];
    });
  }, []);
  const remove = useCallback((id: string) => {
    setCompositions(prev => prev.filter(c => c.id !== id));
  }, []);
  const duplicate = useCallback((id: string) => {
    setCompositions(prev => {
      const comp = prev.find(c => c.id === id);
      if (!comp) return prev;
      const newComp = { ...comp, id: `comp_${Date.now()}`, name: `${comp.name} (copy)` };
      return [...prev, newComp];
    });
  }, []);
  const clearAll = useCallback(() => setCompositions([]), []);
  return { compositions, save, remove, duplicate, clearAll };
}

// Bookings
export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(() => getStorage('lds_bookings', []));
  useEffect(() => { setStorage('lds_bookings', bookings); }, [bookings]);
  const add = useCallback((booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  }, []);
  return { bookings, add };
}

// Saved palettes
export function useSavedPalettes() {
  const [palettes, setPalettes] = useState<string[][]>(() => getStorage('lds_palettes', []));
  useEffect(() => { setStorage('lds_palettes', palettes); }, [palettes]);
  const save = useCallback((colors: string[]) => {
    setPalettes(prev => [...prev, colors]);
  }, []);
  const remove = useCallback((index: number) => {
    setPalettes(prev => prev.filter((_, i) => i !== index));
  }, []);
  return { palettes, save, remove };
}

// Quiz result
export function useQuizResult() {
  const [result, setResult] = useState<QuizResult | null>(() => getStorage('lds_quiz_result', null));
  useEffect(() => { setStorage('lds_quiz_result', result); }, [result]);
  const clear = useCallback(() => setResult(null), []);
  return { result, setResult, clear };
}

// Canvas state
export interface CanvasState {
  elements: CanvasElement[];
  background: string;
  palette: string[];
}

export function useCanvasState() {
  const [state, setState] = useState<CanvasState>(() => getStorage('lds_canvas', {
    elements: [],
    background: '#FFF8ED',
    palette: ['#FFC6AD', '#DCCBFF', '#C9E8D3', '#FFE58F'],
  }));
  useEffect(() => { setStorage('lds_canvas', state); }, [state]);
  const addElement = useCallback((el: CanvasElement) => {
    setState(prev => ({ ...prev, elements: [...prev.elements, el] }));
  }, []);
  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, ...updates } : el)
    }));
  }, []);
  const removeElement = useCallback((id: string) => {
    setState(prev => ({ ...prev, elements: prev.elements.filter(el => el.id !== id) }));
  }, []);
  const setBackground = useCallback((bg: string) => {
    setState(prev => ({ ...prev, background: bg }));
  }, []);
  const setPalette = useCallback((p: string[]) => {
    setState(prev => ({ ...prev, palette: p }));
  }, []);
  const reset = useCallback(() => {
    setState({ elements: [], background: '#FFF8ED', palette: ['#FFC6AD', '#DCCBFF', '#C9E8D3', '#FFE58F'] });
  }, []);
  const loadComposition = useCallback((comp: SavedComposition) => {
    setState({ elements: comp.elements, background: comp.background, palette: comp.palette });
  }, []);
  return { state, addElement, updateElement, removeElement, setBackground, setPalette, reset, loadComposition };
}

// Newsletter
export function useNewsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const subscribe = useCallback((email: string) => {
    if (!email || !email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    setTimeout(() => {
      setStorage('lds_newsletter', email);
      setStatus('success');
    }, 1000);
  }, []);
  const reset = useCallback(() => setStatus('idle'), []);
  return { status, subscribe, reset };
}
