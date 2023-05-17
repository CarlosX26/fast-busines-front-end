import { ProfileService } from "./services/profile.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private profileService: ProfileService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = JSON.parse(localStorage.getItem("@fastbusines:access")!);

    if (!token) {
      this.router.navigate(["/auth"]);
      return false;
    }

    return this.profileService
      .getProfile()
      .toPromise()
      .then(() => {
        return true;
      })
      .catch(() => {
        this.router.navigate(["/auth"]);
        return false;
      });
  }
}
