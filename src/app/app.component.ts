import {Component, inject, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {FooterMenuComponent} from './components/footer-menu/footer-menu.component';
import {GameService} from './db/services/game.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private gameService = inject(GameService);
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(event => {
      this.validateGames();
    });
  }

  validateGames() {
    this.gameService.getGameCount().then(count => {
      if (count === 0 && this.router.url !== '/games') {
        this.router.navigate(['/games']);
      }
    });
  }
}
