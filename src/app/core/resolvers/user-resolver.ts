import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // Récupérer la partie paramétrée de la route
        const id: any = route.paramMap.get('id');
        
        // S'assurer qu'il y a bien un id transmis
        if (id !== null && !isNaN(id)) {

        } else {
            console.log(`Something's bad with the id : ${id}`);
        }
    }

}
