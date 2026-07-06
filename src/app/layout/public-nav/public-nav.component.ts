import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-public-nav',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './public-nav.component.html',
    styleUrl: './public-nav.component.scss',
})
export class PublicNavComponent { }