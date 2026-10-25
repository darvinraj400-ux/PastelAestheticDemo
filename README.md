# Little Day Studio

> "Make room for a little wonder."

An immersive creative playground for workshops, art, community, and discovery.

## Overview

Little Day Studio is a fictional creative community website where people discover art workshops, experiment with colors, explore creative activities, collect inspiration, and find small moments of joy through interactive digital experiences.

The website combines the charm of a physical scrapbook with the responsiveness of a modern digital product.

## Features

### 🏠 Homepage
- Animated hero with collage composition
- Upcoming workshops preview
- Creative categories grid
- Seasonal collections preview
- Instructor profiles
- Newsletter signup (local demo)
- Creative quiz CTA

### 📚 Workshop Discovery
- Search by name or instructor
- Category, skill level, and date filtering
- Sort by date or price
- Featured workshop display
- Save/unsave workshops
- Clear all filters

### 📋 Workshop Detail & Booking
- Full workshop information display
- Instructor profiles
- Materials list
- Related workshops
- Multi-step booking flow:
  1. Choose attendance
  2. Enter participant info
  3. Review booking
  4. Confirmation (clearly marked as demo)
- Form validation and step navigation
- Price calculation

### 📅 Calendar
- Month grid view with workshop indicators
- List/agenda view
- Date selection with workshop details
- Category filtering
- Next workshop shortcut

### 🎨 Inspiration Room
- Interactive canvas with draggable elements
- 8 curated color palette presets
- Custom color selection
- Shape/sticker library (12 elements)
- Background/material selector (6 options)
- Creative prompt generator
- Element controls (rotation, scale, color, z-order)
- Save/load compositions to localStorage
- Reset canvas

### ✨ Creative Mood Quiz
- 5 illustrated questions
- Progress indicator
- Back navigation
- 6 result types based on actual answers:
  - The Color Collector
  - The Quiet Maker
  - The Curious Explorer
  - The Nature Noticer
  - The Social Creator
  - The Detail Seeker
- Personalized workshop recommendations

### 🌿 Seasonal Collections
- 4 themed collections (Paper Garden, Color Club, Slow Sundays, Tiny Worlds)
- Each with unique visual identity
- Related workshops
- Curated palettes
- Creative prompts
- Load preset in Inspiration Room

### 👥 Community Studio
- 6 instructor profiles with bios
- Values section
- Community gallery (illustrative)
- Instructor workshop links

### 💾 My Collection
- Saved workshops
- Saved compositions
- Saved palettes
- Quiz results
- Clear all with confirmation
- Empty states with CTAs

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **React Router** (HashRouter) for navigation
- **Lucide React** for icons
- **localStorage** for data persistence

## Design System

### Colors
- Paper cream: `#FFF8ED`
- Warm peach: `#FFC6AD`
- Butter yellow: `#FFE58F`
- Soft lilac: `#DCCBFF`
- Mint green: `#C9E8D3`
- Sky blue: `#B9DDF7`
- Berry pink: `#E98BAE`
- Ink brown: `#40332F`
- Muted pencil gray: `#887F79`

### Typography
- Display: DM Serif Display
- Body: Inter
- Handwritten: Caveat

### Motion
- Level 1: Tactile feedback (button press, selection states)
- Level 2: Component transitions (page changes, filter updates)
- Level 3: Expressive motion (hero animations, collection reveals)
- Reduced-motion support via `prefers-reduced-motion`

## Architecture

```
src/
├── App.tsx              # Routing, layout, navigation, footer
├── data.ts              # All data models and datasets
├── store.ts             # State management hooks (localStorage)
├── index.css            # Design tokens, animations, global styles
├── main.tsx             # Entry point
└── features/
    ├── HomePage.tsx     # Hero + homepage sections
    ├── Workshops.tsx    # Discovery, detail, booking
    ├── Calendar.tsx     # Calendar & agenda views
    ├── InspirationRoom.tsx  # Interactive canvas
    ├── Quiz.tsx         # Creative mood quiz
    ├── Collections.tsx  # Seasonal collections
    ├── Community.tsx    # Instructors & gallery
    └── Saved.tsx        # Personal collection
```

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Accessibility

- Semantic HTML with proper heading structure
- Keyboard-accessible navigation and tools
- Visible focus states
- Accessible labels for icon controls
- Reduced-motion support
- Sufficient color contrast
- Form validation messages
- Screen-reader friendly decorative elements

## Demo Notes

- All bookings are local demos (no real reservations)
- Newsletter signup is simulated (no real emails sent)
- Community gallery items are illustrative content
- All data is fictional and for demonstration purposes

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design (320px+)
- Touch-optimized interactions
