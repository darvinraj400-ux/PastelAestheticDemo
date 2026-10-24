// ===== TYPES =====
export interface Workshop {
  id: string;
  title: string;
  category: Category;
  instructor: string;
  date: string; // ISO date
  time: string;
  duration: string;
  location: string;
  isOnline: boolean;
  price: number;
  skillLevel: 'beginner' | 'intermediate' | 'all-levels';
  materials: string[];
  capacity: number;
  spotsLeft: number;
  description: string;
  longDescription: string;
  color: string;
  emoji: string;
}

export type Category = 'illustration' | 'ceramics' | 'journaling' | 'botanical' | 'photography' | 'writing';

export interface Instructor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  workshops: string[];
  color: string;
  emoji: string;
}

export interface Palette {
  id: string;
  name: string;
  colors: string[];
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  workshops: string[];
  palette: string[];
  prompt: string;
  color: string;
  emoji: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  emoji: string;
  scores: Record<string, number>;
}

export interface CanvasElement {
  id: string;
  type: 'sticker' | 'shape' | 'text';
  content: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  zIndex: number;
}

export interface SavedComposition {
  id: string;
  name: string;
  elements: CanvasElement[];
  background: string;
  palette: string[];
  createdAt: string;
}

export interface Booking {
  id: string;
  workshopId: string;
  attendees: number;
  name: string;
  email: string;
  total: number;
  createdAt: string;
}

export interface QuizResult {
  type: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  recommendedWorkshops: string[];
}

// ===== DATA =====
export const categories: { id: Category; name: string; emoji: string; color: string }[] = [
  { id: 'illustration', name: 'Illustration & Drawing', emoji: '✏️', color: '#FFC6AD' },
  { id: 'ceramics', name: 'Ceramics & Clay', emoji: '🏺', color: '#DCCBFF' },
  { id: 'journaling', name: 'Journaling & Paper Crafts', emoji: '📔', color: '#FFE58F' },
  { id: 'botanical', name: 'Flowers & Botanical Art', emoji: '🌿', color: '#C9E8D3' },
  { id: 'photography', name: 'Photography & Visual Storytelling', emoji: '📷', color: '#B9DDF7' },
  { id: 'writing', name: 'Creative Writing & Mixed Media', emoji: '✍️', color: '#E98BAE' },
];

const futureDate = (daysFromNow: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
};

