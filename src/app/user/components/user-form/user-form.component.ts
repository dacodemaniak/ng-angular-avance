import { UserModel } from './../../../core/models/user-model';
import { UserService } from './../../../core/services/user.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Input() form!: FormGroup;
  @Output() newUser: EventEmitter<UserModel> = new EventEmitter();

  public hide = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('user form is destroyed');
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public addUser(): void {
    this.subscriptions.push(
      this.userService.addUser(new UserModel().hydrate(this.form.value))
        .subscribe((user: UserModel) => {
          console.log(`${user instanceof UserModel ? 'ok' : 'ko'} son ID est ${user.getId()}`);
          this.newUser.emit(user);
      })
    );
  }
}
