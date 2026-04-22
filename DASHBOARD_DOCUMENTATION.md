# Brown Girls Rituals - Dashboard Documentation

## Overview
This document provides a complete reference for all data points, formulas, and data sources used in the Admin Dashboard analytics.

---

## Dashboard Statistics

### 1. Total Products
**Data Point:** `products.length`

**Source:** `DataContext.products` array

**Description:** Count of all products in the product catalog.

**Formula:**
```javascript
const totalProducts = products.length;
```

**Data Structure:**
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  etsyUrl?: string;
}
```

---

### 2. Blog Posts
**Data Point:** `blogConfig.posts.length`

**Source:** `DataContext.blogConfig.posts` array

**Description:** Count of all blog posts in the Journal section.

**Formula:**
```javascript
const blogPosts = blogConfig.posts.length;
```

**Data Structure:**
```typescript
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}
```

---

### 3. FAQs
**Data Point:** `faqConfig.faqs.length`

**Source:** `DataContext.faqConfig.faqs` array

**Description:** Count of all FAQ items.

**Formula:**
```javascript
const faqCount = faqConfig.faqs.length;
```

**Data Structure:**
```typescript
interface FAQ {
  id: number;
  question: string;
  answer: string;
}
```

---

### 4. Messages
**Data Point:** `messages.length` and `unreadCount`

**Source:** `DataContext.messages` array

**Description:** Total messages and unread message count from the contact form.

**Formulas:**
```javascript
const totalMessages = messages.length;
const unreadCount = messages.filter((m) => !m.read).length;
```

**Badge Color Logic:**
- If `unreadCount > 0`: Red background (`bg-red-500`)
- If `unreadCount === 0`: Orange background (`bg-orange-500`)

**Data Structure:**
```typescript
interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;      // ISO format: new Date().toISOString()
  read: boolean;
}
```

---

## Financial Analytics

### 5. Average Product Price
**Data Point:** `avgPrice`

**Source:** Calculated from `products` array

**Description:** The average price of all products in the catalog.

**Formula:**
```javascript
const totalValue = products.reduce((sum, p) => sum + p.price, 0);
const avgPrice = products.length > 0 ? totalValue / products.length : 0;
```

**Display Format:** `$${avgPrice.toFixed(2)}`

**Example:**
- Products: [$25.00, $30.00, $45.00]
- Total: $100.00
- Count: 3
- Average: $33.33

---

### 6. Price Range
**Data Point:** Min and Max prices

**Source:** Calculated from `products` array

**Description:** The minimum and maximum product prices.

**Formulas:**
```javascript
const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0;
```

**Display Format:** `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`

**Example:**
- Products: [$25.00, $30.00, $45.00]
- Min: $25.00
- Max: $45.00
- Display: "$25.00 - $45.00"

---

### 7. Total Inventory Value
**Data Point:** `totalValue`

**Source:** Calculated from `products` array

**Description:** Sum of all product prices (theoretical inventory value).

**Formula:**
```javascript
const totalValue = products.reduce((sum, p) => sum + p.price, 0);
```

**Display Format:** `$${totalValue.toFixed(2)}`

**Example:**
- Products: [$25.00, $30.00, $45.00]
- Total Value: $100.00

---

## Recent Products Table

### Data Source
`products.slice(-5).reverse()`

**Description:** Shows the 5 most recently added products (last 5 in array, reversed for newest first).

**Columns:**
1. **Product** - Name and thumbnail image
2. **Category** - Product category
3. **Price** - Formatted price with theme color

**Display Format:**
```javascript
products.slice(-5).reverse().map((product) => ({
  name: product.name,
  image: product.image,
  category: product.category,
  price: `$${product.price.toFixed(2)}`
}))
```

---

## Data Persistence

### Storage Key
```javascript
const STORAGE_KEY = 'bgr_admin_data';
```

### Storage Location
Browser LocalStorage

### Saved Data Structure
```javascript
{
  products: Product[],
  siteConfig: SiteConfig,
  heroConfig: HeroConfig,
  subHeroConfig: SubHeroConfig,
  navigationConfig: NavigationConfig,
  videoSectionConfig: VideoSectionConfig,
  featuresConfig: FeaturesConfig,
  blogConfig: BlogConfig,
  faqConfig: FAQConfig,
  aboutConfig: AboutConfig,
  contactConfig: ContactConfig,
  footerConfig: FooterConfig,
  theme: {
    primaryColor: string,    // e.g., '#8b6d4b'
    primaryDark: string      // e.g., '#6d5639'
  },
  messages: Message[]
}
```

### Persistence Logic
```javascript
// On load: Read from localStorage
const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  return JSON.parse(saved);
}

