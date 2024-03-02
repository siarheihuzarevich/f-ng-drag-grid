import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-header-row',
  templateUrl: './f-header-row.component.html',
  styleUrl: './f-header-row.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'f-component f-header-row'
  }
})
export class FHeaderRowComponent {

}

