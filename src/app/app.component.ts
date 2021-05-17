import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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

  constructor(private corona: CoronaService,private observer: BreakpointObserver) {}


  ngOnInit() {
    this.corona.worldReports().subscribe((res) => {
      this.dataSource = res;
      this.date = this.dataSource.Global.Date;
    });
  }

  ngAfterViewInit() {
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
}
