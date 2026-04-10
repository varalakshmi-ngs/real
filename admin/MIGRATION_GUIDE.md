# Admin Panel Redesign - Migration Guide

## Overview
This guide helps you migrate existing pages to use the new redesigned UI components.

## What's New

### Old vs New
| Old | New |
|-----|-----|
| Custom styled components | Reusable UI library |
| Global state management | Component props |
| Multiple CSS files | Tailwind + App.css |
| Limited animations | Framer Motion throughout |
| Basic error handling | Comprehensive validation |
| No accessibility features | Full WCAG AA compliance |

## Step-by-Step Migration

### 1. Update Imports
**Before:**
```jsx
import Button from "../../../utils/Button";
import Input from "../../../utils/Input";
```

**After:**
```jsx
import { Button, Input, Card, Modal } from "@/components/UI";
```

### 2. Replace Dashboard Number Cards
**Before:**
```jsx
<DashboardNumberCard
  title={stat.title}
  number={stat.number}
  icon={stat.icon}
/>
```

**After:**
```jsx
<StatCard 
  title={stat.title}
  value={stat.number}
  icon={stat.icon}
  trend={12}
  color="blue"
/>
```

### 3. Update Button Usage
**Before:**
```jsx
<Button
  style="w-full h-[50px] bg-gradient-to-r from-blue-600..."
  text="Click Me"
/>
```

**After:**
```jsx
<Button variant="primary" size="lg" className="w-full">
  Click Me
</Button>
```

### 4. Replace Custom Input Fields
**Before:**
```jsx
<input
  type="email"
  className="w-full px-4 py-2..."
  placeholder="Email"
/>
```

**After:**
```jsx
<Input
  type="email"
  label="Email"
  placeholder="you@example.com"
  icon={Mail}
  error={errors.email}
/>
```

### 5. Add Modal Dialogs
**Before:**
```jsx
{showModal && <ModalLayout>Content</ModalLayout>}
```

**After:**
```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </>
  }
>
  Your content here
</Modal>
```

### 6. Use Card Components
**Before:**
```jsx
<div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
  Content
</div>
```

**After:**
```jsx
<Card className="p-6">
  Content
</Card>
```

### 7. Implement Tables
**Before:**
```jsx
{data.map(item => (
  <div key={item.id}>
    <p>{item.name}</p>
    <p>{item.email}</p>
  </div>
))}
```

**After:**
```jsx
<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ]}
  data={data}
/>
```

### 8. Add Form Components
**Before:**
```jsx
<select>
  <option>Option 1</option>
</select>
```

**After:**
```jsx
<Select
  options={[
    { value: '1', label: 'Option 1' }
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### 9. Handle Notifications
**Before:**
```jsx
Toast.success("Action completed");
```

**After:**
```jsx
<Toast type="success" message="Action completed" />
```

### 10. Add Loading States
**Before:**
```jsx
{loading && <div>Loading...</div>}
```

**After:**
```jsx
<Button loading={isLoading}>
  Save
</Button>
```

## Feature Pages Migration Checklist

### Gallery Page
- [ ] Replace custom card layout with `Card` component
- [ ] Use new `Button` component
- [ ] Add `Modal` for image previews
- [ ] Implement `Table` for gallery list
- [ ] Update input fields with new `Input` component

### Events Page
- [ ] Replace event cards with new `Card`
- [ ] Use `Modal` for event details
- [ ] Update form with new form components
- [ ] Add `DatePicker` for event dates
- [ ] Use `Badge` for event status

### Blogs Page
- [ ] Update blog card layout
- [ ] Replace editor with new components
- [ ] Add `Tabs` for draft/published
- [ ] Use `Table` for blog list
- [ ] Implement `Modal` for blog editor

### Contact Messages
- [ ] Use new `Table` component
- [ ] Add `Modal` for message details
- [ ] Use `Badge` for message status
- [ ] Implement filtering with new inputs

### Prayer Requests
- [ ] Replace card layout with `Card`
- [ ] Use `Table` for request list
- [ ] Add `Badge` for request status
- [ ] Implement `Modal` for details
- [ ] Use new form components

### Contribution Page
- [ ] Update contribution list view
- [ ] Replace cards with new components
- [ ] Add data charts/graphs
- [ ] Use `Table` for transactions
- [ ] Implement filters with new inputs

## Common Patterns

### Form Pattern
```jsx
import { Form, Input, Button, Select } from "@/components/UI";

const [formData, setFormData] = useState({ name: "", email: "" });
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  // Validate
  // Submit
};

<Form onSubmit={handleSubmit}>
  <Input
    label="Name"
    value={formData.name}
    onChange={(e) => setFormData({...formData, name: e.target.value})}
    error={errors.name}
  />
  <Button type="submit" variant="primary">Save</Button>
</Form>
```

### Modal Pattern
```jsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
```

### Data Display Pattern
```jsx
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => handleEdit(row)}>
          Edit
        </Button>
        <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
          Delete
        </Button>
      </div>
    )
  }
];

<Table columns={columns} data={items} />
```

## Testing Checklist

- [ ] Responsive design on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Form validation displays errors correctly
- [ ] Modals open/close properly
- [ ] Animations are smooth
- [ ] Loading states work
- [ ] Error messages are clear
- [ ] Buttons have proper hover/active states
- [ ] Performance is acceptable

## Performance Considerations

1. **Lazy Load Modals** - Load modal content only when needed
2. **Memoize Lists** - Use `React.memo` for large lists
3. **Code Splitting** - Split pages into separate chunks
4. **Image Optimization** - Use proper image formats
5. **Minimize Re-renders** - Use `useCallback` and `useMemo`

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Button not responding
- Check `disabled` prop
- Verify `onClick` handler is provided

### Input not showing error
- Ensure `error` prop is set
- Check validation logic

### Modal not opening
- Verify `isOpen` state changes
- Check `onClose` handler

### Table not showing data
- Verify `data` prop format
- Check `columns` definition
- Ensure column `key` matches data

## Next Steps

1. Start with one feature page
2. Migrate components incrementally
3. Test thoroughly on all devices
4. Update styling as needed
5. Deploy gradually using feature flags

## Resources

- [Design System Documentation](../DESIGN_SYSTEM.md)
- [Component Library README](./README.md)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

## Support

For questions or issues:
1. Check component README for examples
2. Review DESIGN_SYSTEM.md for guidelines
3. Look at Dashboard.jsx for reference implementation
4. Check existing page implementations

---
**Last Updated:** April 2026
**Version:** 1.0
