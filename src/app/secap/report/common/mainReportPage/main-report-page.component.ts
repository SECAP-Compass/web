import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GasType, Measurement, MeasurementDate, MeasurementTypeHeader, Measurements } from 'src/app/secap/shared/measurement/measurement-type.model';
import { MeasurementService } from 'src/app/secap/shared/measurement/measurement.service';
import { DataViewType } from '../data-view.model';

@Component({
    selector: 'app-main-report-page',
    standalone: false,
    templateUrl: './main-report-page.component.html',
})
export class MainReportPageComponent implements OnInit {

  buildingId?: string;
  address?: string;
  city?: string;
  district?: string;


  measurements:Measurements
  emissionTypes: string[];
  gasTypes: string[];
  dataViewTypes: string[] = ["Tabular","Pie","Line","Bar"];

  selectedEmission:string=null;
  selectedGas:string=null;
  selectedDataView:string=null;
  dates:MeasurementDate=null;

  /* data */
  data: any;
  options: any;
  colorIncRate:number;
  dataSetLen:number;
  transparanecy:number;
  color: number;
  isGenerateReport:boolean

  constructor(private router: Router,private measurementService:MeasurementService) {}

  ngOnInit(): void {
    this.isGenerateReport = false;
    this.emissionTypes = this.measurementService.getMeasurementTypeHeadersHardcoded();
    this.gasTypes = this.measurementService.getGassesHardcoded();
    this.mockData();

    const navigation = this.router.getCurrentNavigation();
    /*
    if (navigation?.extras.state) {
      this.buildingId = navigation.extras.state['buildingId'];
      this.address = navigation.extras.state['address'];
      this.city = navigation.extras.state['city'];
      this.district = navigation.extras.state['district'];
    }
    */

  }

  mockData(): void{
    this.buildingId = "someID";
    this.address = "someAdress";
    this.city = "someCity";
    this.district = "someDistrict";
  }

  loadData():void{
    this.transparanecy = 0.5;
    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Total',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [],
            }
        ]
    }
    /*
    for(let i=0;i<this.emissionTypes.length;i++){
      let dataset = {
        label:this.emissionTypes[i],
        data:[],
        backgroundColor: [],
      }
      this.data.datasets.push(dataset)
    }
    */
  }

  setDataViews(){
    this.setDatasetColors();
    this.setDataViewSettings();

  }

  setDataViewSettings(){
    if(this.selectedDataView!="Pie"){
      this.options = {
        scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      drawBorder: false
                  }
              },
              x: {
                  grid: {
                    drawBorder: false
                  }
              }
        },
        title: {
          display: true,
          text: 'Pie-Chart',
          fontSize: 16
         },
        legend: {
         position: 'bottom'
        },
      };
    }
    else{
      this.options = {
        title: {
          display: true,
          text: 'Pie-Chart',
          fontSize: 16
         },
        legend: {
         position: 'bottom'
        },
      }
    }
  }

  setDatasetColors(){
    this.dataSetLen = this.data.datasets[0].data.length;
    this.colorIncRate = Math.floor(255/this.dataSetLen);
    this.color = this.colorIncRate;
    const colors:string[] = [];
    for (let i = 0; i < this.dataSetLen; i++){
        let colorString;
        if(this.color%3 == 1){
            colorString = 'rgba(' + this.color + ',255,100,' + this.transparanecy + ')';
        }
        else if(this.color%3 == 2){
            colorString = 'rgba(255,' + this.color + ',50,' + this.transparanecy + ')';
        }
        else{
            colorString = 'rgba(99,255,' + this.color + ',' + this.transparanecy + ')';
        }
        console.log('Generated color:', colorString); // Debugging output
        //colors.push(colorString)
        for(let j=0;j<1;j++){
          this.data.datasets[j].backgroundColor.push(colorString);
          console.log("dataset color#1", this.data.datasets[j].backgroundColor);
        }
        this.color += this.colorIncRate;
    }
    return colors;
  }

  update(event: Event) {
      this.data = this.data;//create new data
  }
  
  refreshReport(){
    this.loadData();
  }

  generateReport():void{
    if(this.selectedDataView != null){
      this.isGenerateReport = true;
      this.loadData();
      this.setDataViews();
    }
  }

  getMonthlyLabels(measurementDate: MeasurementDate): string[] {
    const { startDate, endDate } = measurementDate;
    if (!startDate || !endDate) {
        throw new Error('Both startDate and endDate must be provided');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthLabels: string[] = [];

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let currentDate = new Date(start);
    currentDate.setDate(1); // Normalize to the start of the month

    while (currentDate <= end) {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        monthLabels.push(`${monthNames[month]} ${year}`);
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthLabels;
}

}
