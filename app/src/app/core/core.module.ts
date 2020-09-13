import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule} from '../shared/shared.module';
import { LogService } from './log-services/log.service';
import { LogPublishersService } from './log-services/log-publishers.service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FakeBackendInterceptor } from './auth/fakebackend.service';
import { AccessModule } from '../features/access/access.module';
import { CacheInterceptor } from './cache/cache.interceptor';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AccessModule,
  ],
  exports: [],
  providers: [
    LogService,
    LogPublishersService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true } ,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  ]
})
export class CoreModule { }
