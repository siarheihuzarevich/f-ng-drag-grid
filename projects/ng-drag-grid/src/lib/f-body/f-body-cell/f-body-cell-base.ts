import { IHasHostElement } from '@foblex/core';
import { InjectionToken } from '@angular/core';

export const F_BODY_CELL = new InjectionToken<FBodyCellBase>('F_BODY_CELL');

export abstract class FBodyCellBase implements IHasHostElement {

  public abstract uid: string;

  public abstract id: string;

  public abstract hostElement: HTMLElement;

  public abstract disabled: boolean;

  public highlight(): void {
    this.hostElement.classList.add('f-drag-over');
  }

  public clearHighlight(): void {
    this.hostElement.classList.remove('f-drag-over');
  }
}
