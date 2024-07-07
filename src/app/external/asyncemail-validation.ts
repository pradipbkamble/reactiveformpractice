import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";





export class Asyncemail{
    static Asyncemailvalid(control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>{
        let val=control.value;

        const promise = new Promise<ValidationErrors | null>((resolve,reject)=>{
            setTimeout(() => {
                if(val === 'john@gmail.com'){
                    resolve({
                        emailExistMsg : 'Email Already Exists!'
                    })
                }
                else{
                    resolve(null)
                }
            }, 2000);
        })
        return promise
    }
}