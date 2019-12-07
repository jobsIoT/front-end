import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../validators/password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validationsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private navCtrl: NavController
  ) { }


  validationMessages = {
    firstname: [
      { type: 'required', message: 'Firstname is required' }
    ],
    lastname: [
      { type: 'required', message: 'Lastname is required' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password needs to be at least 5 characters' },
      { type: 'pattern', message: 'Password should contains 1 character, 1 capital character and 1 number' }
    ],
    confirm_password: [
      { type: 'required', message: 'Password confirmation is required' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Passwords don\'t match' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Invalid email address' }
    ],
  };

  ngOnInit() {
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validationsForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matchingPasswordsGroup,
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  onSubmit(values) {
    this.authService.signup(values.firstname, values.lastname, values.email, values.matching_passwords.password)
    .subscribe(
      data => {
        this.alertService.presentToast('Sign up succeed');
        this.navCtrl.navigateRoot('/journeys');
      },
      error => {
        if (error.status === 400) {
          this.alertService.presentToast('User already exist');
        }
      },
    );
  }

}
