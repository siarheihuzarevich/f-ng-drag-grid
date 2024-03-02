import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-body-row',
  templateUrl: './f-body-row.component.html',
  styleUrl: './f-body-row.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'f-component f-body-row'
  }
})
export class FBodyRowComponent {

}

