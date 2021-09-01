import { BreakpointObserver } from '@angular/cdk/layout';
import { ApplicationRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { CoronaService } from './services/corona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  title = 'CoronaTracker';
  dataSource: any;
  date: string = '';
  private readonly publicKey = 'BBROWcygLzL7DgwkIymAuhkG-4qGgX5-lV7Y0IxzWUDV5GWWUTUiDj1q3hcvDnzs0E6OUcY2eJOdfs7dTL6FL3c';

  constructor(private corona: CoronaService,private observer: BreakpointObserver,private swPush: SwPush,private update: SwUpdate,
    private appRef: ApplicationRef,) {
      this.updateClient();
    this.checkUpdate();
    }

  ngAfterViewInit() {
    this.pushSubscription();
    this.corona.worldReports().subscribe((res) => {
      this.dataSource = res;
      this.date = this.dataSource.Global.Date;
    });
    this.observer.observe(['(max-width: 1000px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  updateClient() {
    if (!this.update.isEnabled) {
      console.log('Not Enabled',this.update.isEnabled);
      return;
    }
    this.update.available.subscribe((event) => {
      console.log(`current`, event.current, `available `, event.available);
      if (confirm('update available for the app please conform')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log(`current`, event.previous, `available `, event.current);
    });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.update.checkForUpdate().then(() => console.log('checked'));
          console.log('update checked');
        });
      }
    });
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled',this.swPush.isEnabled);
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        // Make a post call to serve
        console.log(JSON.stringify(sub));
      })
      .catch((err) => console.log(err));
  }
}
