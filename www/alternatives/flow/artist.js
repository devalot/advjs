/* @flow */

type ArtistFields = {
  name: string;
  website?: string;
};

class Artist {
  name: string;
  website: ?string;

  static fetchAll(f: (artists: Array<Artist>) => void): void {
    var request = new XMLHttpRequest();

    request.addEventListener("load", e => {
      if (request.status >= 200 && request.status < 300) {
        f(JSON.parse(request.responseText).map(o => new Artist(o)));
      }
    });

    request.open("GET", "/api/artists");
    request.send();
  }

  constructor(fields: ArtistFields) {
    this.name = fields.name;
    this.website = fields.website;
  }
}

declare class Mustache {
  static render(template: string, obj: any): string;
}

function render(artists: Array<Artist>): void {
  var view = document.getElementById('view');
  var tpl  = document.getElementById('artists').innerHTML;
  view.innerHTML = Mustache.render(tpl, {artists: artists});
}
