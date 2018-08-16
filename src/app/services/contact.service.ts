import { Injectable } from '@angular/core';
import { AbstractService } from 'app/services/abstract.service';
import { ContactRequest } from 'app/models/request/contact.request';
import { Contact } from 'app/models/contact';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const CONTACT_API_URL = '/api/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends AbstractService<ContactRequest, Contact> {

  constructor(private http: HttpClient, private router: Router) {
      super(http, router, CONTACT_API_URL);
  }
}
