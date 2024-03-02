import { Injectable, InjectionToken } from '@angular/core';
import { IFDraggedHandler } from './domain';
import { ITransformModel, Point, TransformModelExtensions } from '@foblex/core';
import { FBodyCellBase } from '../f-body';
import { FCellItemBase } from '../f-cell-item';

export const F_DRAGGABLE_STATE = new InjectionToken<FDraggableState>('F_DRAGGABLE_STATE');

@Injectable()
export class FDraggableState {

  public transform: ITransformModel = TransformModelExtensions.default();

  public containerHost: HTMLElement | undefined;

  private items: FCellItemBase[] = [];

  private cells: FBodyCellBase[] = [];

  public draggedItems: IFDraggedHandler[] = [];

  public onPointerDownScale: number = 1;

  public onPointerDownPosition: Point = new Point(0, 0);

  public setContainerHost(element: HTMLElement): void {
    this.containerHost = element;
  }

  public findItem(element: HTMLElement): FCellItemBase | undefined {
    return this.items.find((x) => x.hostElement.contains(element));
  }

  public addItem(item: FCellItemBase): void {
    this.items.push(item);
  }

  public removeItem(item: FCellItemBase): void {
    this.items = this.items.filter((x) => x.uid !== item.uid);
  }

  public findCell(element: HTMLElement): FBodyCellBase | undefined {
    return this.cells.find((x) => x.hostElement.contains(element));
  }

  public addCell(cell: FBodyCellBase): void {
    this.cells.push(cell);
  }

  public removeCell(cell: FBodyCellBase): void {
    this.cells = this.cells.filter((x) => x.uid !== cell.uid);
  }

  public reset(): void {
    this.draggedItems.forEach((item) => {
      item.fTimetableItem.clearHighlight();
    });
    this.draggedItems = [];
  }
}
