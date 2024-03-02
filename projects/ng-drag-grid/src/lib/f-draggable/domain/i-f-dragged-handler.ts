import { IPoint } from '@foblex/core';
import { FCellItemBase } from '../../f-cell-item';

export interface IFDraggedHandler {

  fTimetableItem: FCellItemBase;

  prepare?(): void;

  move(difference: IPoint): void;

  end(): void;
}
