import {
  createDockview,
  themeAbyss,
  type IContentRenderer,
} from "dockview-core";
import { ContactSelectorPanel } from "./panels";

import "dockview-core/dist/styles/dockview.css";

class DefaultPanel implements IContentRenderer {
  private readonly _element: HTMLElement;

  get element(): HTMLElement {
    return this._element;
  }

  constructor() {
    this._element = document.createElement("div");
    this._element.style.color = "white";
  }

  init(): void {
    this._element.textContent = "Hello World";
  }
}

const api = createDockview(document.getElementById("app")!, {
  theme: themeAbyss,
  createComponent: (options) => {
    switch (options.name) {
      case "default":
        return new DefaultPanel();
      case "contactSelector":
        return new ContactSelectorPanel();
      default:
        throw new Error(`Unknown component ${options.name}`);
    }
  },
});

api.addPanel({
  id: "contactSelector",
  component: "contactSelector",
  title: "Contact Selector",
});
