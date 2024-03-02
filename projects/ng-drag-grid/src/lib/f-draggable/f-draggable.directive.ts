import {
  AfterViewInit, booleanAttribute,
  Directive,
  ElementRef, EventEmitter, Inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';
import { FDraggableBase } from './f-draggable-base';
import { of, Subject, Subscription, switchMap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { IPointerEvent, Point } from '@foblex/core';
import { isDragHandle } from './f-drag-handle';
import { F_DRAGGABLE_STATE, FDraggableState } from './f-draggable.state';
import {
  GetDragResultHandler,
  FCellItemDragStart, GetCellUnderPointerHandler, GetCellUnderPointerRequest
} from './domain';
import { FMoveEvent } from './domain';
import { FBodyCellBase } from '../f-body';

@Directive({
  selector: "fDraggable",
  standalone: true,
  providers: [
    FDraggableState,
    { provide: F_DRAGGABLE_STATE, useExisting: FDraggableState },
    GetCellUnderPointerHandler,
    FCellItemDragStart,
    GetDragResultHandler
  ],
  host: {
    '[class.f-disabled]': 'disabled'
  }
})
export class FDraggableDirective extends FDraggableBase implements AfterViewInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  @Input({ transform: booleanAttribute })
  public override disabled: boolean = false;

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  @Output()
  public fMovedTo: EventEmitter<FMoveEvent> = new EventEmitter<FMoveEvent>();

  private readonly document: Document;

  private fBodyCell: FBodyCellBase | undefined;

  constructor(
    private elementReference: ElementRef<HTMLElement>,
    ngZone: NgZone,
    private injector: Injector,
    @Inject(DOCUMENT) document: any,
    @Inject(F_DRAGGABLE_STATE) private fDraggableState: FDraggableState
  ) {
    super(ngZone);
    this.document = document as Document;
  }

  public ngAfterViewInit(): void {
    super.subscribe(this.document);
  }

  protected override onPointerDown(event: IPointerEvent): boolean {
    let result: boolean =
      event.isMouseLeftButton()
      && isDragHandle(event.targetElement)
      && !this.isDragStarted;

    return result;
  }

  protected override prepareDragSequence(event: IPointerEvent) {

    //TODO: Selection area (for future)

    this.injector.get(FCellItemDragStart).handle(event);

    this.fDraggableState.draggedItems.forEach((item) => {
      item.prepare?.();
    });

    this.hostElement.classList.add('f-dragging');
  }

  protected override onPointerMove(event: IPointerEvent): void {
    const pointerPositionInCanvas = Point.fromPoint(event.getPosition()).elementTransform(this.hostElement);
    const difference = pointerPositionInCanvas.div(this.fDraggableState.onPointerDownScale).sub(this.fDraggableState.onPointerDownPosition);
    this.fDraggableState.draggedItems.forEach((item) => {
      item.move(difference);
    });
    this.fBodyCell?.clearHighlight();
    this.fBodyCell = this.getFBodyCellUnderPointer(event);
    this.fBodyCell?.highlight();
  }

  protected override onPointerUp(event: IPointerEvent): void {

    //TODO: Selection area (for future)

    const dragResult = this.injector.get(GetDragResultHandler).handle();

    if (dragResult.length) {
      const targetCell = this.getFBodyCellUnderPointer(event);
      if (targetCell) {
        this.fMovedTo.emit(new FMoveEvent(dragResult, targetCell.id));
      }
    }

    this.hostElement.classList.remove('f-dragging');
    this.fBodyCell?.clearHighlight();
    this.fDraggableState.reset();
  }

  private getFBodyCellUnderPointer(event: IPointerEvent): FBodyCellBase | undefined {
    return this.injector.get(GetCellUnderPointerHandler).handle(
      new GetCellUnderPointerRequest(event)
    );
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    this.subscriptions$.unsubscribe();
  }
}

