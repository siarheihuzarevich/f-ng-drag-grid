import { IHandler } from '@foblex/core';
import { RemoveItemPlaceholderRequest } from './remove-item-placeholder-request';

export class RemoveItemPlaceholderHandler
  implements IHandler<RemoveItemPlaceholderRequest, void> {

  public handle(request: RemoveItemPlaceholderRequest): void {

    const fBodyCellContainer = request.placeholder.parentElement;
    if (!fBodyCellContainer) {
      throw new Error('Element must be a child of f-body-cell');
    }

    request.targetElement.removeAttribute('style');
    fBodyCellContainer.replaceChild(request.targetElement, request.placeholder);
    request.placeholder.remove();
  }
}
