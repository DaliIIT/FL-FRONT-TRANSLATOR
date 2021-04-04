import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {UserService} from 'src/app/core/services/api/user.service';
import {map, switchMap, tap} from 'rxjs/operators';

export class UserValidators {
    static exists(userService: UserService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return timer(1000).pipe(switchMap(() => userService.exists(control.value).pipe(
                tap((x) => console.log(!!x)),
                map((result: boolean) => !result ? null : {userExists: true}),
            )), tap((x) => console.log(x)));
        };
    }
}
