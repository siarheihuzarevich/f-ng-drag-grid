import { IRect } from '@foblex/core';

export class CreateItemPlaceholderRequest {

  constructor(
    public targetElement: HTMLElement,
    public initialRect: IRect
  ) {
  }
}
