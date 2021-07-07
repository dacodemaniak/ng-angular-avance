import { UserModel } from './../models/user-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) {
    console.log('UserService is up');
  }

  public add(user: any): void {
    console.log(`Utilisateur à créer : ${JSON.stringify(user)}`);
    this.httpClient.post(
      'http://localhost:4200/api/v1/user',
      user
    ).subscribe((result: any) => {
      console.log(`Utilisateur créé : ${JSON.stringify(result)}`);
    });
  }

  public addUser(user: any): Observable<UserModel> {
    console.log(`Utilisateur à créer : ${JSON.stringify(user)}`);
    return this.httpClient.post(
      'http://localhost:4200/api/v1/user',
      user
    ).pipe(
      take(1),
      map((result: any) => {
        const userModel: UserModel = new UserModel().hydrate(result);
        return userModel;
      })
    );
  }


  public update(user: any): any {}

  public delete(user: any): any {}

  public all(): Observable<UserModel[]> {
    return this.httpClient.get<any[]>(
      'http://localhost:4200/api/v1/user'
    ).pipe(
      take(1), // Tableau de any
      map((results: any[]) => { // Transforme l'Observable d'origine en un autre Observable
        return results.map((result: any) => new UserModel().hydrate(result));
      })
    );
  }
}
