# 🗳️ Selector

![image](https://github.com/user-attachments/assets/a30745ea-91c0-48df-a065-0346bdc61cbc)

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

## 📄 Documentation

### 🗳️ Select
![image](https://github.com/user-attachments/assets/9977a78e-c046-4277-be43-61f5600c4fd4)
```js
const select = new Select(element, {
  options: [
    "Wow!",
    "So",
    "Easy 😎",
  ]
});
```
```js
select.value(); // <- get select value
```

### 📃 Selector
![image](https://github.com/user-attachments/assets/80af262c-333b-400d-b768-76611e9b89c5)
```js
const select = new Selector(element, {
  options: [
    "Wow!",
    "So",
    "Easy 😎",
  ],
  onclick(value) { alert(value); },
});
```

### 🛠️ Configuration
```ts
title?: string;
width?: number;
height?: number;
search?: boolean;
options: Array<string | { text: string, value?: string }>;
onclick: (value, text) => void;
```

### 🎨 Style

**selector.css**\
Edit `--space`, `font-size` & `font-family`;
https://github.com/FelipeIzolan/selector/blob/743530c6586a2741a630680d2733ea342632ae92/selector.css#L53

**Themes**\
You can use an existing color or create your own.
https://github.com/FelipeIzolan/selector/blob/743530c6586a2741a630680d2733ea342632ae92/theme/default.css#L1

## 📜 License

- [selector](https://github.com/FelipeIzolan/selector) - MIT
