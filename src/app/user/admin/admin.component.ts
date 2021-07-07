import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/user-model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface Employee {
  lastName: string;
  firstName: string;
  birthDate: Date;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public form: FormGroup;
  public users: any[] = [];
  private snackConfig: MatSnackBarConfig = {
    duration: 2000
  };

  public employees: Employee[] = [
    {
      lastName: 'Aubert',
      firstName: 'Jean-Luc',
      birthDate: new Date('1968-04-30')
    },
    {
      lastName: 'Tartempion',
      firstName: 'Propsper',
      birthDate: new Date('1988-05-07')
    }
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    const usernameField = new FormControl();
    usernameField.setValidators(Validators.required);

    const passwordField = new FormControl();
    passwordField.setValidators([
      Validators.required,
      Validators.minLength(8)
    ]);

    const emailField = new FormControl();
    emailField.setValidators([
      Validators.required,
      Validators.email
    ]);

    this.form.addControl('username', usernameField);
    this.form.addControl('password', passwordField);
    this.form.addControl('email', emailField);

    // Récupérer la liste des utilisateurs
    this.userService.all().subscribe((users: UserModel[]) => {
      this.users = users;
    });
  }

  public addUser(user: UserModel): void {
    this.form.reset();
    this.users.push(user);
    this.snackBar.open(
      `${user.getUsername()} a été créé`,
      'Fermer',
      this.snackConfig
    )
  }
}