export const workshops: Workshop[] = [
  {
    id: 'w1', title: 'Watercolor Botanicals', category: 'illustration',
    instructor: 'Mira Chen', date: futureDate(3), time: '10:00 AM', duration: '3 hours',
    location: 'Studio A, Little Day', isOnline: false, price: 65, skillLevel: 'beginner',
    materials: ['Watercolor set', 'Brushes', 'Paper pad', 'Reference photos'],
    capacity: 12, spotsLeft: 5, color: '#C9E8D3', emoji: '🌸',
    description: 'Paint delicate botanical illustrations using wet-on-wet techniques.',
    longDescription: 'Learn to capture the beauty of flowers and foliage through watercolor. We\'ll explore wet-on-wet techniques, color mixing for natural greens and pinks, and composition principles for botanical art. Perfect for beginners who want to develop a gentle, observational practice.'
  },
  {
    id: 'w2', title: 'Hand-Built Ceramics', category: 'ceramics',
    instructor: 'Tomás Rivera', date: futureDate(5), time: '2:00 PM', duration: '4 hours',
    location: 'Clay Room, Little Day', isOnline: false, price: 85, skillLevel: 'all-levels',
    materials: ['Stoneware clay', 'Tools', 'Glazes', 'Apron'],
    capacity: 8, spotsLeft: 3, color: '#DCCBFF', emoji: '🏺',
    description: 'Shape your own vessel using pinch, coil, and slab techniques.',
    longDescription: 'Discover the meditative practice of hand-building with clay. You\'ll learn pinch pots, coil building, and slab construction while creating a unique vessel to take home after firing. No experience needed—just bring your curiosity and willingness to get your hands dirty.'
  },
  {
    id: 'w3', title: 'Art Journal Foundations', category: 'journaling',
    instructor: 'Lena Park', date: futureDate(7), time: '11:00 AM', duration: '2.5 hours',
    location: 'Studio B, Little Day', isOnline: false, price: 45, skillLevel: 'beginner',
    materials: ['Journal', 'Collage materials', 'Stamps', 'Inks'],
    capacity: 15, spotsLeft: 8, color: '#FFE58F', emoji: '📖',
    description: 'Start a daily creative journal practice with mixed-media techniques.',
    longDescription: 'Transform a blank journal into a living collection of thoughts, marks, and memories. We\'ll explore collage, stamping, simple drawing, and writing prompts to build a sustainable creative practice. Leave with a started journal and the confidence to keep filling it.'
  },
  {
    id: 'w4', title: 'Pressed Flower Frames', category: 'botanical',
    instructor: 'Sage Williams', date: futureDate(4), time: '1:00 PM', duration: '2 hours',
    location: 'Garden Studio, Little Day', isOnline: false, price: 55, skillLevel: 'beginner',
    materials: ['Pressed flowers', 'Frames', 'Tweezers', 'Adhesive'],
    capacity: 10, spotsLeft: 6, color: '#C9E8D3', emoji: '🌼',
    description: 'Create botanical art frames using pressed flowers and delicate arrangements.',
    longDescription: 'Learn the art of pressing and arranging flowers into beautiful framed compositions. We\'ll cover flower selection, pressing techniques, color theory for botanical arrangements, and how to create lasting displays. Take home a finished framed piece.'
  },
  {
    id: 'w5', title: 'Storytelling Through Lens', category: 'photography',
    instructor: 'Kai Nakamura', date: futureDate(6), time: '3:00 PM', duration: '3 hours',
    location: 'Online (Zoom)', isOnline: true, price: 50, skillLevel: 'intermediate',
    materials: ['Camera or smartphone', 'Notebook'],
    capacity: 20, spotsLeft: 12, color: '#B9DDF7', emoji: '📸',
    description: 'Learn to compose photographs that tell compelling visual stories.',
    longDescription: 'Move beyond snapshots and learn to create photographs with narrative depth. We\'ll explore composition, light, sequencing, and the art of the photo essay. Bring your camera or smartphone—great storytelling starts with seeing, not equipment.'
  },
  {
    id: 'w6', title: 'Poetry & Collage', category: 'writing',
    instructor: 'Amara Osei', date: futureDate(8), time: '6:00 PM', duration: '2.5 hours',
    location: 'Studio A, Little Day', isOnline: false, price: 48, skillLevel: 'all-levels',
    materials: ['Magazines', 'Scissors', 'Glue', 'Writing notebook', 'Pens'],
    capacity: 14, spotsLeft: 9, color: '#E98BAE', emoji: '✂️',
    description: 'Combine found text and images to create visual poetry.',
    longDescription: 'Where words meet images, new meanings emerge. In this workshop, you\'ll create collage poems using found text, vintage imagery, and your own writing. We\'ll explore erasure poetry, cut-up techniques, and visual composition. No poetry experience required.'
  },
  {
    id: 'w7', title: 'Ink & Wash Illustration', category: 'illustration',
    instructor: 'Mira Chen', date: futureDate(10), time: '10:00 AM', duration: '3 hours',
    location: 'Studio A, Little Day', isOnline: false, price: 60, skillLevel: 'intermediate',
    materials: ['India ink', 'Brushes', 'Pen nibs', 'Paper'],
    capacity: 12, spotsLeft: 7, color: '#FFC6AD', emoji: '🖌️',
    description: 'Explore the expressive range of ink through line, wash, and texture.',
    longDescription: 'Discover how a single color can create infinite depth. We\'ll work with India ink to explore confident line work, atmospheric washes, and textural effects. Topics include brush control, value studies, and combining pen and wash for rich illustrations.'
  },
  {
    id: 'w8', title: 'Wheel Throwing Intro', category: 'ceramics',
    instructor: 'Tomás Rivera', date: futureDate(12), time: '10:00 AM', duration: '3 hours',
    location: 'Clay Room, Little Day', isOnline: false, price: 75, skillLevel: 'beginner',
    materials: ['Clay', 'Tools', 'Apron', 'Sponge'],
    capacity: 6, spotsLeft: 2, color: '#DCCBFF', emoji: '🫙',
    description: 'Your first time at the potter\'s wheel—center, open, and pull.',
    longDescription: 'Experience the magic of the potter\'s wheel for the first time. Learn centering, opening, and pulling techniques while creating bowls and cups. This is a hands-on, messy, wonderful introduction to wheel throwing. All materials and firing included.'
  },
  {
    id: 'w9', title: 'Nature Journaling Walk', category: 'journaling',
    instructor: 'Sage Williams', date: futureDate(9), time: '9:00 AM', duration: '3 hours',
    location: 'Riverside Park (meet at entrance)', isOnline: false, price: 40, skillLevel: 'all-levels',
    materials: ['Sketchbook', 'Pencils', 'Watercolors', 'Magnifying glass'],
    capacity: 12, spotsLeft: 10, color: '#C9E8D3', emoji: '🍃',
    description: 'Combine a mindful nature walk with sketching and observation journaling.',
    longDescription: 'Slow down and notice the natural world around you. We\'ll take a gentle walk through the park, stopping to sketch plants, record observations, and collect natural materials. Back at our outdoor table, we\'ll create journal pages combining drawing, writing, and collected elements.'
  },
  {
    id: 'w10', title: 'Floral Watercolor Cards', category: 'botanical',
    instructor: 'Lena Park', date: futureDate(14), time: '2:00 PM', duration: '2 hours',
    location: 'Studio B, Little Day', isOnline: false, price: 50, skillLevel: 'beginner',
    materials: ['Watercolors', 'Card stock', 'Brushes', 'Flower references'],
    capacity: 15, spotsLeft: 11, color: '#FFE58F', emoji: '💐',
    description: 'Paint a set of hand-lettered floral greeting cards.',
    longDescription: 'Create a set of six beautiful botanical greeting cards using watercolor and simple lettering. We\'ll practice loose floral painting, color harmony, and basic hand-lettering. Perfect for anyone who wants to make heartfelt, handmade cards for special occasions.'
  },
  {
    id: 'w11', title: 'Zine Making Workshop', category: 'writing',
    instructor: 'Amara Osei', date: futureDate(11), time: '1:00 PM', duration: '3 hours',
    location: 'Studio A, Little Day', isOnline: false, price: 55, skillLevel: 'all-levels',
    materials: ['Paper', 'Xerox access', 'Stapler', 'Art supplies'],
    capacity: 12, spotsLeft: 8, color: '#E98BAE', emoji: '📰',
    description: 'Design, write, and produce your own mini zine from start to finish.',
    longDescription: 'Zines are small-batch, self-published works of passion. In this workshop, you\'ll plan, create, and reproduce your own mini-zine using collage, drawing, writing, and simple bookbinding. Leave with 20 copies of your unique creation.'
  },
  {
    id: 'w12', title: 'Golden Hour Photography', category: 'photography',
    instructor: 'Kai Nakamura', date: futureDate(13), time: '5:30 PM', duration: '2 hours',
    location: 'Outdoor location (TBD)', isOnline: false, price: 45, skillLevel: 'beginner',
    materials: ['Camera or smartphone', 'Comfortable shoes'],
    capacity: 10, spotsLeft: 7, color: '#B9DDF7', emoji: '🌅',
    description: 'Capture the magic of golden hour light in this outdoor photo walk.',
    longDescription: 'The golden hour—that magical window of warm, directional light—is a photographer\'s best friend. Join us for an outdoor walk where you\'ll learn to see and capture beautiful light. We\'ll cover exposure, composition, and working with natural light. Any camera welcome.'
  },
];

