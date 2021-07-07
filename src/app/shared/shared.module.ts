import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScramblePipe } from './pipes/scramble.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { SortDirective } from './directives/sort.directive';

/**
 * Sets Material modules to use
 */
const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
];


@NgModule({
  declarations: [
    ScramblePipe,
    TimeAgoPipe,
    SortDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...materials,
    ScramblePipe,
    TimeAgoPipe,
    SortDirective
  ]
})
export class SharedModule { }
