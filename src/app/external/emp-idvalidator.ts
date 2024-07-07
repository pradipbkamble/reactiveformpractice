import { AbstractControl, ValidationErrors } from "@angular/forms";



export class Empidvalidator{
    static Empvalidid(control:AbstractControl):ValidationErrors|null{
        let empid=control.value as string

        if(empid){
            let reg=/^[P]\d{4}$/i;
            
            let isvalid=reg.test(empid);
            return isvalid ? null :{ isvalidmsg : 'inavlid massage start with P and four digits'}
        }
        else{
            return null
        }

    }
}