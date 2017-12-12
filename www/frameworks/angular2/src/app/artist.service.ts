import { Injectable } from '@angular/core';
import { Http       } from '@angular/http';
import { Artist     } from './artist';

import 'rxjs/add/operator/toPromise'

@Injectable()
export class ArtistService {
  constructor(private http: Http) { }

  fetchAll(): Promise<Artist[]> {
    return this.http.get('/api/artists').
      toPromise().
      then(r => r.json() as Artist[]);
  }
}
