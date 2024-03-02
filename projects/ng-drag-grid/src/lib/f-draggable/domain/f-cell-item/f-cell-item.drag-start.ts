import { IHandler, IPointerEvent, ITransformModel, Point } from '@foblex/core';
import { Inject, Injectable } from '@angular/core';
import { F_DRAGGABLE_STATE, FDraggableState } from '../../f-draggable.state';
import { isDragHandle } from '../../f-drag-handle';
import { FCellItemDragMove } from './f-cell-item.drag-move';

@Injectable()
export class FCellItemDragStart implements IHandler<IPointerEvent, void> {

  private get transform(): ITransformModel {
    return this.fDraggableState.transform;
  }

  private get containerHost(): HTMLElement {
    return this.fDraggableState.containerHost!;
  }

  constructor(
    @Inject(F_DRAGGABLE_STATE) private fDraggableState: FDraggableState,
  ) {
  }

  public handle(event: IPointerEvent): void {
    const item = this.fDraggableState.findItem(event.targetElement);

    if (!this.containerHost) {
      throw new Error('Container host is not defined');
    }

    const pointerPositionInContainer = Point.fromPoint(event.getPosition()).elementTransform(this.containerHost);

    if (!item || item.disabled || this.fDraggableState.draggedItems.length || !isDragHandle(event.targetElement)) {
      return;
    }

    this.fDraggableState.onPointerDownScale = this.transform.scale;
    this.fDraggableState.onPointerDownPosition = pointerPositionInContainer.div(this.transform.scale);
    this.fDraggableState.draggedItems = [ new FCellItemDragMove(
      this.fDraggableState,
      item
    ) ];
  }
}
