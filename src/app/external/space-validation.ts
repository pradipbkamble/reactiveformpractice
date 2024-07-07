import { AbstractControl,ValidationErrors } from "@angular/forms";




export class Nospace{
    static noSPaceValidator(controls:AbstractControl): ValidationErrors | null{
        let val=controls.value as String;
        if(!val){
            return null;
        }
        if(val.includes(" ")){
            return{
                nospaceallowed:"no space allowed in username"
            }
            
        }
        else{
            return null
        }
    }
}