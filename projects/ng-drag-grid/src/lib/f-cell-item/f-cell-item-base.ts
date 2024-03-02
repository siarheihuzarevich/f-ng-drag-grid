import { IHasHostElement } from '@foblex/core';

export abstract class FCellItemBase implements IHasHostElement {

  public abstract uid: string;

  public abstract id: string;

  public abstract hostElement: HTMLElement;

  public abstract disabled: boolean;

  public abstract parentId: string;

  public highlight(): void {
    this.hostElement.classList.add('f-dragged');
  }

  public clearHighlight(): void {
    this.hostElement.classList.remove('f-dragged');
  }
}
