function Selector(el, config) {
  this.el = el;
  this.options = config.options;
  this.onclick = config.onclick;

  this.el.className = "Selector";
  this.el.style.maxHeight = `${config.height ?? 234}px`;

  if (config.title) {
    const title = this._createElement("label", "Title");
    title.innerText = config.title;
  }

  if (config.search) {
    const search = this._createElement("input", "Search");
    search.placeholder = config.placeholder ?? "Search";
    search.oninput = this.__onInput.bind(this);
  }

  this.ul = this._createElement("ul", "List");
  this.updateOptions();
}

Selector.prototype._createElement = function(tag, className, parent = this.el) {
  let el = document.createElement(tag);
  el.className = `Selector-${className}`;
  parent.append(el);
  return el;
}

Selector.prototype.updateOptions = function(options = this.options) {
  this.options = options;
  this.ul.innerHTML = '';

  for (let item of this.options) {
    let li = this._createElement('li', 'Item');

    li.setAttribute('tabindex', 0);
    li.innerText = item.text ?? item;
    li.dataset.value = item.value ?? li.innerText;

    li.onclick = this.__onClick.bind(this);
    li.onkeydown = this.__onKeyDown.bind(this);
    li.onmouseover = this.__onMouseOver;

    this.ul.appendChild(li);
  }
}

Selector.prototype.disable = function() {
  this.el.style.display = 'none';
}

Selector.prototype.enable = function() {
  this.el.style.display = 'flex';
  this.ul.children[0].focus();
}

Selector.prototype.toggle = function() {
  this.el.style.display == 'flex' ? this.disable() : this.enable();
}

Selector.prototype.__onClick = function(e) {
  this.onclick(e.target.dataset.value);
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

// ------------------------------------------------------------------------------------------ //

function Select(el, config) {
  this.el = el;
  this.display = document.createElement('div');
  this.selector = new Selector(document.createElement('div'), config);

  Object.defineProperty(this, 'value', {
    get() {
      return this.el.dataset.value;
    },
    set(value) {
      this.display.innerText = value;
      this.el.dataset.value = value;
    }
  });

  el.className = "Select";
  this.display.className = "Select-Display";

  this.display.onclick = () => this.selector.toggle();
  this.selector.onclick = this.__onClick.bind(this);
  window.addEventListener('click', this.__onClickOutside.bind(this));

  this.selector.disable();
  this.value = config.options[0];
  el.append(this.display, this.selector.el);
}

Select.prototype.__onClick = function(value) {
  this.value = value;
  this.selector.disable();
}

Select.prototype.__onClickOutside = function(e) {
  if (!this.el.contains(e.target))
    this.selector.disable();
}
