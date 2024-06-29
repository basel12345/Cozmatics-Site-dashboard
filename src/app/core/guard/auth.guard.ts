import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user && token && route.data?.['role'] === JSON.parse(user).role) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};