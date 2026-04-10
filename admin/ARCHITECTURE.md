# Component Architecture & Hierarchy

## 🏗️ Overall Application Structure

```
App
├── Routes
│   ├── /login → LoginScreen
│   └── /dashboard (Protected)
│       └── Layout
│           ├── Header
│           │   ├── Search Input
│           │   ├── Notifications Bell
│           │   │   └── Notification List
│           │   └── Profile Menu
│           │       ├── Avatar
│           │       └── Logout Button
│           │
│           ├── Sidebar
│           │   ├── Logo
│           │   ├── Navigation Items (map)
│           │   │   ├── Link
│           │   │   ├── Icon
│           │   │   └── Badge (optional)
│           │   └── Bottom Section
│           │       ├── Settings Button
│           │       └── Logout Button
│           │
│           └── Main Content (Outlet)
│               └── Page Component
│                   ├── PageHeader
│                   │   ├── Breadcrumb
│                   │   ├── Title
│                   │   └── Action Buttons
│                   │
│                   └── Page Content
│                       ├── Cards
│                       ├── Tables
│                       ├── Forms
│                       ├── Modals
│                       └── Other Components
```

## 📊 Component Dependency Tree

```
UI Components
├── Layout
│   ├── Sidebar (uses Button, icon library)
│   └── Header (uses Input, Button, Badge)
│
├── Forms
│   ├── Input (text/email/password)
│   ├── TextArea
│   ├── Select
│   ├── Checkbox
│   ├── Radio
│   ├── Switch
│   └── Form (wrapper)
│
├── Data Display
│   ├── Table
│   ├── DataGrid (uses Table, Button, Modal)
│   ├── Card
│   ├── StatCard
│   ├── Badge
│   ├── Avatar
│   └── Progress
│
├── Feedback
│   ├── Button
│   ├── Modal (uses Button)
│   ├── Alert
│   ├── Toast
│   ├── Notification
│   └── Spinner
│
├── Navigation
│   ├── Tabs
│   ├── Breadcrumb
│   └── PageHeader (uses Badge, Button)
│
└── Utilities
    ├── Divider
    ├── EmptyState (uses Button)
    ├── Skeleton
    └── Badge2D
```

## 🔄 Component Relationships

### Parent-Child Relationships

```
Modal
  └── Footer
      ├── Button (variant="ghost")
      ├── Button (variant="primary")
      └── Button (variant="danger")

Table
  └── Rows
      ├── Cells
      └── Actions (Button group)

DataGrid
  ├── Input (filter)
  ├── Table
  └── Pagination (Button group)

Form
  ├── FormGroup
  │   ├── Label
  │   ├── Input/Select/TextArea
  │   └── Error Message
  └── Button (submit)

PageHeader
  ├── Breadcrumb
  ├── Title
  └── Action (Button group)

Sidebar
  ├── Navigation Items (map)
  │   └── Button (with icon)
  └── Bottom Options (Button group)

Header
  ├── Search (Input)
  ├── Notifications (Icon → Notification list)
  └── Profile Menu (Avatar → Dropdown)
```

## 🎯 Data Flow

### Form Component Flow
```
1. User Input
   ↓
2. onChange Handler
   ↓
3. State Update
   ↓
4. Validation
   ↓
5. Error State
   ↓
6. Display Error (if exists)
   ↓
7. Submit Handler
   ↓
8. API Call / Action
   ↓
9. Success/Error Feedback
```

### Modal Workflow
```
1. Action Button Click
   ↓
2. setIsOpen(true)
   ↓
3. Modal mounts with animation
   ↓
4. User interaction
   ↓
5. Action / Cancel
   ↓
6. setIsOpen(false)
   ↓
7. Modal exits with animation
```

### Table with Pagination
```
1. Load Data
   ↓
2. Display in Table
   ↓
3. Calculate Pages
   ↓
4. Show Pagination Buttons
   ↓
5. Page Change
   ↓
6. Slice Data
   ↓
7. Re-render Table
```

## 🎨 Style Composition

