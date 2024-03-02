import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FCellItemBase } from './f-cell-item-base';
import { F_DRAGGABLE_STATE, FDraggableState } from '../f-draggable';
import { F_BODY_CELL, FBodyCellBase } from '../f-body';

let uniqueId: number = 0;

@Component({
  selector: 'f-cell-item',
  templateUrl: './f-cell-item.component.html',
  styleUrl: './f-cell-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'f-component f-cell-item',
    '[attr.id]': 'id',
    '[class.f-disabled]': 'disabled'
  }
})
export class FCellItemComponent extends FCellItemBase implements OnInit, OnDestroy {

  public uid = `f-drag-table-item-${ uniqueId++ }`;

  @Input()
  public override get id(): string {
    return this._id!;
  }

  public override set id(value: any) {
    this._id = value || this.uid;
  }

  private _id: string | undefined;

  public override get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  @Input({ transform: booleanAttribute })
  public override disabled: boolean = false;

  public override get parentId(): string {
    return this.fBodyCell.id;
  }

  constructor(
    @Inject(F_DRAGGABLE_STATE) private fDraggableState: FDraggableState,
    @Inject(F_BODY_CELL) private fBodyCell: FBodyCellBase,
    private elementReference: ElementRef<HTMLElement>
  ) {
    super();
    this.id = this.id;
  }

  public ngOnInit(): void {
    this.fDraggableState.addItem(this);
  }

  public ngOnDestroy(): void {
    this.fDraggableState.removeItem(this);
  }
}
