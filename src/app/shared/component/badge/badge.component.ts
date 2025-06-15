import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-badge',
  imports: [NgClass],
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  badge = input<'success' | 'warning' | 'danger'>('danger');
  text = input<string>('');
}
