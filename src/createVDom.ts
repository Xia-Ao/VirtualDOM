class Element {
  public tagName: string;
  public props: object;
  public children?: Array<Element | string>;
  public count: number;
  public text?: string;
  key?: object;

  constructor(tagName: string, props: object, children: Array<Element | string> = []) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;

    // if (props.key) {
    //   this.key = props.key
    // }

    // 子元素处理
    let count = 0;

    children?.forEach((child: Element | string) => {
      if (child instanceof Element) {
        count += child.count;
      } else {
        child = '' + child;
      }
      count++;
    })
    this.count = count;

  }

  public render(): object {
    const tagName = this.tagName;
    const ele = document.createElement(tagName);
    const props = this.props;

    for (let propName in props) {
      const propValue = props[propName];
      ele.setAttribute(propName, propValue);
    }

    const children = this.children;

    children?.forEach((child) => {
      const childEle = (child instanceof Element) ? child.render() : document.createTextNode(child);
      ele.appendChild(childEle);
    })

    return ele;
  }

}


function createElement(tagName: string, props: object, children: Array<Element | string> = []) {
  return new Element(tagName, props, children);
}

export {
  Element,
  createElement,
}