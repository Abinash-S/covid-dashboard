import { CoronaService } from '../services/corona.service';
import { CountryReports } from '../CountryReports';
import { Chart } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

export interface Global {
  Date: string;
  NewConfirmed: number;
  NewRecovered: number;
  NewDeaths: number;
  TotalConfirmed: number;
  TotalRecovered: number;
  TotalDeaths: number;
}
@Component({
  selector: 'app-world-reports',
  templateUrl: './world-reports.component.html',
  styleUrls: ['./world-reports.component.css'],
})
export class WorldReportsComponent implements OnInit {
  displayedColumns: string[] = [
    'Country',
    'CountryCode',
    'NewConfirmed',
    'TotalConfirmed',
    'NewRecovered',
    'TotalRecovered',
    'NewDeaths',
    'TotalDeaths',
  ];
  dataSource: any;
  sortedData : any;
  Countries: any;
  globalData: number[] = [];
  globalLables: string[] = ['Recoverd', 'Confirmed', 'Deaths'];

  constructor(private corona: CoronaService) {}

  ngOnInit(): void {
    this.corona.worldReports().subscribe((res) => {
      this.dataSource = res;
      this.globalData.push(this.dataSource.Global.TotalConfirmed);
      this.globalData.push(this.dataSource.Global.TotalRecovered);
      this.globalData.push(this.dataSource.Global.TotalDeaths);

      this.Countries = new MatTableDataSource(res.Countries);

      var myChart = new Chart('my-chart', {
        type: 'pie',
        data: {
          labels: this.globalLables,
          datasets: [
            {
              label: 'Global Reports',
              data: this.globalData,
              backgroundColor: ['rgba(0,255,0,0.2)', 'rgba(0,0,255,0.5)', 'rgba(255,0,0,0.5)'],
            },
          ],
        },
      });
    });
    
  }
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.Countries.sort) {
        this.Countries.sort = sort;
    }
}

  
}

