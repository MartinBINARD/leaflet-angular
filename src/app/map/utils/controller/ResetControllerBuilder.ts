import * as L from 'leaflet';

export class ResetControlBuilder {
  private position: string;
  private containerClasses: string[];
  private iconClasses: string[];
  private resetAction: () => void;

  constructor() {
    this.position = 'topright';
    this.containerClasses = [];
    this.iconClasses = [];
    this.resetAction = () => {};
  }

  setPosition(position: string): ResetControlBuilder {
    this.position = position;
    return this;
  }

  setContainerClasses(classes: string[]): ResetControlBuilder {
    this.containerClasses = classes;
    return this;
  }

  setIconClasses(classes: string[]): ResetControlBuilder {
    this.iconClasses = classes;
    return this;
  }

  setResetAction(action: () => void): ResetControlBuilder {
    this.resetAction = action;
    return this;
  }

  build(): L.Control {
    const ResetControl = L.Control.extend({
      options: {
        position: this.position,
      },
      onAdd: (): HTMLElement => {
        const container = L.DomUtil.create('div');
        container.classList.add(...this.containerClasses);
        L.DomEvent.disableClickPropagation(container);

        const icon = document.createElement('div');
        icon.classList.add(...this.iconClasses);
        container.appendChild(icon);

        container.onclick = () => {
          this.resetAction();
        };

        return container;
      },
    });

    return new ResetControl();
  }
}
