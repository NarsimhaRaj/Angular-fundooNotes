import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'
import { HttpService } from 'src/app/services/httpServices/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Contorllers for Validation
  registerFormGroup:FormGroup;
  hide:Boolean = true;
  
  constructor(private httpService: HttpService,private formBuilder:FormBuilder) {
    this.registerFormGroup=this.formBuilder.group({
      "email":new FormControl('',[Validators.email,Validators.required]),
      "firstName":new FormControl('',[Validators.required]),
      "lastName":new FormControl('',[Validators.required]),
      "password":new FormControl('',[Validators.minLength(8),Validators.required]),
      "confirmPassword":new FormControl('',[])
    })
   }

   //register new user to database
   register(){
     var newUser={
      
      firstName:this.registerFormGroup.get("firstName").value,
      lastName:this.registerFormGroup.get("lastName").value,
      email:this.registerFormGroup.get("email").value,
      password:this.registerFormGroup.get("password").value,
      confirmPassword:this.registerFormGroup.get("confirmPassword").value,
      service:"basic"
     }
      this.httpService.register(newUser).subscribe((response)=>{
        console.log(response);
      });
   }
  ngOnInit() {
  }

}
