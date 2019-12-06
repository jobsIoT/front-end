import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JourneysPageRoutingModule } from './journeys-routing.module';

import { JourneysPage } from './journeys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JourneysPageRoutingModule
  ],
  declarations: [JourneysPage]
})
export class JourneysPageModule {}
