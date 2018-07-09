import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutes } from './app-routes';

import { OrderManagerService } from './order-manager/services/order-manager.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/components/header/header.component';
import { OrderManagerComponent } from './order-manager/components/order-manager/order-manager.component';
import { AddTableModalComponent } from './order-manager/components/add-table-modal/add-table-modal.component';
import { ConfirmationModalComponent } from './order-manager/components/confirmation-modal/confirmation-modal.component';
import { EditServerComponent } from './order-manager/components/edit-server/edit-server.component';
import { EditOrdersComponent } from './order-manager/components/edit-orders/edit-orders.component';
import { ViewOrdersModalComponent } from './order-manager/components/view-orders-modal/view-orders-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrderManagerComponent,
    AddTableModalComponent,
    ConfirmationModalComponent,
    EditServerComponent,
    EditOrdersComponent,
    ViewOrdersModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
    AppRoutes,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    OrderManagerService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTableModalComponent,
    ConfirmationModalComponent,
    ViewOrdersModalComponent
  ]
})
export class AppModule { }
