import { UserService } from './core/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-avance';

  public constructor(
    private userService: UserService
  ) {}
}
