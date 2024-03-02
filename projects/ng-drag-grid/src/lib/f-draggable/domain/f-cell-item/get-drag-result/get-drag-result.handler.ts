import { IHandler } from '@foblex/core';
import { F_DRAGGABLE_STATE, FDraggableState } from '../../../f-draggable.state';
import { Inject, Injectable } from '@angular/core';
import { IDragResult } from './i-drag-result';

@Injectable()
export class GetDragResultHandler implements IHandler<void, IDragResult[]> {

  constructor(
    @Inject(F_DRAGGABLE_STATE) private fDraggableState: FDraggableState,
  ) {
  }

  public handle(): IDragResult[] {
    let result: IDragResult[] = [];

    const items = this.fDraggableState.draggedItems || [];

    for (let i = 0; i < items.length; i++) {
      items[ i ].end();
      const cellId = items[ i ].fTimetableItem.parentId;
      const itemId = items[ i ].fTimetableItem.hostElement.id;

      result.push({
        currentCellId: cellId,
        itemId: itemId
      });
    }

    return result;
  }
}