export const instructors: Instructor[] = [
  {
    id: 'i1', name: 'Mira Chen', specialty: 'Illustration & Watercolor',
    bio: 'Mira is an illustrator who finds poetry in everyday objects. Her work explores the quiet beauty of botanical forms, kitchen still-lifes, and morning light. She believes everyone can draw, and her teaching style is patient, encouraging, and full of small revelations.',
    workshops: ['w1', 'w7'], color: '#FFC6AD', emoji: '🎨'
  },
  {
    id: 'i2', name: 'Tomás Rivera', specialty: 'Ceramics & Clay',
    bio: 'Tomás has been working with clay for fifteen years, drawn to the way it holds memory in its surface. His pieces range from functional vessels to sculptural forms inspired by geological processes. In his workshops, he creates a relaxed, supportive environment where mistakes become discoveries.',
    workshops: ['w2', 'w8'], color: '#DCCBFF', emoji: '🏺'
  },
  {
    id: 'i3', name: 'Lena Park', specialty: 'Journaling & Mixed Media',
    bio: 'Lena is a paper artist and journal keeper who believes that a daily creative practice can transform how we experience the world. Her workshops combine simple techniques with meaningful prompts, helping people build sustainable habits of making and noticing.',
    workshops: ['w3', 'w10'], color: '#FFE58F', emoji: '📔'
  },
  {
    id: 'i4', name: 'Sage Williams', specialty: 'Botanical Art & Nature Journaling',
    bio: 'Sage is a naturalist and artist who bridges the gap between scientific observation and creative expression. Their workshops take place in studios, gardens, and parks—wherever nature offers its quiet lessons in pattern, color, and form.',
    workshops: ['w4', 'w9'], color: '#C9E8D3', emoji: '🌿'
  },
  {
    id: 'i5', name: 'Kai Nakamura', specialty: 'Photography & Visual Storytelling',
    bio: 'Kai is a documentary photographer who believes everyone has stories worth telling through images. Their teaching focuses on seeing—developing the observational skills and visual literacy that make photographs meaningful, regardless of equipment.',
    workshops: ['w5', 'w12'], color: '#B9DDF7', emoji: '📷'
  },
  {
    id: 'i6', name: 'Amara Osei', specialty: 'Creative Writing & Zines',
    bio: 'Amara is a writer, zine-maker, and collage artist who loves the intersection of words and images. Her workshops are playful, inclusive spaces where people experiment with language, found materials, and handmade books. She believes creativity thrives in community.',
    workshops: ['w6', 'w11'], color: '#E98BAE', emoji: '✍️'
  },
];

