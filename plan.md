# Plan: Varabit Open QR - Brutalist B&W Mobile-First Redesign

## Context

**Problem**: The current QR generator exhibits "generic AI" design patterns:
- Purple-blue-pink gradients (Stripe circa 2020 echo)
- Generic rounded-2xl card styling
- Color pickers unnecessary for B&W design
- 2-column layout collapses poorly on mobile
- Feature bloat with filler content

**Goal**: Redesign as a **Brutalist/Dev** archetype tool:
- Pure black & white color scheme only
- JetBrains Mono font (anti-generic)
- Sharp corners (0px radius)
- Mobile-first single-column layout
- Remove color customization entirely
- Sticky download button on mobile

**Design Archetype**: Brutalist/Dev
- Raw, intentional minimalism
- High contrast (pure #000 on #FFF)
- Monospace typography (JetBrains Mono)
- Utility-first aesthetic

---

## Implementation Phases

### Phase 1: Foundation & Typography

**Files to modify:**
- `app/layout.tsx` - Add JetBrains Mono font import
- `app/globals.css` - Add brutalist utilities, B&W custom properties

**Changes:**
```typescript
// layout.tsx
import { JetBrains_Mono } from 'next/font/google'
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

```css
/* globals.css */
:root {
  --black: #000000;
  --white: #FFFFFF;
  --gray-50: #FAFAFA;
  --gray-100: #F5F5F5;
  --gray-900: #0A0A0A;
}

.brutalist-border { border: 2px solid var(--black); }
.brutalist-shadow { box-shadow: 4px 4px 0 var(--black); }
.brutalist-btn:hover { transform: translate(-1px, -1px); box-shadow: 5px 5px 0 var(--black); }
.brutalist-btn:active { transform: translate(0, 0); box-shadow: none; }
```

---

### Phase 2: Custom Hook - QR Generation Logic

**New file: `hooks/useQRCode.ts`**

Encapsulates QR generation with debouncing:
```typescript
interface UseQRCodeReturn {
  qrData: string | null
  isGenerating: boolean
  error: string | null
  generate: (text: string, size: number) => void
}

// Debounce QR generation by 300ms
// Handle empty input
// Error handling for invalid input
```

---

### Phase 3: Component Modularization

**New file structure:**
```
components/
├── QRGenerator.tsx (orchestrator)
├── qr/
│   ├── QRControls.tsx (input + size)
│   ├── QRPreview.tsx (display + download)
│   └── QRSizeSlider.tsx (reusable slider)
└── ui/
    └── Skeleton.tsx (loading state)
```

**File: `components/qr/QRControls.tsx`** (NEW)
- Textarea with sharp corners
- Remove color pickers entirely
- Auto-expand on focus
- Character counter (warn at 2000 chars)

**File: `components/qr/QRPreview.tsx`** (NEW)
- Memoized QR display
- Download button with brutalist styling
- Auto-invert for dark mode (white QR on black bg)
- Loading skeleton

**File: `components/qr/QRSizeSlider.tsx`** (NEW)
- Range input with preset buttons
- Visual size indicator
- Labels: 128px, 256px, 384px, 512px

**File: `components/QRGenerator.tsx`** (REFACTOR)
- Reduce from 230 → ~80 lines
- Use `useQRCode` hook
- Single-column layout
- Sticky download button on mobile

---

### Phase 4: Mobile-First Layout

**Layout order (mobile):**
1. Header (minimal)
2. Text input (full width)
3. Size slider (collapsible)
4. QR Preview (sticky, always visible)
5. Download button (fixed bottom on mobile)

**Desktop enhancements:**
- Max-width 640px (single column maintained)
- Centered layout
- No sticky elements

**Mobile-specific styles:**
```css
@media (max-width: 768px) {
  .mobile-sticky-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
  }
}
```

---

### Phase 5: Accessibility & Polish

**Accessibility additions:**
- `aria-live` region for QR generation status
- Visible focus rings (2px solid black)
- Keyboard shortcuts (Cmd+D download, Cmd+K focus)
- Skip-to-content link

**Micro-interactions:**
- Button hover: translateY(-1px) + shadow increase
- Input focus: 2px black outline
- Download success toast (auto-dismiss 2s)
- Skeleton shimmer during generation

---

## Critical Files Summary

| File | Action | Lines |
|------|--------|-------|
| `app/layout.tsx` | Modify | Add font import |
| `app/globals.css` | Modify | Add ~40 lines |
| `hooks/useQRCode.ts` | Create | ~50 lines |
| `components/QRGenerator.tsx` | Refactor | 230 → ~80 lines |
| `components/qr/QRControls.tsx` | Create | ~60 lines |
| `components/qr/QRPreview.tsx` | Create | ~50 lines |
| `components/qr/QRSizeSlider.tsx` | Create | ~30 lines |
| `components/ui/Skeleton.tsx` | Create | ~15 lines |

---

## Verification

**Testing checklist:**
1. [ ] JetBrains Mono loads correctly
2. [ ] Mobile layout single-column works
3. [ ] Sticky download button appears on mobile (<768px)
4. [ ] QR generates instantly (debounced)
5. [ ] Download produces PNG with correct colors
6. [ ] Dark mode auto-inverts QR colors
7. [ ] Keyboard navigation works (Tab, Enter shortcuts)
8. [ ] Focus rings visible (2px black)
9. [ ] Character counter warns at 2000 chars
10. [ ] No color pickers visible

**Manual test commands:**
```bash
npm run dev
# Visit http://localhost:3000
# Test on mobile viewport (375x667)
# Test QR generation with various inputs
# Test download functionality
```

**Lighthouse targets:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

---

## Design Specifications

**Typography Scale (JetBrains Mono):**
- Body: 14px
- Small: 12px
- Base: 16px
- LG: 20px
- XL: 24px
- 2XL: 32px
- 3XL: 48px

**Spacing (8px grid):** 8, 16, 24, 32, 48, 64, 96

**Colors only:**
- Black: #000000
- White: #FFFFFF
- Gray 50: #FAFAFA
- Gray 100: #F5F5F5
- Gray 900: #0A0A0A

**Border radius:** 0px (sharp corners everywhere)

**Shadows:** Hard offset shadows only (4px 4px 0 #000)
