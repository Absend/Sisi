import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }

  getTasks(): Observable<any> {
    return this.http.get('/tasks').map(res => (res.json()));
  }

  addTask(task: any): Observable<any> {
    return this.http.post('/tasks', JSON.stringify(task), this.options);
  }

  editTask(task: any): Observable<any> {
    return this.http.put(`/tasks/${task._id}`, JSON.stringify(task), this.options);
  }

  deleteTask(task: any): Observable<any> {
    return this.http.delete(`/tasks/${task._id}`, this.options);
  }
}
