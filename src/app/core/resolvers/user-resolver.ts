import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, take, tap } from "rxjs/operators";
import { UserModel } from "../models/user-model";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any> {

    public constructor(
        private userService: UserService,
        private router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Observable<void> {
        // Récupérer la partie paramétrée de la route
        const id: any = route.paramMap.get('id');
        
        // S'assurer qu'il y a bien un id transmis
        if (id !== null && !isNaN(id)) {
            return this.userService.findOne(id)
                .pipe(
                    take(1),
                    tap((data) => console.log('Tap says' + JSON.stringify(data))),
                    catchError((error: any) => {
                        console.log(`Erreur ${error}`)
                        return this.errorHandler(error)
                    })
                );
        } else {
            console.log(`Something's bad with the id : ${id}`);
            return this.errorHandler('401');
        }
    }

    private errorHandler(error: any): Observable<any> {
        console.log(`Got error from backend : ${error}`);
        if (error == 'Error: 404') {
            this.router.navigate(['/', 'user', 'admin']);
        } else {
            this.router.navigate(['/']);
        }
        return of(null);
    }
}