export const palettes: Palette[] = [
  { id: 'p1', name: 'Sunday Picnic', colors: ['#FFC6AD', '#C9E8D3', '#FFE58F', '#FFF8ED', '#E98BAE'] },
  { id: 'p2', name: 'Soft Morning', colors: ['#B9DDF7', '#DCCBFF', '#FFF8ED', '#FFC6AD', '#C9E8D3'] },
  { id: 'p3', name: 'Flower Market', colors: ['#E98BAE', '#FFC6AD', '#C9E8D3', '#FFE58F', '#DCCBFF'] },
  { id: 'p4', name: 'Blue Hour', colors: ['#B9DDF7', '#40332F', '#DCCBFF', '#887F79', '#FFF8ED'] },
  { id: 'p5', name: 'Citrus Sketchbook', colors: ['#FFE58F', '#FFC6AD', '#C9E8D3', '#40332F', '#FFF8ED'] },
  { id: 'p6', name: 'Quiet Garden', colors: ['#C9E8D3', '#887F79', '#FFF8ED', '#DCCBFF', '#B9DDF7'] },
  { id: 'p7', name: 'Candy Shop', colors: ['#E98BAE', '#DCCBFF', '#FFC6AD', '#FFE58F', '#B9DDF7'] },
  { id: 'p8', name: 'Autumn Paper', colors: ['#FFC6AD', '#FFE58F', '#40332F', '#887F79', '#C9E8D3'] },
];

