import { IHandler, IPoint, ISize } from '@foblex/core';
import { MoveItemRequest } from './move-item-request';

export class MoveItemHandler
  implements IHandler<MoveItemRequest, void> {

  public handle(request: MoveItemRequest): void {
    this.changeStyles(request.targetElement, request.size, request.position);
  }

  private changeStyles(element: HTMLElement, size: ISize, position: IPoint): void {
    element.style.position = 'absolute';
    element.style.zIndex = '1000';
    element.style.width = `${ size.width }px`;
    element.style.height = `${ size.height }px`;
    element.style.left = `${ 0 }px`;
    element.style.top = `${ 0 }px`;
    element.style.transform = 'translate(' + position.x + 'px,' + position.y + 'px)';
  }
}
