import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './UserManagement/components/login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/shared/material.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import { ToolbarLandingComponent } from './Public/components/toolbar-landing/toolbar-landing.component';
import { FooterComponent } from './Public/components/footer/footer.component';
import { LandingPageComponent } from './Public/components/landing-page/landing-page.component';
import { ChatDialogComponent } from './BookingHistory/components/chat-dialog/chat-dialog.component';
import { ActiveReservationsComponent } from './BookingHistory/components/active-reservations/active-reservations.component';
import { CompanyDetailComponent } from './CompanySearch/components/company-detail/company-detail.component';
import { CompanyTableComponent } from './CompanySearch/components/company-table/company-table.component';
import { MembershipComponent } from './Memberships/components/membership/membership.component';
import { PaymentFormComponent } from './Memberships/components/payment-form/payment-form.component';
import { ClientFormComponent } from './UserManagement/components/client-form/client-form.component';
import { ClientSettingsComponent } from './UserManagement/components/client-settings/client-settings.component';
import { CompanyFormComponent } from './UserManagement/components/company-form/company-form.component';
import { CompanySettingsComponent } from './UserManagement/components/company-settings/company-settings.component';
import { ToolbarClientComponent } from './Public/components/toolbar-client/toolbar-client.component';
import { ToolbarCompanyComponent } from './Public/components/toolbar-company/toolbar-company.component';
import { ReviewDialogComponent } from './BookingHistory/components/review-dialog/review-dialog.component';
import { EditPaymentDialogComponent } from './BookingHistory/components/edit-payment-dialog/edit-payment-dialog.component';
import { SignUpFormComponent } from './UserManagement/components/sign-up-form/sign-up-form.component';
import { PageNotFoundComponent } from './Public/components/page-not-found/page-not-found.component';
import { ReservationItemComponent } from './BookingHistory/components/reservation-item/reservation-item.component';
import { ReservationDetailComponent } from './BookingHistory/components/reservation-detail/reservation-detail.component';
import { CargaRapidaDialogComponent } from "./CompanySearch/components/cargaRapida-dialog/cargaRapida-dialog.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";

import { LanguageSelectionComponent } from "./Public/components/language-selection/language-selection.component";
import { ReservationHistoryComponent } from './BookingHistory/components/reservation-history/reservation-history.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ToolbarLandingComponent,
    FooterComponent,
    LandingPageComponent,
    ChatDialogComponent,
    ActiveReservationsComponent,
    CompanyDetailComponent,
    CompanyTableComponent,
    MembershipComponent,
    PaymentFormComponent,
    ClientFormComponent,
    ClientSettingsComponent,
    CompanyFormComponent,
    CompanySettingsComponent,
    ToolbarClientComponent,
    ToolbarCompanyComponent,
    ReviewDialogComponent,
    EditPaymentDialogComponent,
    SignUpFormComponent,
    PageNotFoundComponent,
    LanguageSelectionComponent,
    ReservationItemComponent,
    ReservationDetailComponent,
    ReservationHistoryComponent,
    CargaRapidaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en', loader: {
        provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient]
      }
    }),
    RouterModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