### Button Component Example
```
Button (wrapper)
  ├── Base Styles
  │   ├── Font: font-semibold
  │   ├── Transition: transition-all
  │   └── Display: flex items-center
  │
  ├── Variant Styles
  │   ├── primary: bg-gradient-to-r from-blue-600
  │   ├── secondary: bg-slate-700
  │   ├── ghost: bg-transparent
  │   ├── danger: bg-gradient-to-r from-red-600
  │   └── success: bg-gradient-to-r from-green-600
  │
  ├── Size Styles
  │   ├── sm: px-3 py-2 text-sm
  │   ├── md: px-4 py-2.5 text-base
  │   └── lg: px-6 py-3 text-lg
  │
  └── State Styles
      ├── Hover: scale-1.02
      ├── Active: scale-0.98
      ├── Loading: spinner animation
      └── Disabled: opacity-60
```

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
├── Sidebar: hidden/hamburger menu
├── Header: stacked layout
└── Content: full width

Tablet (768px - 1024px)
├── Sidebar: small with icons
├── Header: compact layout
├── Content: 2-column grid

Desktop (> 1024px)
├── Sidebar: full width with text
├── Header: full layout
├── Content: 3-4 column grid
```

## 🔐 Component Isolation

Each component is independent and encapsulated:

```
Card (self-contained)
  ├── State: optional animations
  ├── Styles: contained within component
  ├── Props: well-defined interface
  └── Children: flexible content

Button (self-contained)
  ├── State: loading, disabled, hover
  ├── Styles: variant + size + custom
  ├── Props: onClick, disabled, variant
  └── Children: text + optional icon

Modal (self-contained)
  ├── State: isOpen, animations
  ├── Styles: backdrop + container
  ├── Props: onClose, title, size
  └── Children: content + footer
```

## 🔄 Animation Flow

### Page Transition
```
1. Link Click
2. Route Change
3. animate: { opacity: 0, y: -20 }
4. Page Exit
5. New Page Mount
6. animate: { opacity: 1, y: 0 }
7. Page Enter
```

### Modal Animation
```
1. setIsOpen(true)
2. Backdrop: opacity 0 → 1
3. Modal: scale 0.95 → 1, opacity 0 → 1
4. User Action
5. setIsOpen(false)
6. Modal: scale 1 → 0.95, opacity 1 → 0
7. Backdrop: opacity 1 → 0
```

### Hover Effects
```
1. Mouse Enter Button
2. whileHover: { scale: 1.02 }
3. Animation starts
4. Mouse Leave Button
5. Scale returns to 1
```

## 🧹 Cleanup & Performance

### Memory Management
- Components unmount cleanly
- Event listeners removed
- Timeouts cleared
- Subscriptions unsubscribed

### Render Optimization
- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values
- Lazy loading for heavy components

## 🛣️ Navigation Pattern

```
Sidebar Link Click
  ↓
useLocation hook
  ↓
Path matches: className updates
  ↓
Active state: highlighted
  ↓
Route change
  ↓
Layout transitions
  ↓
New page renders
```

## 📦 Import Pattern

### From Container
```jsx
import Layout from "./Layout/Layout";
```

### From Components
```jsx
import { Button, Card, Input } from "@/components/UI";
```

### Individual Import
```jsx
import Button from "@/components/UI/Button";
```

## 🎓 Component Usage Pattern

```javascript
// 1. Import
import { Card, Button, Input } from "@/components/UI";

// 2. State
const [data, setData] = useState('');
const [errors, setErrors] = useState({});

// 3. Handlers
const handleChange = (e) => setData(e.target.value);
const handleSubmit = (e) => {
  e.preventDefault();
  // Validate
  // Submit
};

// 4. Render
return (
  <Card>
    <Input value={data} onChange={handleChange} error={errors.field} />
    <Button onClick={handleSubmit}>Submit</Button>
  </Card>
);
```

---

This architecture ensures:
✅ Modularity - Components are independent
✅ Reusability - Can be used anywhere
✅ Maintainability - Easy to update
✅ Scalability - Easy to extend
✅ Performance - Optimized rendering
✅ Accessibility - Built-in support
