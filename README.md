![image](https://github.com/user-attachments/assets/00594edf-7f37-4dd1-9a8f-ef37f8ec2203)

## 🚀 Getting Started

```html
<!-- Create a simple Selector instance -->
<link rel="stylesheet" href="selector/selector.css">
<link rel="stylesheet" href="selector/theme/default.css">
<script src="selector/selector.js"></script>
<script>
const select = new Select(element, {
  search: true,
  options: [
    "Wow!",
    { text: "So" },
    { text: "Easy 😎", value: "easy" },
  ],
  onclick(value) { ... },
});
</script>

```
