## Orgo Frontend - Quick Start Guide

### 🚀 Get Up and Running in 5 Minutes

#### Step 1: Navigate to Project
```bash
cd c:\Users\HP\OneDrive\Desktop\orgo
```

#### Step 2: Verify Dependencies
```bash
npm install  # Already done, but safe to run again
```

#### Step 3: Start Development Server
```bash
npm run dev
```

#### Step 4: Open in Browser
```
http://localhost:5173/
```

✅ **You're all set!** The app is running with hot reload enabled.

---

### 📍 Where to Find Things

#### **Pages I Want to Modify**
- Home page → `src/pages/Home.jsx`
- Products page → `src/pages/Products.jsx`
- Product details → `src/pages/ProductDetails.jsx`
- Cart → `src/pages/Cart.jsx`
- Login/Signup → `src/pages/Login.jsx`, `src/pages/Signup.jsx`

#### **Components I Want to Reuse**
- Navbar → `src/components/Navbar.jsx`
- Footer → `src/components/Footer.jsx`
- Product Card → `src/components/ProductCard.jsx`
- Product Grid → Use multiple `<ProductCard />` components

#### **Styling I Want to Change**
- Colors → `tailwind.config.js` (lines 7-30)
- Global styles → `src/index.css`
- Component classes → `src/index.css` (@layer components)

#### **Data I Want to Replace**
- Products → `src/utils/data.js` (replace dummy data with API calls)
- Categories → `src/utils/data.js` (line 58)
- Testimonials → `src/utils/data.js` (line 62)

---

### 🛠️ Common Tasks

#### Add a New Page
1. Create file: `src/pages/MyNewPage.jsx`
2. Import in `src/App.jsx`
3. Add route in `<Routes>` section
4. Update Navbar links if needed

#### Example:
```jsx
// src/pages/MyNewPage.jsx
export default function MyNewPage() {
  return <div className="section container-custom">
    <h1>My New Page</h1>
  </div>
}

// In src/App.jsx, add:
<Route path="my-route" element={<MyNewPage />} />
```

#### Modify a Component
1. Open component file (e.g., `src/components/ProductCard.jsx`)
2. Edit JSX and styling
3. Save → Browser auto-refreshes

#### Change Colors
1. Open `tailwind.config.js`
2. Find the color you want to change
3. Update the hex value
4. Save → All components using that color update automatically

#### Use a Component
```jsx
import ProductCard from '../components/ProductCard';

// In your JSX:
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

---

### 🎯 Current Dummy Data Structure

#### Product Object
```javascript
{
  id: 1,
  title: 'Product Name',
  price: 12.99,
  rating: 4.8,
  category: 'Category Name',
  image: 'https://image-url.jpg',
  description: 'Product description',
  inStock: true,
}
```

#### Category Object
```javascript
{
  id: 1,
  name: 'Category Name',
  icon: '🎯'
}
```

#### Testimonial Object
```javascript
{
  id: 1,
  name: 'Person Name',
  role: 'Job Title',
  text: 'Testimonial text',
  avatar: 'https://avatar-url.jpg',
}
```

---

### 🔗 How Routing Works

**Current Routes:**
- `/` → Home page
- `/products` → Products listing
- `/products/:id` → Product details (e.g., `/products/1`)
- `/cart` → Shopping cart
- `/login` → Login page
- `/signup` → Signup page

**To add new route:**
```jsx
// In src/App.jsx
<Route path="new-page" element={<NewPage />} />

// To link to it:
<Link to="/new-page">Go to New Page</Link>
```

---

### 💾 Build for Production

```bash
npm run build  # Creates optimized build in 'dist' folder
```

Output: A production-ready folder with optimized HTML, CSS, and JavaScript.

---

### 🐛 Troubleshooting

#### Port Already in Use
```bash
# Kill the process using port 5173 and restart
npm run dev
```

#### Changes Not Appearing
1. Hard refresh browser (Ctrl+Shift+R)
2. Check browser console for errors
3. Check terminal for build errors

#### Import Errors
Make sure import paths are correct:
```jsx
// ✅ Correct
import ProductCard from '../components/ProductCard';

// ❌ Wrong
import ProductCard from 'ProductCard';
```

#### Tailwind Classes Not Working
Make sure:
1. Class name is spelled exactly right (case-sensitive)
2. Class is in `tailwind.config.js` content array (it is)
3. Browser cache is cleared

---

### 📚 File Quick Reference

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component with routing |
| `src/main.jsx` | React entry point |
| `src/index.css` | Global styles and component classes |
| `tailwind.config.js` | Tailwind theme customization |
| `src/utils/data.js` | Dummy data (replace with API) |
| `src/components/*` | Reusable UI components |
| `src/pages/*` | Full page components |
| `src/layouts/MainLayout.jsx` | App layout wrapper |
| `vite.config.js` | Vite build configuration |
| `package.json` | Dependencies and scripts |

---

### 🎓 Learning Resources

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com
- **Vite**: https://vite.dev
- **Lucide Icons**: https://lucide.dev

---

### 📞 Common Component Props

#### ProductCard
```jsx
<ProductCard 
  product={{
    id: 1,
    title: 'Product',
    price: 9.99,
    rating: 4.5,
    category: 'Category',
    image: 'url',
    inStock: true
  }}
/>
```

#### SearchBar
```jsx
<SearchBar 
  onSearch={(term) => console.log(term)} 
  placeholder="Custom placeholder"
/>
```

#### HeroSection
```jsx
<HeroSection /> {/* No props needed */}
```

---

### ✨ Pro Tips

1. **Use Tailwind's responsive classes:**
   ```jsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   ```

2. **Keep components small and reusable**

3. **Use semantic HTML elements** (nav, section, article, etc.)

4. **Test on mobile** - use browser DevTools device toolbar

5. **Use the browser console** for debugging React errors

6. **Component should start with uppercase** (ProductCard, not productCard)

---

### 🚀 Next Steps

1. **Backend Integration:**
   - Create API services in `src/services/`
   - Replace dummy data with API calls

2. **State Management:**
   - Use Context API for global state
   - Or install Redux if needed

3. **Authentication:**
   - Connect login/signup to backend
   - Store JWT tokens
   - Add protected routes

4. **Real Features:**
   - Implement shopping cart logic
   - Add payment processing
   - Connect to database

---

**Happy Coding! 🌱 If you need any clarification, check README_FRONTEND.md or DESIGN_SYSTEM.md**
