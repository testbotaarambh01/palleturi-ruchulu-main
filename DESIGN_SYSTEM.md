## Orgo Frontend - Design System & Styling Guide

### 🎨 Color Palette

#### Primary Color (Organic Green)
```
50:   #f0fdf4
100:  #dcfce7
200:  #bbf7d0
300:  #86efac
400:  #4ade80
500:  #22c55e  ← Main brand color
600:  #16a34a  ← Primary button/accent
700:  #15803d
800:  #166534
900:  #145231
```

#### Secondary Color (Purple Accent)
```
50:   #faf5ff
100:  #f3e8ff
200:  #e9d5ff
300:  #d8b4fe
400:  #c084fc
500:  #a855f7
600:  #9333ea  ← Secondary color
700:  #7e22ce
800:  #6b21a8
900:  #581c87
```

#### Earth Tones (Organic Feel)
```
50:   #faf8f3
100:  #f5f1e8
200:  #e8dcc8
300:  #d4bfa2
400:  #bfa384
500:  #a89068
600:  #997d58
700:  #7a6347
800:  #5f4d3a
900:  #4a3a2e
```

#### Neutral Colors
- Text: `#111827` (gray-900)
- Secondary text: `#6b7280` (gray-500)
- Borders: `#e5e7eb` (gray-200)
- Background: `#f9fafb` (gray-50)
- White: `#ffffff`

### 📐 Typography

#### Font Stack
- Sans-serif: System-ui, 'Segoe UI', Roboto, sans-serif
- Monospace: ui-monospace, Consolas, monospace

#### Heading Sizes
```
h1: 2.25rem (36px) - 3.75rem (60px) on desktop
h2: 1.875rem (30px)
h3: 1.5rem (24px)
h4: 1.25rem (20px)
```

#### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### 🎯 Component Classes

#### Buttons
```jsx
// Primary button
<button className="btn-primary">Click me</button>

// Secondary button
<button className="btn-secondary">Click me</button>

// Outline button
<button className="btn-outline">Click me</button>

// Ghost button (transparent)
<button className="btn-ghost">Click me</button>
```

**Button Styling:**
- Padding: `px-6 py-3`
- Border radius: `rounded-lg`
- Font weight: `semibold`
- Transition: `all duration-300 ease-in-out`

#### Cards
```jsx
// Basic card
<div className="card">Content</div>

// Hover effect card
<div className="card-hover">Content</div>
```

**Card Styling:**
- Background: White
- Border radius: `rounded-2xl`
- Padding: `p-6`
- Shadow: `shadow-soft`
- Hover shadow: `hover:shadow-soft-lg`

#### Badges
```jsx
// Primary badge
<span className="badge-primary">Label</span>

// Secondary badge
<span className="badge-secondary">Label</span>
```

**Badge Styling:**
- Padding: `px-4 py-2`
- Border radius: `rounded-full`
- Font size: `text-sm`
- Font weight: `semibold`

#### Input Fields
```jsx
<input className="input-field" placeholder="Enter text..." />
```

**Input Styling:**
- Full width: `w-full`
- Padding: `px-4 py-3`
- Border: `border-2 border-gray-200`
- Border radius: `rounded-lg`
- Focus: `focus:border-primary-500`

#### Text Gradient
```jsx
<h1 className="text-gradient">Gradient Text</h1>
```

**Gradient Styling:**
- Direction: `from-primary-600 to-secondary-600`
- Effect: `bg-clip-text text-transparent`

### 🎬 Animations

#### Fade In
```jsx
<div className="animate-fade-in">Content</div>
```
- Duration: 0.5s
- Easing: ease-in-out
- From: opacity 0 → To: opacity 1

#### Slide Up
```jsx
<div className="animate-slide-up">Content</div>
```
- Duration: 0.5s
- Easing: ease-out
- From: translateY(10px), opacity 0 → To: translateY(0), opacity 1

#### Hover Effects
- Scale: `hover:scale-105`
- Translate: `hover:-translate-y-1`
- Transition: `transition-all duration-300`

### 🎨 Shadow System

#### Soft Shadow (default)
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
```
Class: `shadow-soft`

#### Soft Shadow Large
```css
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
```
Class: `shadow-soft-lg`

#### Soft Shadow XL
```css
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
```
Class: `shadow-soft-xl`

### 📏 Spacing Scale

```
0:    0
0.5:  0.125rem
1:    0.25rem
2:    0.5rem
3:    0.75rem
4:    1rem
6:    1.5rem
8:    2rem
12:   3rem
16:   4rem
32:   8rem
128:  32rem
```

**Usage:**
- Margin: `m-4`, `mx-6`, `my-8`
- Padding: `p-4`, `px-6`, `py-8`
- Gap: `gap-4`, `gap-6`

### 📱 Responsive Breakpoints

```
sm:   640px   (mobile landscape)
md:   768px   (tablet)
lg:   1024px  (desktop)
xl:   1280px  (large desktop)
```

**Usage:**
```jsx
// Hide on mobile, show on md and up
<div className="hidden md:block">Desktop only</div>

// Stack on mobile, side-by-side on md+
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 🎯 Layout Patterns

#### Container
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content constrained to max width with padding */}
</div>

// Or use custom class
<div className="container-custom">
  {/* Same as above */}
</div>
```

#### Section
```jsx
<section className="section">
  {/* py-16 px-4 md:px-8 lg:px-16 */}
</section>
```

#### Grid Layouts

**Featured Products (6 items):**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Categories (6 items):**
```jsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
```

**Testimonials (3 items):**
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```

### 🎨 Customization Guide

#### Changing Brand Colors

1. **Edit `tailwind.config.js`:**
```javascript
colors: {
  primary: {
    600: '#your-color-hex', // Main brand color
  },
  secondary: {
    600: '#your-color-hex', // Accent color
  },
}
```

2. **Update in all component files** that reference `primary-600` or `secondary-600`

#### Adding New Component Classes

In `src/index.css`:
```css
@layer components {
  .my-new-component {
    @apply px-4 py-2 rounded-lg font-semibold transition;
  }
}
```

#### Adjusting Spacing

Modify `theme.extend.spacing` in `tailwind.config.js`

#### Changing Typography

Update `font-size` and `leading` values in `tailwind.config.js`

### 🌙 Dark Mode Support (Ready to Add)

The project is structured to easily add dark mode. Add to `tailwind.config.js`:

```javascript
theme: {
  darkMode: 'class', // or 'media'
}
```

Then add dark variants to components:
```jsx
<div className="bg-white dark:bg-gray-900">
  {/* Light and dark background */}
</div>
```

### ✅ Design System Checklist

- ✅ Color palette defined
- ✅ Typography scale established
- ✅ Component classes created
- ✅ Shadow system implemented
- ✅ Animation utilities added
- ✅ Spacing scale consistent
- ✅ Responsive breakpoints configured
- ✅ Layout patterns established
- ✅ Customization ready

---

**This design system ensures consistency, scalability, and easy customization across the entire application.**
