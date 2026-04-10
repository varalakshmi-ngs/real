# Admin Panel UI Component Library

## Quick Start

### Import Components
```javascript
import { 
  Button, 
  Card, 
  Input, 
  Modal, 
  Badge, 
  Table, 
  Select 
} from "@/components/UI";
```

## Components Overview

### Layout Components
- **Sidebar** - Collapsible navigation menu with submenus
- **Header** - Top navigation with notifications and profile
- **Card** - Flexible container component
- **Breadcrumb** - Navigation breadcrumb trail
- **PageHeader** - Page title and metadata

### Form Components
- **Input** - Text input with icons and validation
- **TextArea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Checkbox input
- **Radio** - Radio button group
- **Switch** - Toggle switch
- **Form** - Form wrapper
- **FormGroup** - Form field wrapper

### Data Display
- **Table** - Basic data table
- **DataGrid** - Advanced grid with sorting/filtering
- **Badge** - Status indicators
- **Avatar** - User avatar with status
- **Progress** - Progress bar

### Feedback
- **Button** - Interactive button
- **Spinner** - Loading indicator
- **Alert** - Alert messages
- **Toast** - Toast notifications
- **Notification** - Notification card
- **Modal** - Dialog component

### Navigation
- **Tabs** - Tab navigation
- **Sidebar** - Sidebar navigation

### Utilities
- **Divider** - Visual separator
- **EmptyState** - Empty state display
- **Skeleton** - Loading skeleton
- **Badge2D** - 2D badge variant

## Component Examples

### Button Component
```jsx
import { Button } from "@/components/UI";

// Primary Button
<Button variant="primary" size="lg">
  Click Me
</Button>

// Ghost Button
<Button variant="ghost">Cancel</Button>

// Danger Button
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// With Loading State
<Button loading={isLoading}>
  Saving...
</Button>
```

### Card Component
```jsx
import { Card, StatCard } from "@/components/UI";

// Basic Card
<Card className="p-6">
  <h2>My Content</h2>
</Card>

// Stat Card
<StatCard 
  title="Total Users" 
  value={1234}
  icon={<Users />}
  trend={12}
  color="blue"
/>
```

### Modal Component
```jsx
import { Modal, Button } from "@/components/UI";
import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete Item"
  size="md"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger">Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this?</p>
</Modal>
```

### Form Example
```jsx
import { Input, Select, Checkbox, Button } from "@/components/UI";
import { useState } from "react";

const [formData, setFormData] = useState({
  name: "",
  email: "",
  role: ""
});

<form onSubmit={handleSubmit}>
  <Input
    label="Name"
    placeholder="Enter name"
    value={formData.name}
    onChange={(e) => setFormData({...formData, name: e.target.value})}
    required
  />
  
  <Input
    label="Email"
    type="email"
    placeholder="Enter email"
    value={formData.email}
    onChange={(e) => setFormData({...formData, email: e.target.value})}
    required
  />
  
  <Select
    label="Role"
    options={[
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" }
    ]}
    value={formData.role}
    onChange={(e) => setFormData({...formData, role: e.target.value})}
  />
  
  <Checkbox label="Remember me" />
  
  <Button type="submit">Submit</Button>
</form>
```

### Table Component
```jsx
import { Table } from "@/components/UI";

const columns = [
  { key: "name", label: "Name", width: "200px" },
  { key: "email", label: "Email", width: "250px" },
  { key: "role", label: "Role", width: "150px" },
  { 
    key: "actions", 
    label: "Actions",
    render: (_, row) => (
      <div className="flex gap-2">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    )
  }
];

const data = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" }
];

<Table 
  columns={columns} 
  data={data}
  onRowClick={(row) => console.log(row)}
/>
```

### Alert Component
```jsx
import { Alert } from "@/components/UI";

<Alert
  type="success"
  title="Success"
  message="Your changes have been saved"
  closeable
/>

<Alert
  type="error"
  title="Error"
  message="Something went wrong"
/>
```

## Styling

All components use Tailwind CSS. Customize by modifying:
- `tailwind.config.js` - Tailwind configuration
- `App.css` - Global styles
- Component files - Individual component styles

## Props & Variants

### Button Variants
- `primary` (default)
- `secondary`
- `ghost`
- `danger`
- `success`

### Button Sizes
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

### Badge Variants
- `default`
- `success`
- `warning`
- `danger`
- `purple`
- `slate`

### Alert Types
- `info`
- `success`
- `warning`
- `error`

## Best Practices

1. **Use Semantic HTML** - Components generate proper HTML
2. **Keyboard Navigation** - All interactive elements support keyboard
3. **ARIA Labels** - Proper accessibility attributes
4. **Mobile Responsive** - Components work on all screen sizes
5. **Error Handling** - Always handle errors in forms
6. **Loading States** - Show loading feedback
7. **Accessibility** - Test with screen readers

## Performance Tips

- Use `React.memo()` for expensive components
- Lazy load modals and large components
- Memoize callbacks with `useCallback`
- Use `useMemo` for computed values
- Avoid unnecessary re-renders

## Customization

### Custom Button Style
```jsx
<Button 
  className="rounded-full px-8 shadow-2xl"
  variant="primary"
>
  Custom
</Button>
```

### Custom Card Style
```jsx
<Card className="bg-gradient-to-r from-blue-600 to-purple-600 p-10">
  Custom Card
</Card>
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies
- React 18+
- Framer Motion
- Tailwind CSS 3+
- Lucide React (icons)

## Contributing

To add new components:
1. Create component file in `components/UI/`
2. Export from `components/UI/index.js`
3. Add to this README
4. Test responsiveness and accessibility

## Support

For issues or feature requests, please check DESIGN_SYSTEM.md for detailed documentation.

## License

These components are part of the Real Temple Church Management System.
