import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCheckmarkComponent } from './basic/icon-checkmark.component';
import { IconEyeComponent } from './basic/icon-eye.component';
import { IconLoadingComponent } from './animated/icon-loading.component';
import { IconPlusComponent } from './basic/icon-plus.component';
import { IconCloseComponent } from './basic/icon-close.component';


@NgModule({
  declarations: [
    IconCheckmarkComponent,
    IconEyeComponent,
    IconLoadingComponent,
    IconPlusComponent,
    IconCloseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconCheckmarkComponent,
    IconEyeComponent,
    IconLoadingComponent,
    IconPlusComponent,
    IconCloseComponent
  ]
})
export class IconsModule { }
