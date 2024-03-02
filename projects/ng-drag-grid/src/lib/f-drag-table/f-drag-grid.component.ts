import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { F_DRAGGABLE_STATE, FDraggableDirective, FDraggableState } from '../f-draggable';
import { IHasHostElement } from '@foblex/core';

@Component({
  selector: 'f-drag-grid',
  templateUrl: './f-drag-grid.component.html',
  styleUrl: './f-drag-grid.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ {
    directive: FDraggableDirective,
    inputs: ['disabled'],
    outputs: ['fMovedTo'],
  } ],
  host: {
    'class': 'f-component f-drag-grid'
  }
})
export class FDragGridComponent implements OnInit, IHasHostElement {

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  constructor(
    @Inject(F_DRAGGABLE_STATE) private fDraggableState: FDraggableState,
    private elementReference: ElementRef<HTMLElement>
  ) {
  }

  public ngOnInit(): void {
    this.fDraggableState.setContainerHost(this.hostElement);
  }
}
