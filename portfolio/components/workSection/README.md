# Enhanced Work Section

A modular, responsive work section component with device mockups and smooth animations.

## Structure

```
workSection/
├── EnhancedWorkSection.tsx     # Main component
├── workSection.tsx             # Wrapper component
├── types.ts                    # TypeScript interfaces
├── index.ts                    # Export barrel
├── data/
│   └── projects.ts            # Project data and utilities
├── components/
│   ├── ProjectFilter.tsx      # Filter buttons
│   ├── ProjectInfo.tsx        # Project details display
│   ├── ProjectNavigation.tsx  # Navigation dots
│   ├── BackgroundParticles.tsx# Animated background
│   └── index.ts              # Component exports
├── mockups/
│   ├── MobileMockup.tsx      # Mobile device mockup
│   ├── DesktopMockup.tsx     # Desktop/browser mockup
│   ├── PluginMockup.tsx      # Figma plugin mockup
│   ├── InnovativeMockup.tsx  # 3D/WebGL mockup
│   └── index.ts              # Mockup exports
└── README.md                 # This file
```

## Features

- **Responsive Design**: Works on all screen sizes with mobile-first approach
- **Multiple Device Types**: Mobile, Desktop, Plugin, and 3D mockups
- **Smooth Animations**: Framer Motion powered transitions
- **Auto-advance**: Projects rotate automatically every 5 seconds
- **Filter System**: Filter projects by type (All, Web, Mobile, Tools, Innovative)
- **Interactive Navigation**: Click dots to navigate between projects
- **Scroll Effects**: Parallax and fade effects on scroll
- **Particle Background**: Animated particles for visual appeal

## Usage

```tsx
import { EnhancedWorkSection } from '@/components/workSection';

export default function Page() {
  return <EnhancedWorkSection />;
}
```

## Customization

### Adding New Projects

Edit `data/projects.ts`:

```typescript
const newProject: Project = {
  id: 5,
  title: "Your Project",
  type: "web", // or "mobile", "tool", "innovative"
  category: "Your Category",
  description: "Project description",
  tech: ["React", "TypeScript"],
  link: "https://example.com",
  image: "/path/to/image.jpg",
  color: "from-blue-500 to-purple-600"
};
```

### Creating Custom Mockups

1. Create a new file in `mockups/`
2. Export it from `mockups/index.ts`
3. Update the `renderMockup()` function in `EnhancedWorkSection.tsx`

### Styling

The component uses Tailwind CSS with responsive utilities. Key breakpoints:
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

## Dependencies

- React 18+
- Framer Motion
- Tailwind CSS
- TypeScript (optional but recommended)