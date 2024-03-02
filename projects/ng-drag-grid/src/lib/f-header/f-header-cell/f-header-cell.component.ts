import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-header-cell',
  templateUrl: './f-header-cell.component.html',
  styleUrl: './f-header-cell.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'f-component f-cell f-header-cell'
  }
})
export class FHeaderCellComponent {

}
