import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  validationsForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required),
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  onSubmit(values) {
    this.authService.login(values.email, values.password).subscribe(
      data => {
        this.alertService.presentToast('Connexion réussi !');
        this.navCtrl.navigateRoot('/journeys');
      },
      error => {
        console.log('error', error.status);
        if (error.status === 400) {
          this.alertService.presentToast('Le mot de passe est incorrect');
        } else if (error.status === 404) {
          this.alertService.presentToast('L\'utilisateur n\'existe pas');
        } else {
          this.alertService.presentToast('Une erreur s\'est produite ');
        }
      }
    );
  }

}
