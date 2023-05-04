import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCheckmarkComponent } from './basic/icon-checkmark.component';
import { IconEyeComponent } from './basic/icon-eye.component';
import { IconLoadingComponent } from './animated/icon-loading.component';


@NgModule({
  declarations: [
    IconCheckmarkComponent,
    IconEyeComponent,
    IconLoadingComponent

  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconCheckmarkComponent,
    IconEyeComponent,
    IconLoadingComponent
  ]
})
export class IconsModule { }
