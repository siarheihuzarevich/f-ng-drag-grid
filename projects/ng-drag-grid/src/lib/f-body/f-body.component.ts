import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-body',
  templateUrl: './f-body.component.html',
  styleUrl: './f-body.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'f-component f-body'
  }
})
export class FBodyComponent {

}

