import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy, OnInit
} from '@angular/core';
import { F_BODY_CELL, FBodyCellBase } from './f-body-cell-base';
import { F_DRAGGABLE_STATE, FDraggableState } from '../../f-draggable';

let uniqueId: number = 0;

@Component({
  selector: 'f-body-cell',
  templateUrl: './f-body-cell.component.html',
  styleUrl: './f-body-cell.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: F_BODY_CELL,
    useExisting: FBodyCellComponent
  }],
  host: {
    'class': 'f-component f-cell f-body-cell',
    '[attr.id]': 'id',
    '[class.f-disabled]': 'disabled'
  }
})
export class FBodyCellComponent extends FBodyCellBase implements OnInit, OnDestroy {

  public uid = `f-body-cell-${ uniqueId++ }`;

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

  constructor(
    @Inject(F_DRAGGABLE_STATE) private fDraggableState: FDraggableState,
    private elementReference: ElementRef<HTMLElement>
  ) {
    super();
    this.id = this.id;
  }

  public ngOnInit(): void {
    this.fDraggableState.addCell(this);
  }

  public ngOnDestroy(): void {
    this.fDraggableState.removeCell(this);
  }
}
