import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-header',
  templateUrl: './f-header.component.html',
  styleUrl: './f-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'f-component f-header'
  }
})
export class FHeaderComponent {

}

