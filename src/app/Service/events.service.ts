import { EventsInstance, NewAction } from './../Model/EventsList.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  [x: string]: any;
  private _posturl = 'https://loggitor-be.herokuapp.com/events';
  private _posturl2 = 'https://loggitor-be.herokuapp.com/viewEvents/1/100';

  constructor(private http: HttpClient) {
   }
   getPosts(): Observable<EventsInstance[]> {
     return this.http.get<EventsInstance[]>(this._posturl2);
   }

     /** DELETE: delete the hero from the server */
  deleteAction (action: EventsInstance | number): Observable<NewAction> {
    const id = typeof action === 'number' ? action : action.id;
    const url = `${this._posturl2}/${id}`;

    return this.http.delete<NewAction>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted action id=${id}`)),
      catchError(this.handleError<NewAction>('deleteAction'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}