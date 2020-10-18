class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(component) {
    this.root.appendChild(component.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null; //实DOM
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }

  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
}

export function createElement(comp, attributes, ...children) {
  let e;
  if (typeof comp === "string") {
    console.log("e = new ElementWrapper(type);", comp);

    e = new ElementWrapper(comp);
  } else {
    console.log("e = new type();", comp);

    e = new comp();
  }
  for (let p in attributes) {
    e.setAttribute(p, attributes[p]);
  }

  const insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new TextWrapper(child);
      }
      if (typeof child === "object" && child instanceof Array) {
        insertChildren(child);
      } else {
        e.appendChild(child);
      }
    }
  };
  insertChildren(children); //调用插入子节点方法
  return e;
}

export function render(component, parentElement) {
  parentElement.appendChild(component.root);
}
