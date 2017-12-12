import { Component, OnInit } from '@angular/core';
import { Artist } from './artist';
import { ArtistService } from './artist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Discography';
  artists: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.fetchAll().
      then(artists => this.artists = artists);
  }
}
