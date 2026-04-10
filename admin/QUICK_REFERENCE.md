# Admin Panel UI - Quick Reference

## 📦 Import Components
```jsx
import { 
  Button, Card, Input, Modal, Badge, Table, 
  Sidebar, Header, Spinner, Alert, Select 
} from "@/components/UI";
```

## 🎨 Common Props

### Button
```jsx
<Button 
  variant="primary|secondary|ghost|danger|success"
  size="sm|md|lg"
  loading={false}
  disabled={false}
  onClick={handler}
  icon={IconComponent}
>
  Label
</Button>
```

### Input
```jsx
<Input
  label="Label"
  type="text|email|password|number"
  placeholder="Placeholder"
  value={value}
  onChange={handler}
  error="Error message"
  icon={IconComponent}
  required={true}
/>
```

### Card
```jsx
<Card 
  className="additional classes"
  animated={true}
  onClick={handler}
>
  Content
</Card>
```

### StatCard
```jsx
<StatCard
  title="Title"
  value="Value"
  icon={IconComponent}
  trend={12}
  color="blue|green|purple|orange|indigo"
/>
```

### Modal
```jsx
<Modal
  isOpen={boolean}
  onClose={handler}
  title="Title"
  size="sm|md|lg|xl|2xl"
  footer={<JSX />}
  closeOnOverlayClick={true}
>
  Content
</Modal>
```

### Table
```jsx
<Table
  columns={[
    { key: "id", label: "ID", width: "100px" },
    { 
      key: "actions", 
      label: "Actions",
      render: (value, row) => <div>{value}</div>
    }
  ]}
  data={[{id: 1, ...}]}
  striped={true}
  hoverable={true}
  onRowClick={handler}
/>
```

### Select
```jsx
<Select
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" }
  ]}
  value={selected}
  onChange={handler}
  placeholder="Select..."
  error="Error message"
  disabled={false}
/>
```

### Badge
```jsx
<Badge
  variant="default|success|warning|danger|purple|slate"
  size="sm|md|lg"
>
  Label
</Badge>
```

### Alert
```jsx
<Alert
  type="info|success|warning|error"
  title="Title"
  message="Message"
  closeable={true}
  onClose={handler}
/>
```

## 🎯 Quick Patterns

### Form with Validation
```jsx
const [form, setForm] = useState({ name: "", email: "" });
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!form.name) newErrors.name = "Name required";
  if (!form.email) newErrors.email = "Email required";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    // Submit
  }
};

<form onSubmit={handleSubmit}>
  <Input
    label="Name"
    value={form.name}
    onChange={(e) => setForm({...form, name: e.target.value})}
    error={errors.name}
  />
  <Button type="submit">Save</Button>
</form>
```

### Modal Dialog
```jsx
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open</Button>
  <Modal
    isOpen={open}
    onClose={() => setOpen(false)}
    title="Dialog"
    footer={
      <>
        <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </>
    }
  >
    Content here
  </Modal>
</>
```

### Data Table with Actions
```jsx
<Table
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleEdit(row)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      )
    }
  ]}
  data={items}
/>
```

## 🎨 Color System

### Gradient Colors
```js
const colors = {
  blue: "from-blue-600 to-cyan-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-pink-500",
  orange: "from-orange-500 to-red-500",
};
```

### Status Colors
- Success: `text-green-400 bg-green-500/20`
- Warning: `text-yellow-400 bg-yellow-500/20`
- Error: `text-red-400 bg-red-500/20`
- Info: `text-blue-400 bg-blue-500/20`

## 🚀 Performance Tips

1. **Memoize Components**
   ```jsx
   const MyComponent = React.memo(({ data }) => <div>{data}</div>);
   ```

2. **Use useCallback**
   ```jsx
   const handleClick = useCallback(() => {}, []);
   ```

3. **Lazy Load Modals**
   ```jsx
   const LargeModal = lazy(() => import('./LargeModal'));
   ```

4. **Use DataGrid for Large Lists**
   ```jsx
   <DataGrid data={items} pagination itemsPerPage={10} />
   ```

## 📱 Responsive Classes

- Mobile: `block md:hidden`
- Tablet: `hidden md:block lg:hidden`
- Desktop: `hidden lg:block`

## ♿ Accessibility

- Always provide `label` for inputs
- Use semantic HTML
- Test with keyboard navigation
- Provide ARIA labels for complex components
- Use proper color contrast

## 🐛 Common Issues

### Button not working
- Check if `onClick` handler is provided
- Verify `disabled` prop isn't true
- Check console for errors

### Input showing error incorrectly
- Ensure `error` prop is cleared after successful validation
- Check validation logic

### Modal backdrop not clickable
- Set `closeOnOverlayClick={true}`
- Check z-index of modal

### Table columns not aligned
- Specify `width` in column config
- Use percentage-based widths

## 📚 Resources

- [Design System](../DESIGN_SYSTEM.md)
- [Component Library](./README.md)
- [Migration Guide](../MIGRATION_GUIDE.md)
- [Tailwind Docs](https://tailwindcss.com/)
- [Framer Docs](https://www.framer.com/motion/)

## 🎓 Examples

### Dashboard Stats
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map(stat => (
    <StatCard key={stat.title} {...stat} />
  ))}
</div>
```

### Settings Card
```jsx
<Card className="p-8">
  <h3 className="text-xl font-bold mb-4">Settings</h3>
  <div className="space-y-4">
    <Switch enabled={notify} onChange={setNotify} label="Notifications" />
    <Switch enabled={dark} onChange={setDark} label="Dark Mode" />
  </div>
</Card>
```

### Loading State
```jsx
const [loading, setLoading] = useState(false);

<Button 
  loading={loading}
  onClick={async () => {
    setLoading(true);
    await api.call();
    setLoading(false);
  }}
>
  Save
</Button>
```

---

**Last Updated:** April 2026
**Version:** 1.0
