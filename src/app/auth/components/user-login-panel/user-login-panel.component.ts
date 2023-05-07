import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-login-panel',
  templateUrl: './user-login-panel.component.html',
  styleUrls: ['./user-login-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginPanelComponent {
  @Input() _isAuth!: boolean;

  @Input() _email!: string;

  authSubscription!: Subscription;

  constructor(private route: Router, private auth: AuthService) {}

  onLogOut() {
    this.auth.logOut();
  }

  onIconClick() {
    this.route.navigate(['/create-card']);
  }
}
