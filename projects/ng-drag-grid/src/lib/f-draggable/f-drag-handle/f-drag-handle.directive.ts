import {
  Directive, ElementRef, InjectionToken, Input, OnDestroy
} from "@angular/core";
import { Subject } from 'rxjs';
import { BooleanExtensions, IHasHostElement } from '@foblex/core';

export const F_DRAG_HANDLE: InjectionToken<FDragHandleDirective> = new InjectionToken<FDragHandleDirective>('F_DRAG_HANDLE');

@Directive({
  selector: "[fDragHandle]",
  standalone: true,
  host: {
    class: "f-drag-handle f-component",
    '[class.f-drag-handle-disabled]': 'disabled'
  },
  providers: [ { provide: F_DRAG_HANDLE, useExisting: FDragHandleDirective } ],
})
export class FDragHandleDirective implements IHasHostElement, OnDestroy {

  public readonly stateChanges: Subject<void> = new Subject<void>();

  @Input('fDragHandleDisabled')
  public get disabled(): boolean {
    return this.isDisabled;
  }

  public set disabled(isDisabled: boolean | undefined | string) {
    const value = BooleanExtensions.castToBoolean(isDisabled);
    if (value !== this.isDisabled) {
      this.isDisabled = value;
      this.stateChanges.next();
    }
  }

  private isDisabled: boolean = false;

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  constructor(
    private elementReference: ElementRef<HTMLElement>
  ) {
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
