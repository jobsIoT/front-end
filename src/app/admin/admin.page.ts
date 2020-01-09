import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private adminService: AdminService,
              private alertService: AlertService) { }
  protected users: any;

  ngOnInit() {
    this.loadUsers();
  }

   loadUsers() {
    this.adminService.load_users()
    .subscribe(
      data => {
        this.users = data;
      },
      error => {
        if (error.status === 400) {
          this.alertService.presentToast('Failed to contact backend');
        } else if (error.status === 500) {
          this.alertService.presentToast('Internal server error');
        }
      },
    );
  }

  deleteUser(elem) {
      this.adminService.delete_users(elem)
        .subscribe(
          data => {
            this.loadUsers();
          },
          error => {
            if (error.status === 400) {
              this.alertService.presentToast('Failed to contact backend');
            } else if (error.status === 500) {
              this.alertService.presentToast('Internal server error');
            }
          },
        );
  }



}