// On change: Save to localStorage
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}, [data]);
```

---

## Theme System

### CSS Variables
```css
:root {
  --theme-primary: #8b6d4b;        /* Main brand color */
  --theme-primary-dark: #6d5639;   /* Hover state color */
  --theme-primary-rgb: 139, 109, 75; /* RGB for opacity variations */
}
```

### Theme Application
The `ThemeApplier` component applies theme colors to CSS variables:

```javascript
useEffect(() => {
  const root = document.documentElement;
  
  if (theme.primaryColor) {
    root.style.setProperty('--theme-primary', theme.primaryColor);
    
    // Convert hex to RGB
    const hex = theme.primaryColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    root.style.setProperty('--theme-primary-rgb', `${r}, ${g}, ${b}`);
  }
  
  if (theme.primaryDark) {
    root.style.setProperty('--theme-primary-dark', theme.primaryDark);
  }
}, [theme]);
```

---

## Message System

### Adding Messages
When a visitor submits the contact form:

```javascript
const addMessage = (message) => {
  const newMessage = {
    ...message,
    id: Date.now().toString(),           // Unique timestamp ID
    date: new Date().toISOString(),      // ISO timestamp
    read: false                          // Unread by default
  };
  
  setData((prev) => ({
    ...prev,
    messages: [newMessage, ...prev.messages]  // Add to beginning
  }));
};
```

### Marking as Read
```javascript
const markMessageAsRead = (id) => {
  setData((prev) => ({
    ...prev,
    messages: prev.messages.map((m) =>
      m.id === id ? { ...m, read: true } : m
    )
  }));
};
```

### Deleting Messages
```javascript
const deleteMessage = (id) => {
  setData((prev) => ({
    ...prev,
    messages: prev.messages.filter((m) => m.id !== id)
  }));
};
```

### Mark All as Read
```javascript
const markAllAsRead = () => {
  setData((prev) => ({
    ...prev,
    messages: prev.messages.map((m) => ({ ...m, read: true }))
  }));
};
```

---

## Quick Links & Settings

### Quick Actions Links
| Label | Path | Description |
|-------|------|-------------|
| Home Page | /admin/home | Edit hero, about, experience |
| Products | /admin/products | Manage all products |
| Our Story | /admin/about | Edit about sections |
| Journal | /admin/blog | Manage blog posts |
| FAQ | /admin/faq | Edit FAQ items |
| Contact | /admin/contact | Edit contact info |
| Footer | /admin/footer | Edit footer content |

### Settings Links
| Label | Path | Description |
|-------|------|-------------|
| Inbox | /admin/inbox | View messages (shows unread count) |
| Theme Colors | /admin/theme | Change website colors |

---

## Default Login Credentials

**Username:** `admin`
**Password:** `bgr2025!`

---

## Reset to Default

To reset all data to defaults:

```javascript
const resetToDefault = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};
```

**Warning:** This will delete all customizations, products, messages, and theme changes!

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER ACTIONS                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Admin Panel (React)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Editors    │  │   Inbox      │  │Theme Editor  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  DataContext (React Context)                 │
│                    State Management                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Browser LocalStorage (Persistent)               │
│              Key: 'bgr_admin_data'                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Website (Public View)                     │
│              Reads from DataContext                          │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
/src
├── admin/
│   ├── Admin.tsx              # Main admin router
│   ├── AdminLayout.tsx        # Admin dashboard layout
│   ├── AuthContext.tsx        # Authentication state
│   ├── Dashboard.tsx          # Dashboard with analytics
│   ├── DataContext.tsx        # Main data management
│   ├── Login.tsx              # Login page
│   ├── ProductsManager.tsx    # Product CRUD
│   └── editors/
│       ├── AboutEditor.tsx
│       ├── BlogEditor.tsx
│       ├── ContactEditor.tsx
│       ├── FAQEditor.tsx
│       ├── FooterEditor.tsx
│       ├── HomeEditor.tsx
│       ├── Inbox.tsx          # Message inbox
│       └── ThemeEditor.tsx    # Theme customization
├── components/
│   └── ThemeApplier.tsx       # Applies theme to CSS vars
├── sections/                   # Public website sections
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── FAQ.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Products.tsx
│   ├── SubHero.tsx
│   └── VideoSection.tsx
├── pages/
│   ├── Home.tsx               # Main landing page
│   └── ProductDetail.tsx      # Product detail page
└── config.ts                  # Default configuration
```

---

## Summary of All Formulas

| Metric | Formula |
|--------|---------|
| Total Products | `products.length` |
| Blog Posts | `blogConfig.posts.length` |
| FAQs | `faqConfig.faqs.length` |
| Total Messages | `messages.length` |
| Unread Messages | `messages.filter(m => !m.read).length` |
| Total Inventory Value | `products.reduce((sum, p) => sum + p.price, 0)` |
| Average Price | `totalValue / products.length` |
| Min Price | `Math.min(...products.map(p => p.price))` |
| Max Price | `Math.max(...products.map(p => p.price))` |
| Recent Products | `products.slice(-5).reverse()` |

---

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Requirements:**
- LocalStorage enabled
- JavaScript enabled
- Modern CSS support (CSS Variables)

---

## Security Notes

1. **Authentication:** Simple password-based auth (client-side only)
2. **Data Storage:** All data stored in browser LocalStorage
3. **No Server:** This is a static site - no backend required
4. **Data Persistence:** Data persists per browser/device
5. **Backup Recommendation:** Export localStorage data periodically

---

*Document Version: 1.0*
*Last Updated: 2026-04-08*
