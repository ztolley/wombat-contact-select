import type {
  IContentRenderer,
  GroupPanelPartInitParameters,
} from "dockview-core";
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { setSelectedContact } from "@ztolley/wombat-sdk";

export class ContactSelectorPanel implements IContentRenderer {
  private readonly _element: HTMLElement;

  get element(): HTMLElement {
    return this._element;
  }

  constructor() {
    this._element = document.createElement("wombat-contact-selector");
  }

  init(parameters: GroupPanelPartInitParameters): void {
    void parameters;
  }
}

const contacts = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

@customElement("wombat-contact-selector")
class ContactSelectorElement extends LitElement {
  /** Adds the panel chosen by the user. */
  private handleSelectContact(contact: string): void {
    console.debug(Date.now(), "Select contact", contact);
    setSelectedContact(contact);
  }

  render() {
    return html`<div class="contacts">
      <span class="contacts__label">Contacts</span>
      <select
        @change=${(e: Event) =>
          this.handleSelectContact((e.target as HTMLSelectElement).value)}
      >
        ${contacts.map(
          (contact) => html`<option value=${contact}>${contact}</option>`,
        )}
      </select>
    </div>`;
  }

  static styles = css`
    :host {
      display: flex;
      font-size: 1.5em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "wombat-contact-selector": ContactSelectorElement;
  }
}
