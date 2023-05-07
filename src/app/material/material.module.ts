import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const materialComponents: Array<object> = [MatButtonModule, MatIconModule];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
})
export class MaterialModule {}
