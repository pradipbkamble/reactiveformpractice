import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { CustomRegex } from './external/validations';
import { Nospace } from './external/space-validation';
import { Empidvalidator } from './external/emp-idvalidator';
import { Asyncemail } from './external/asyncemail-validation';
import { Icountry } from './external/interface ';
import { COUNTRIES_META_DATA } from './external/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genderarry = ["male", "femail", "others"]
  title = 'reactiveformpractice';
  forminput!: FormGroup;
  countries: Array<Icountry> = []
  changetype:boolean=true;
  changetypepass:boolean=true
  
  constructor() {

  }

  ngOnInit(): void {
    this.countries = COUNTRIES_META_DATA;
    console.log(this.countries);

    this.formcontrolsnmaes()
    this.cadd()
    this.padd()
    this.passwords()
    this.confirmpass()
    // this.countrys=COUNTRIES_META_DATA


  }

  formcontrolsnmaes() {
    this.forminput = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(4), Validators.pattern(CustomRegex.username), Nospace.noSPaceValidator]),
      email: new FormControl(null, [Validators.required, Asyncemail.Asyncemailvalid, Validators.pattern(CustomRegex.email)]),
      Empid: new FormControl(null, [Validators.required, Empidvalidator.Empvalidid, Validators.pattern(CustomRegex.email)]),
      gender: new FormControl(null),
      sameaddress: new FormControl(false),
      skills: new FormArray([new FormControl]),
      currentadress: new FormGroup({
        country: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        zipcoad: new FormControl(null)
      }),
      permanentadress: new FormGroup({
        country: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        zipcoad: new FormControl(null)
      }),
      password:new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
      passshow:new FormControl(false),
      conformpassword:new FormControl({value:null, disabled:true })
      
    })
  }
  

  get p() {
    return this.forminput.controls
  }

  get skillset() {
    return this.forminput.get("skills") as FormArray
  }
  skilladd() {
    let skill = new FormControl(null, Validators.required)
    this.skillset.push(skill)
  }

  skilldlt(dlt: number) {
    this.skillset.removeAt(dlt)
  }
  //adress patch

  cadd() {
    this.p['currentadress'].valueChanges
      .subscribe(res => {
        if (this.p['currentadress'].value) {
          this.p['sameaddress'].enable()
        }
        else {
          this.p['sameaddress'].disable(),
            this.p['permanentadress'].patchValue(false)
        }
      })
  }
 
  showofpass(){
    this.changetype=!this.changetype
  }
  showtextconf(){
   this.changetypepass=!this.changetypepass
  }
  padd() {
    this.p['sameaddress'].valueChanges
      .subscribe(res => {
        if (res) {
          this.p['permanentadress'].patchValue(this.p['currentadress'].value);
          this.p['permanentadress'].disable()
        }
        else{
          this.p['permanentadress'].reset()
          this.p['permanentadress'].enable()
        }
      })
  }

  passwords(){
    this.p['password'].valueChanges
    .subscribe(res=>{
      if(this.p['password'].valid){
        this.p['conformpassword'].enable()
      }
     else{
      this.p['conformpassword'].disable()
     }
    })
  }
confirmpass(){
  this.p['conformpassword'].valueChanges
  .subscribe(res=>{
    if(res!==this.p['password'].value){
      this.p['conformpassword'].setErrors({
        errmsg:'check password'
      })
    }
    else{
      this.p['conformpassword'].disable()
    }
  })
}
onsubmit() {
  if(this.forminput.valid){
   this.forminput.value
   console.log(this.forminput.value);
  }
 }

}