export const collections: Collection[] = [
  {
    id: 'c1', name: 'Paper Garden', tagline: 'Botanical drawings, pressed flowers & delicate compositions',
    description: 'A collection inspired by the quiet beauty of the natural world. Explore botanical illustration, flower pressing, and the art of noticing small, growing things.',
    workshops: ['w1', 'w4', 'w9', 'w10'], palette: ['#C9E8D3', '#FFE58F', '#FFC6AD', '#FFF8ED'],
    prompt: 'Create a botanical collage using pressed-flower motifs and soft watercolor washes.',
    color: '#C9E8D3', emoji: '🌱'
  },
  {
    id: 'c2', name: 'Color Club', tagline: 'Bold palettes, playful painting & expressive art',
    description: 'For those who love color in all its glory. This collection celebrates bold combinations, expressive mark-making, and the joy of painting without rules.',
    workshops: ['w7', 'w6', 'w11'], palette: ['#E98BAE', '#DCCBFF', '#FFE58F', '#B9DDF7'],
    prompt: 'Make an abstract composition using only three bold colors and varied mark-making tools.',
    color: '#E98BAE', emoji: '🎨'
  },
  {
    id: 'c3', name: 'Slow Sundays', tagline: 'Journaling, mindful making & quiet creative routines',
    description: 'A collection for those who find creativity in stillness. Explore journaling, nature observation, and the gentle practice of making things slowly and with care.',
    workshops: ['w3', 'w9', 'w10'], palette: ['#FFE58F', '#C9E8D3', '#887F79', '#FFF8ED'],
    prompt: 'Fill a journal page with observations from your morning—what you saw, heard, and felt.',
    color: '#FFE58F', emoji: '☀️'
  },
  {
    id: 'c4', name: 'Tiny Worlds', tagline: 'Miniature crafts, small-scale models & imaginative storytelling',
    description: 'Small things, big imagination. This collection celebrates the art of making tiny—miniature worlds, detailed illustrations, and stories told in small formats.',
    workshops: ['w2', 'w8', 'w11', 'w5'], palette: ['#DCCBFF', '#B9DDF7', '#FFC6AD', '#FFF8ED'],
    prompt: 'Create a tiny scene inside a small container—a miniature world with its own story.',
    color: '#DCCBFF', emoji: '✨'
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1, question: 'Which palette speaks to you?',
    options: [
      { text: 'Warm earth tones and soft pinks', emoji: '🌸', scores: { collector: 2, maker: 1 } },
      { text: 'Muted greens and gentle grays', emoji: '🌿', scores: { maker: 2, noticer: 1 } },
      { text: 'Bold brights and unexpected combos', emoji: '🌈', scores: { explorer: 2, collector: 1 } },
      { text: 'Classic black, white, and one accent', emoji: '✒️', scores: { seeker: 2, maker: 1 } },
    ]
  },
  {
    id: 2, question: 'What material excites you most?',
    options: [
      { text: 'Clay that responds to my hands', emoji: '🏺', scores: { maker: 2, noticer: 1 } },
      { text: 'Watercolors that flow and blend', emoji: '🎨', scores: { collector: 2, explorer: 1 } },
      { text: 'Found objects and vintage paper', emoji: '📜', scores: { explorer: 2, seeker: 1 } },
      { text: 'A good pen and quality paper', emoji: '✍️', scores: { seeker: 2, collector: 1 } },
    ]
  },
  {
    id: 3, question: 'Your ideal creative space?',
    options: [
      { text: 'A sunny studio with plants everywhere', emoji: '🪴', scores: { noticer: 2, maker: 1 } },
      { text: 'A cozy corner with good music', emoji: '🎵', scores: { maker: 2, seeker: 1 } },
      { text: 'Outdoors, surrounded by nature', emoji: '🌳', scores: { noticer: 2, explorer: 1 } },
      { text: 'A lively shared workspace', emoji: '👥', scores: { social: 2, explorer: 1 } },
    ]
  },
  {
    id: 4, question: 'What draws you to a workshop?',
    options: [
      { text: 'Learning a specific new technique', emoji: '📐', scores: { seeker: 2, collector: 1 } },
      { text: 'Exploring without a fixed outcome', emoji: '🔮', scores: { explorer: 2, noticer: 1 } },
      { text: 'Making something beautiful to keep', emoji: '💝', scores: { collector: 2, maker: 1 } },
      { text: 'Meeting other creative people', emoji: '🤝', scores: { social: 2, explorer: 1 } },
    ]
  },
  {
    id: 5, question: 'How do you want to feel afterward?',
    options: [
      { text: 'Relaxed and restored', emoji: '🧘', scores: { maker: 2, noticer: 1 } },
      { text: 'Inspired and curious', emoji: '💡', scores: { explorer: 2, collector: 1 } },
      { text: 'Proud of something I made', emoji: '🏆', scores: { collector: 2, seeker: 1 } },
      { text: 'Connected to others', emoji: '❤️', scores: { social: 2, maker: 1 } },
    ]
  },
];

