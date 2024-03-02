import { DomElementExtensions, IHandler } from '@foblex/core';
import { CreateItemPlaceholderRequest } from './create-item-placeholder-request';

export class CreateItemPlaceholderHandler
  implements IHandler<CreateItemPlaceholderRequest, HTMLElement> {

  public handle(request: CreateItemPlaceholderRequest): HTMLElement {
    const element = request.targetElement;

    const fBodyCellContainer = element.parentElement;
    if (!fBodyCellContainer) {
      throw new Error('Element must be a child of f-body-cell');
    }

    const placeholder = this.createPlaceholder(request);

    fBodyCellContainer.replaceChild(placeholder, element);

    return placeholder;
  }

  private createPlaceholder(request: CreateItemPlaceholderRequest): HTMLElement {
    const result = DomElementExtensions.deepCloneNode(request.targetElement);

    result.innerHTML = '';
    result.style.width = `${ request.initialRect.width }px`;
    result.style.height = `${ request.initialRect.height }px`;

    return result;
  }
}
