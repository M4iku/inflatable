import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-footer-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-menu.component.html',
  styleUrl: './footer-menu.component.scss'
})
export class FooterMenuComponent {

}
