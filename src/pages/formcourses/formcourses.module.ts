import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormcoursesPage } from './formcourses';

@NgModule({
  declarations: [
    FormcoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(FormcoursesPage),
  ],
})
export class FormcoursesPageModule {}
