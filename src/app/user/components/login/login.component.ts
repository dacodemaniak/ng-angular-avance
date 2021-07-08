import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    'login': [
      '',
      Validators.required
    ],
    'password': [
      '',
      Validators.required
    ]
  });

  public showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public get c():any {
    return this.form.controls;
  }

  public doLogin(): void {
    this.userService.login(this.form.value)
      .pipe(
        take(1)
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.userService.storeUserSession(response.body.message);
        } else {
          this.form.reset();
        }
      });
  }
}
