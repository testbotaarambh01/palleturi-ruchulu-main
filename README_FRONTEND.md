# Orgo - Organic E-commerce Frontend

A modern, responsive frontend for an organic products e-commerce website built with React.js, Vite, Tailwind CSS, and React Router.

## 🚀 Features

- **Modern Design**: Premium organic-themed UI with green earthy color palette
- **Fully Responsive**: Mobile, tablet, and desktop optimized layouts
- **Fast Performance**: Built with Vite for instant HMR and optimized builds
- **Component-Based**: Reusable, maintainable React components
- **Smart Routing**: Complete navigation with React Router DOM
- **Beautiful UI**: Tailwind CSS utilities with custom components and animations

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Sticky navigation with mobile menu
│   ├── Footer.jsx       # Footer with links and newsletter
│   ├── ProductCard.jsx  # Product display card
│   ├── CategoryCard.jsx # Category showcase card
│   ├── HeroSection.jsx  # Home page hero
│   ├── SearchBar.jsx    # Search functionality
│   └── LoadingSpinner.jsx # Loading indicator
├── pages/              # Page components
│   ├── Home.jsx        # Landing page with sections
│   ├── Products.jsx    # Products listing with filters
│   ├── ProductDetails.jsx # Individual product page
│   ├── Cart.jsx        # Shopping cart page
│   ├── Login.jsx       # User login page
│   └── Signup.jsx      # User registration page
├── layouts/
│   └── MainLayout.jsx  # Main app layout with Navbar & Footer
├── routes/             # Routing configuration (ready for expansion)
├── services/           # API services (ready for backend integration)
├── hooks/              # Custom React hooks (ready for expansion)
├── utils/
│   └── data.js         # Dummy product data and constants
├── assets/             # Images and static files
├── App.jsx             # Main app component with routing
├── main.jsx            # React DOM entry point
└── index.css           # Global styles with Tailwind directives
```

## 🛠️ Technologies Used

- **React 19.2.5** - UI library
- **Vite 8.0.10** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful SVG icons
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd orgo
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary (Green)**: 600: #22c55e - Main brand color
- **Secondary (Purple)**: 600: #9333ea - Accent color
- **Earth Tones**: Natural, warm colors for organic feel
- **Neutrals**: Gray shades for text and backgrounds

### Components & Utilities
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.btn-outline` - Outlined button
- `.card` - Reusable card container
- `.badge-primary` - Badge component
- `.input-field` - Form input styling

## 📄 Pages & Features

### 1. **Home Page** (`/`)
- Animated hero section with CTA
- Featured products carousel
- Category showcase with icons
- Why choose us section
- Customer testimonials
- Newsletter subscription

### 2. **Products Page** (`/products`)
- Product grid with lazy loading
- Advanced filtering (category, price, rating)
- Search functionality
- Sort options (featured, price, rating)
- Responsive sidebar filters

### 3. **Product Details** (`/products/:id`)
- High-quality product images
- Detailed product information
- Customer reviews and ratings
- Quantity selector
- Add to cart functionality
- Related products suggestions

### 4. **Shopping Cart** (`/cart`)
- Product listing with quantities
- Update/remove items
- Automatic price calculations
- Order summary
- Shipping information
- Free shipping threshold indicator

### 5. **Login Page** (`/login`)
- Email/password authentication form
- Forgot password link
- Social login options (UI only)
- Responsive form layout

### 6. **Signup Page** (`/signup`)
- Registration form with validation
- Password strength indicator
- Terms & conditions checkbox
- Social signup options (UI only)

## 🔄 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Ready for Backend Integration

The frontend is structured to easily integrate with a backend API:

- `src/services/` - Ready for API service layer
- `src/hooks/` - Ready for custom data fetching hooks
- `src/utils/` - Ready for API utilities
- Dummy data in `src/utils/data.js` can be replaced with API calls

## 📱 Mobile-First Approach

All components are built mobile-first and enhanced for larger screens:
- Hamburger menu on mobile
- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized images for mobile

## ✨ UI/UX Highlights

- Smooth hover animations and transitions
- Rounded corners and soft shadows
- Gradient backgrounds for visual interest
- Loading spinners for better UX
- Form validation and feedback
- Accessibility-focused design

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication system
- [ ] Real product database
- [ ] Payment gateway integration
- [ ] Order tracking system
- [ ] User account management
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Analytics integration

## 📧 Getting Started with Development

1. Components are in `src/components/` - modify and create new ones
2. Pages are in `src/pages/` - add new routes and pages
3. Dummy data is in `src/utils/data.js` - replace with API calls
4. Tailwind config is in `tailwind.config.js` - customize colors and theme

## 🤝 Contributing

This is a frontend-only implementation. Ensure:
- Components are reusable and well-documented
- Styling uses Tailwind utilities
- Code follows React best practices
- Mobile responsiveness is maintained

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🌱**
