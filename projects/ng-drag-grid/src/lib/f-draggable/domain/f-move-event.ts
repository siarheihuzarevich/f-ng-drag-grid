import { IDragResult } from './f-cell-item';

export class FMoveEvent {

  constructor(
    public items: IDragResult[],
    public toCellId: string,
  ) {
  }
}
