import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { YoutubeApiInterceptor } from './youtube/services/youtube-api.interceptor';
import { YoutubeFetchService } from './youtube/services/youtube-fetch.service';

const INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: YoutubeApiInterceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
  ],
  providers: [YoutubeFetchService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
class AppModule {}

export default AppModule;
