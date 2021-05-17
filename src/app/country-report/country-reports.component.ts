import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../services/corona.service';
import { Country } from '../Country';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-country-reports',
  templateUrl: './country-reports.component.html',
  styleUrls: ['./country-reports.component.css'],
})
export class CountryReportsComponent implements OnInit {
  displayedColumns: string[] = [
    'Country',
    'Confirmed',
    'Active',
    'Death',
    'Recovered',
    'Date',
  ];
  countries: Country[] = [];
  CountryReports: any[] = [];
  country: string = '';
  countryCases: number[] = [0, 0, 0, 0];
  countryActiveCases: number[] = [];
  countryConfirmedCases: number[] = [];
  countryDeathCases: number[] = [];
  countryRecoveredCases: number[] = [];
  Dates: string[] = [];

  constructor(private corona: CoronaService) {}

  ngOnInit(): void {
    this.corona.getCountry().subscribe((res) => {
      this.countries = res;
    });
  }

  getCoronaData() {
    this.corona.countryReports(this.country).subscribe((res) => {
      this.CountryReports = res;
      this.CountryReports.forEach((value) => {
        this.countryCases[0] += value.Active;
        this.countryCases[1] += value.Confirmed;
        this.countryCases[2] += value.Deaths;
        this.countryCases[3] += value.Recovered;
      });
      var myChart = new Chart('my-chart', {
        type: 'bar',
        data: {
          labels: ['Active', 'Confirmed', 'Death', 'Recovered'],
          datasets: [
            {
              label: 'Covid Reports',
              data: this.countryCases,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }

  getCountry(country: any) {
    this.country = country;
    console.log(country);
  }
}
