import { IPoint, ISize } from '@foblex/core';

export class MoveItemRequest {

  constructor(
    public targetElement: HTMLElement,
    public size: ISize,
    public position: IPoint
  ) {
  }
}
