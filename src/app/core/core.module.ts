import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserLoginPanelComponent } from '../auth/components/user-login-panel/user-login-panel.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { CreateCardPageComponent } from './pages/create-card-page/create-card-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserLoginPanelComponent,
    CreateCardPageComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, UserLoginPanelComponent],
})
export class CoreModule {}
