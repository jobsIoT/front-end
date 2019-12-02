import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class SigninPage implements OnInit {

  validations_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required),
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  onSubmit(values){
    this.authService.login(values.email, values.password).subscribe(
      data => {
        console.log('login data', data)
          this.alertService.presentToast("Connexion réussi !");
          console.log("user id", this.authService.getUserId());
          this.navCtrl.navigateRoot('/dashboard');
      },
      error => {
        console.log("error", error.status);
        if (error.status == 400) {
          this.alertService.presentToast("Le mot de passe est incorrect");
        }
        else if (error.status == 404) {
          this.alertService.presentToast("L'utilisateur n'existe pas");
        }
        else
          this.alertService.presentToast("Une erreur s'est produite ");
      }
    );
  }

}

