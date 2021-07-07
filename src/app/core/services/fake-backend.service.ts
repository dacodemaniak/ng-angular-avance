import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  mergeMap,
  materialize,
  dematerialize,
  delay
} from 'rxjs/operators';

import {
  ok
} from './../../_helpers/http-helpers';

const users: any[] = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')!) : [];

const routeMatchers: Map<string, {path: RegExp, method: string, action: any}> = new Map()
  .set(
    'all_users',
    {
      path: /\api\/v1\/user+$/,
      method: 'GET',
      action: () => {
        console.log(`${users.length} utilisateurs retournés`);
        return ok(users);
      }
    }
  )
  .set(
    'add_user',
    {
      path: /\api\/v1\/user+$/,
      method: 'POST',
      action: (...params: any[]): Observable<HttpEvent<any>> => {
        const nextId: number = users.length ?
          users.sort((u1: any, u2: any) => u2.id - u1.id)[0].id + 1 :
          1;

        const  user = params[0];
        user.id = nextId;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return ok(user);
      }
    }
  )
  .set(
    'user_byid',
    {
      path: /\api\/v1\/user\/\d+$/,
      method: 'GET',
      action: () => {
        return ok({message: 'GET on api/v1/user was intercepted'})
      }
    }
  )
  .set(
    'user_byname',
    {
      path: /\/api\/v1\/user\/\w+$/,
      method: 'GET',
      action: () => {
        return ok({message: 'GET on api/v1/user was intercepted'})
      }
    }
  )
  .set(
    'user_signin',
    {
      path: /\/api\/v1\/signin\/\w+\/\w+$/,
      method: 'GET',
      action: () => {
        return ok({message: 'GET on user_signin route was intercepted'})
      }
    }
  )

@Injectable()
class FakeBackendService implements HttpInterceptor {

  constructor() { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Déstructuration d'objet
    const { url, method, headers, body } = request;

    console.log(`URI ${method} ${url} was intercepted`);

    const handleRoute = (): Observable<HttpEvent<any>> => {
      const routes: {path: RegExp, method: string, action: any}[] = [...routeMatchers.values()];
      for (const route of routes) {
        if (route.path.test(url) && route.method === method) {
          return route.action(body);
        }
      }
      return next.handle(request);
    }

    return of(null)
      .pipe(
        mergeMap(handleRoute),
        materialize(),
        delay(500),
        dematerialize()
      );
  }
}


export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
}
