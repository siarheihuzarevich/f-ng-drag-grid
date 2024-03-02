import { IPoint, IRect, Point, PointExtensions, RectExtensions } from '@foblex/core';
import { FDraggableState } from '../../f-draggable.state';
import { IFDraggedHandler } from '../i-f-dragged-handler';
import { MoveItemHandler, MoveItemRequest } from './move-item';
import { CreateItemPlaceholderHandler, CreateItemPlaceholderRequest } from './create-placeholder';
import { RemoveItemPlaceholderHandler, RemoveItemPlaceholderRequest } from './remove-placeholder';
import { FCellItemBase } from '../../../f-cell-item';

export class FCellItemDragMove implements IFDraggedHandler {

  private onPointerDownPosition: IPoint = PointExtensions.initialize();
  private placeholder: HTMLElement | undefined;

  private parentCell: HTMLElement | undefined;
  private initialRect: IRect = RectExtensions.initialize();

  private initialScrollTop: number = 0;

  private get draggedElement(): HTMLElement {
    return this.fTimetableItem.hostElement;
  }

  private moveHandler: MoveItemHandler = new MoveItemHandler();

  constructor(
    private fDraggableState: FDraggableState,
    public fTimetableItem: FCellItemBase
  ) {
    this.onPointerDownPosition = new Point();
  }

  public prepare(): void {
    this.fTimetableItem.clearHighlight();
    this.parentCell = this.draggedElement.parentElement as HTMLElement;
    if (!this.parentCell) {
      throw new Error('FTimetable item parent element not found');
    }

    this.initialRect = RectExtensions.fromElement(this.draggedElement);
    const containerRect = RectExtensions.fromElement(this.fDraggableState.containerHost!);
    this.initialScrollTop = this.fDraggableState.containerHost!.scrollTop;
    this.onPointerDownPosition = Point.fromPoint(this.initialRect).sub(containerRect).add({ x: 0, y: this.initialScrollTop });

    this.placeholder = new CreateItemPlaceholderHandler().handle(
      new CreateItemPlaceholderRequest(this.draggedElement, this.initialRect)
    );

    this.moveHandler.handle(
      new MoveItemRequest(this.draggedElement, this.initialRect, this.onPointerDownPosition)
    );
    this.fDraggableState.containerHost?.appendChild(this.draggedElement);
  }

  public move(difference: IPoint): void {
    const differenceScroll = this.fDraggableState.containerHost!.scrollTop - this.initialScrollTop;
    const position = Point.fromPoint(this.onPointerDownPosition).add(difference).add({ x: 0, y: differenceScroll });
    this.moveHandler.handle(
      new MoveItemRequest(this.draggedElement, this.initialRect, position)
    );
  }

  public end(): void {
    this.fDraggableState.containerHost?.removeChild(this.draggedElement);
    new RemoveItemPlaceholderHandler().handle(
      new RemoveItemPlaceholderRequest(this.placeholder!, this.draggedElement)
    );
  }
}
