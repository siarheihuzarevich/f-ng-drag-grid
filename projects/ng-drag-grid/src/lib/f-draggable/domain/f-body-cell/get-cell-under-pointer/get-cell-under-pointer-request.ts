import { IPointerEvent } from '@foblex/core';

export class GetCellUnderPointerRequest {

  constructor(
    public event: IPointerEvent
  ) {
  }
}
