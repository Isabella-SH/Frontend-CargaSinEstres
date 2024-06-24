// carga-sin-estres-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reservation } from '../models/reservation.model';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaSinEstresDataService {
  primary_base_url_users = environment.baseURL_Users;
  backup_base_url_users = environment.backup_baseURL_Users;
  primary_base_url_bussiness = environment.baseURL_Bussiness;
  backup_base_url_bussiness = environment.backup_baseURL_Bussiness;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`Ocurrió un error: ${error.status}, el cuerpo fue: ${error.error}`);
    } else {
      console.log(`El servidor respondió con el código ${error.status}, el cuerpo fue: ${error.error}`);
    }
    return throwError('Ha ocurrido un problema con la solicitud, por favor inténtalo de nuevo más tarde');
  }

  private makeRequest<T>(url: string, method: string = 'GET', data?: any): Observable<T> {
    const request$ = method === 'GET' ? this.http.get<T>(url, this.httpOptions) : this.http.post<T>(url, JSON.stringify(data), this.httpOptions);
    return request$.pipe(
        retry(2),
        catchError(error => {
          console.log(`Error con la URL primaria: ${url}`);
          const backupUrl = url.replace(this.primary_base_url_users, this.backup_base_url_users).replace(this.primary_base_url_bussiness, this.backup_base_url_bussiness);
          console.log(`Intentando con la URL de respaldo: ${backupUrl}`);
          const backupRequest$ = method === 'GET' ? this.http.get<T>(backupUrl, this.httpOptions) : this.http.post<T>(backupUrl, JSON.stringify(data), this.httpOptions);
          return backupRequest$.pipe(
              retry(2),
              catchError(this.handleError)
          );
        })
    );
  }

  //Company Controller ---------------------------------------------------------------
  getAllCompanies(): Observable<any> {
    const url = `${this.primary_base_url_users}/companies`;
    return this.makeRequest<any>(url);
  }

  getCompanyById(id: any): Observable<any> {
    const url = `${this.primary_base_url_users}/companies/${id}`;
    return this.makeRequest<any>(url);
  }

  getCompaniesForLogin(email: string, password: string): Observable<any> {
    const url = `${this.primary_base_url_users}/companiesForLogin?email=${email}&password=${password}`;
    return this.makeRequest<any>(url);
  }

  createCompany(data: any): Observable<any> {
    const url = `${this.primary_base_url_users}/companies`;
    return this.makeRequest<any>(url, 'POST', data);
  }

  updateCompany(id: any, data: any): Observable<any> {
    const url = `${this.primary_base_url_users}/companies/${id}`;
    return this.makeRequest<any>(url, 'PATCH', data);
  }

  //BookingHistory Controller ---------------------------------------------------------------
  createReservation(customerId: any, companyId: any, item: any): Observable<Reservation> {
    const url = `${this.primary_base_url_bussiness}/reservations?customerId=${customerId}&idCompany=${companyId}`;
    return this.makeRequest<Reservation>(url, 'POST', item);
  }

  getReservationByCustomerId(clientId: any): Observable<Reservation> {
    const url = `${this.primary_base_url_bussiness}/reservations/customer/${clientId}`;
    return this.makeRequest<Reservation>(url);
  }

  getReservationByCompanyId(companyId: any): Observable<Reservation> {
    const url = `${this.primary_base_url_bussiness}/reservations/company/${companyId}`;
    return this.makeRequest<Reservation>(url);
  }

  //update status
  updateReservationStatus(companyId: any, status: string, data: any): Observable<any> {
    const url = `${this.primary_base_url_bussiness}/reservations/${companyId}/status?status=${status}`;
    return this.makeRequest<any>(url, 'PATCH', data);
  }

  //update payment
  updateReservationPayment(id: any, price: any, startDate: any, startTime: any): Observable<Reservation> {
    if (startDate instanceof Date) {
      startDate = startDate.toISOString().split('T')[0];
    }
    const url = `${this.primary_base_url_bussiness}/reservations/${id}/price-startDate-startTime?price=${price}&startDate=${startDate}&startTime=${startTime}`;
    return this.makeRequest<Reservation>(url, 'PATCH', { id, price, startDate, startTime });
  }

  //update end date and end time
  updateReservationEndDateAndEndTime(id: any, endDate: String, endTime: string): Observable<Reservation> {
    const url = `${this.primary_base_url_bussiness}/reservations/${id}/endDate-endTime`;
    return this.makeRequest<Reservation>(url, 'PATCH', { endDate, endTime });
  }

  //Chat Controller ---------------------------------------------------------------
  updateReservationMessage(id: any, userType: any, data: any): Observable<any> {
    const url = `${this.primary_base_url_bussiness}/messages/${id}`;
    const requestData = { content: data, userType };
    return this.makeRequest<any>(url, 'POST', requestData);
  }

  getMessagesByReservation(reservationId: any): Observable<any> {
    const url = `${this.primary_base_url_bussiness}/messages/${reservationId}`;
    return this.makeRequest<any>(url);
  }

  //Client Controller ---------------------------------------------------------------
  getCustomersForLogin(email: string, password: string): Observable<any> {
    const url = `${this.primary_base_url_users}/customers?email=${email}&password=${password}`;
    return this.makeRequest<any>(url);
  }

  createCustomer(data: any): Observable<any> {
    const url = `${this.primary_base_url_users}/customers`;
    return this.makeRequest<any>(url, 'POST', data);
  }

  //for settings
  updateCustomer(id: any, data: any): Observable<any> {
    const url = `${this.primary_base_url_users}/customers/${id}`;
    return this.makeRequest<any>(url, 'PATCH', data);
  }

  //get client by id
  getCustomerById(customerId: any): Observable<any> {
    const url = `${this.primary_base_url_users}/customers/${customerId}`;
    return this.makeRequest<any>(url);
  }

  //Services Controller ------------------------------------------------------------------

  getAllServicios() {
    const url = `${this.primary_base_url_bussiness}/services`;
    return this.makeRequest<any>(url);
  }

  getAllServices(): Observable<any> {
    const url = `${this.primary_base_url_bussiness}/services`;
    return this.makeRequest<any>(url);
  }

  //Subscription Controller ---------------------------------------------------------------
  createMembership(companyId: any, data: any): Observable<any> {
    const url = `${this.primary_base_url_bussiness}/memberships/${companyId}`;
    return this.makeRequest<any>(url, 'POST', data);
  }

  searchExistingMembership(companyId: any): Observable<boolean> {
    const url = `${this.primary_base_url_bussiness}/subscriptions/${companyId}`;
    return this.makeRequest<any[]>(url).pipe(
        map((subscriptions: any[]) => subscriptions.length > 0)
    );
  }

  //Review Controller ---------------------------------------------------------------
  addReview(companyId: any, review: any): Observable<any> {
    const url = `${this.primary_base_url_bussiness}/reviews/${companyId}`;
    return this.makeRequest<any>(url, 'POST', review);
  }

  getReviewsByCompanyId(companyId: any): Observable<any> {
    const url = `${this.primary_base_url_bussiness}/reviews/${companyId}`;
    return this.makeRequest<any>(url);
  }

  // Obtain companies by status of the reservation
  getReservationsByCompanyIdAndStatus(companyId: any, status: string): Observable<Reservation[]> {
    const url = `${this.primary_base_url_bussiness}/reservations/company/${companyId}?status=${status}`;
    return this.makeRequest<Reservation[]>(url);
  }
}