export const quizResults: Record<string, QuizResult> = {
  collector: {
    type: 'collector', title: 'The Color Collector',
    description: 'You see beauty in combinations—how colors play together, how materials complement each other. You\'re drawn to creating things that are visually harmonious and carefully composed. Your creative practice is about curating beauty.',
    emoji: '🎨', color: '#FFC6AD',
    recommendedWorkshops: ['w1', 'w10', 'w4']
  },
  maker: {
    type: 'maker', title: 'The Quiet Maker',
    description: 'You find deep satisfaction in the process of making. Your hands know things your mind is still figuring out. You prefer workshops where you can lose yourself in material—clay, paper, thread—and let the work guide you.',
    emoji: '🤲', color: '#C9E8D3',
    recommendedWorkshops: ['w2', 'w3', 'w8']
  },
  explorer: {
    type: 'explorer', title: 'The Curious Explorer',
    description: 'You\'re drawn to the unknown. You love trying new techniques, mixing unexpected materials, and seeing where a creative impulse leads. Rules are starting points for you, not endpoints.',
    emoji: '🧭', color: '#B9DDF7',
    recommendedWorkshops: ['w6', 'w11', 'w7']
  },
  noticer: {
    type: 'noticer', title: 'The Nature Noticer',
    description: 'You have a gift for attention. You see the patterns in leaves, the quality of morning light, the small dramas of the natural world. Your creativity is rooted in observation and a deep appreciation for the world around you.',
    emoji: '🌿', color: '#C9E8D3',
    recommendedWorkshops: ['w9', 'w4', 'w12']
  },
  social: {
    type: 'social', title: 'The Social Creator',
    description: 'Creativity is better shared. You thrive in workshops where ideas bounce between people, where collaboration sparks new directions. You believe the best art happens in community.',
    emoji: '🤝', color: '#E98BAE',
    recommendedWorkshops: ['w6', 'w11', 'w5']
  },
  seeker: {
    type: 'seeker', title: 'The Detail Seeker',
    description: 'You appreciate craft and precision. You love learning the fundamentals, mastering techniques, and understanding why things work. Your creative practice is a path of continuous refinement.',
    emoji: '🔍', color: '#DCCBFF',
    recommendedWorkshops: ['w7', 'w5', 'w8']
  },
};

export const creativePrompts = {
  activities: ['collage', 'watercolor painting', 'ink drawing', 'paper sculpture', 'mixed-media journal page', 'botanical press', 'zine spread', 'color study', 'texture rubbing', 'found-poem'],
  moods: ['warm and golden', 'cool and misty', 'bold and energetic', 'quiet and contemplative', 'playful and bright', 'earthy and grounded', 'dreamy and soft'],
  materials: ['tissue paper', 'vintage book pages', 'washi tape', 'dried flowers', 'coffee stains', 'colored pencils', 'ink washes', 'fabric scraps', 'newspaper clippings', 'leaves'],
  themes: ['a secret garden', 'morning rituals', 'a love letter to your city', 'things that grow', 'maps of imaginary places', 'the sound of rain', 'a day in miniature', 'portraits of objects'],
};

export const backgrounds = [
  { id: 'cream', name: 'Cream Paper', value: '#FFF8ED' },
  { id: 'white', name: 'White', value: '#FFFFFF' },
  { id: 'kraft', name: 'Kraft', value: '#E8D5B7' },
  { id: 'blush', name: 'Blush', value: '#FFE8E0' },
  { id: 'sage', name: 'Sage', value: '#E8F0E8' },
  { id: 'lavender', name: 'Lavender', value: '#F0E8F8' },
];

export const stickerLibrary = [
  { id: 's1', type: 'sticker', content: '✿', label: 'Flower' },
  { id: 's2', type: 'sticker', content: '★', label: 'Star' },
  { id: 's3', type: 'sticker', content: '♡', label: 'Heart' },
  { id: 's4', type: 'sticker', content: '◇', label: 'Diamond' },
  { id: 's5', type: 'sticker', content: '○', label: 'Circle' },
  { id: 's6', type: 'sticker', content: '△', label: 'Triangle' },
  { id: 's7', type: 'sticker', content: '☾', label: 'Moon' },
  { id: 's8', type: 'sticker', content: '☀', label: 'Sun' },
  { id: 's9', type: 'sticker', content: '🌿', label: 'Leaf' },
  { id: 's10', type: 'sticker', content: '→', label: 'Arrow' },
  { id: 's11', type: 'sticker', content: '≈', label: 'Wave' },
  { id: 's12', type: 'sticker', content: '✦', label: 'Sparkle' },
];
