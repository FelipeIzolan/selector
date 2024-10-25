function Selector(el, config) {
  this.el = el;
  this.ul = document.createElement('ul');

  this.options = config.options;
  this.onclick = config.onclick;

  el.className = "Selector";
  this.ul.className = "Selector-List";

  el.style.maxWidth = config.width ? `${config.width}px` : 'auto';
  el.style.maxHeight = config.height ? `${config.height}px` : 'auto';

  if (config.title) {
    const title = document.createElement('label')
    title.className = "Selector-Title";
    title.innerText = config.title;
    el.append(title);
  }

  if (config.search) {
    const search = document.createElement('input');
    search.className = "Selector-Search";
    search.placeholder = config.placeholder ?? "Search";
    search.oninput = this.__onInput.bind(this);
    el.append(search);
  }

  el.append(this.ul);
  this.updateOptions();
}

Selector.prototype.updateOptions = function(options = this.options) {
  this.options = options;
  this.ul.innerHTML = '';

  for (let item of this.options) {
    let li = document.createElement('li');

    li.className = "Selector-Item";
    li.setAttribute('tabindex', 0);
    li.innerText = item.text ?? item;
    li.dataset.value = item.value ?? li.innerText;

    li.onclick = this.__onClick.bind(this);
    li.onkeydown = this.__onKeyDown.bind(this);
    li.onmouseover = this.__onMouseOver;

    this.ul.appendChild(li);
  }
}

Selector.prototype.enable = function() {
  this.el.style.display = 'flex';
  this.ul.children[0].focus();
}

Selector.prototype.disable = function() {
  this.el.style.display = 'none';
}

Selector.prototype.toggle = function() {
  this.el.style.display == 'flex' ? this.disable() : this.enable();
}

Selector.prototype.__onClick = function(e) {
  this.onclick(e.target.dataset.value, e.target.innerText);
}

Selector.prototype.__onMouseOver = function() {
  this.focus();
}

Selector.prototype.__onKeyDown = function(e) {
  e.preventDefault();

  let target;

  if (e.key == "Enter") return this.__onClick(e);
  if (e.key == "ArrowUp") target = Selector.__find(e.target.previousSibling, -1);
  if (e.key == "ArrowDown") target = Selector.__find(e.target.nextSibling, 1);

  if (target) {
    target.focus();
    target.scrollIntoView({ block: "center" });
  }
}

Selector.prototype.__onInput = function(e) {
  const query = e.target.value.toLowerCase();
  Array.from(this.ul.children).forEach(child => {
    child.style.display = child.innerText.toLowerCase().includes(query) ? 'block' : 'none';
  });
}

Selector.__find = function(el, dir) {
  if (!el)
    return;

  if (el.style.display != 'none')
    return el;

  return Selector.__find(el[dir == -1 ? 'previousSibling' : 'nextSibling'], dir);
}

function Select(el, config) {
  this.el = el;
  this.display = document.createElement('div');
  this.selector = new Selector(document.createElement('div'), config);

  let fc = this.selector.ul.children[0];

  el.className = "Select";
  el.dataset.value = fc.dataset.value;
  el.style.maxWidth = config.width ? `${config.width}px` : 'auto';

  this.display.className = "Select-Display";
  this.display.innerText = fc.innerText;
  this.display.onclick = () => this.selector.toggle();

  this.selector.onclick = this.__onClick.bind(this);
  this.selector.disable();

  el.append(this.display, this.selector.el);

  window.addEventListener('click', this.__onClickOutside.bind(this));
}

Select.prototype.value = function() {
  return this.el.dataset.value;
}

Select.prototype.__onClick = function(value, text) {
  this.el.dataset.value = value;
  this.display.innerText = text;
  this.selector.disable();
}

Select.prototype.__onClickOutside = function(e) {
  if (!this.el.contains(e.target))
    this.selector.disable();
}
