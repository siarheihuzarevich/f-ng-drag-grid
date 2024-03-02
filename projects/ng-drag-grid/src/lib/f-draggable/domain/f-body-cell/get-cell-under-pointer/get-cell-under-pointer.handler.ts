import { Inject, Injectable } from '@angular/core';
import { IHandler, IPointerEvent } from '@foblex/core';
import { FBodyCellBase } from '../../../../f-body';
import { F_DRAGGABLE_STATE, FDraggableState } from '../../../f-draggable.state';
import { GetCellUnderPointerRequest } from './get-cell-under-pointer-request';

@Injectable()
export class GetCellUnderPointerHandler
  implements IHandler<GetCellUnderPointerRequest, FBodyCellBase | undefined> {

  constructor(
    @Inject(F_DRAGGABLE_STATE) private fDraggableState: FDraggableState,
  ) {
  }

  public handle(request: GetCellUnderPointerRequest): FBodyCellBase | undefined {
    let result = this.getBodyCell(request.event);
    if (result && result.disabled) {
      result = undefined;
    }
    return result;
  }

  private getBodyCell(event: IPointerEvent): FBodyCellBase | undefined {
    let result: FBodyCellBase | undefined;
    const fCellElement = this.getCellElementsUnderPointer(event);

    if (fCellElement) {
      result = this.getCellComponentByElement(fCellElement);
    }

    return result;
  }

  private getCellElementsUnderPointer(event: IPointerEvent): HTMLElement | undefined {
    const elements = document.elementsFromPoint(event.getPosition().x, event.getPosition().y);

    const result = elements.find((x) => x.tagName.toLowerCase() === 'f-body-cell') as HTMLElement | undefined;
    return result;
  }

  private getCellComponentByElement(element: HTMLElement): FBodyCellBase | undefined {
    const result = this.fDraggableState.findCell(element);
    return result;
  }
}
