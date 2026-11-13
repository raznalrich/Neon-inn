import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { POLICIES } from './policies.data';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.html',
  styleUrl: './policy.scss',
})
export class Policy {
  private route = inject(ActivatedRoute);
  private key = toSignal(this.route.data.pipe(map(d => d['policy'] as string)), { initialValue: '' });
  policy = computed(() => POLICIES[this.key()]);
}
