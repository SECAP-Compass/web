import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormat, DateFormatClass, FilteredMeasurement, FilteredMeasurements, FilteredMeasurementsClass, MeasurementDate  } from 'src/app/secap/shared/measurement/measurement-type.model';
import { MeasurementService } from 'src/app/secap/shared/measurement/measurement.service';
import { BuildingMeasurement, MeasurementCollection } from '../../shared/measurement/measurement-model';


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

  filteredMeasurements:BuildingMeasurement[] = [];
  emissionTypes: string[];
  gasTypes: string[];
  dataViewTypes: string[] = ["Tabular","Pie","Line","Bar"];

  selectedEmission:string=null;
  selectedGas:string=null;
  selectedDataView:string=null;
  rangeDates: Date[];

  /* data */
  data: any;
  options: any;
  colorIncRate:number;
  dataSetLen:number;
  transparanecy:number;
  color: number;
  
  /*controls */
  isGenerateReport:boolean
  isDiffuseDatas:boolean

  constructor(private router: Router,private measurementService:MeasurementService) {}

  ngOnInit(): void {
    this.isGenerateReport = false;
    this.emissionTypes = this.measurementService.getMeasurementTypeHeadersHardcoded();
    this.gasTypes = this.measurementService.getGassesHardcoded();
    this.mockDataAdress();
  }

  mockDataAdress(): void{
    this.buildingId = "b0ae2f16-b652-42b1-ae4e-635762778ecc";
    this.address = "someAdress";
    this.city = "someCity";
    this.district = "someDistrict";
  }

  update(event:Event) {
    this.generateReport();
  }

  reGenReport(){
    if(this.isGenerateReport){
      this.isGenerateReport = false;
      this.generateReport()
    }
  }

  generateReport():void{
    if(this.selectedDataView != null){
      this.loadData();
      //console.log("generated mock data:", this.data.datasets[0].data);
    }
  }

  loadData():void{
    let startDateParam = new DateFormatClass(this.rangeDates[0].getFullYear(),this.rangeDates[0].getMonth());
    let endDateParam = new DateFormatClass(this.rangeDates[1].getFullYear(),this.rangeDates[1].getMonth());

    let filter = {
      startDate: startDateParam,
      endDate: endDateParam,
      typeHeaders: [],
      gasTypes: [],
      buildingId: this.buildingId
    };
    console.log("filters:", filter);
    filter.typeHeaders.push(this.selectedEmission);
    filter.gasTypes.push(this.selectedGas);

    this.measurementService.getMeasurementsByFilter(filter).subscribe(
      (buildingMeasurements) => {
        console.log(buildingMeasurements)
        this.filteredMeasurements =  buildingMeasurements.content;
        console.log("filteredData",this.filteredMeasurements)

        if(this.selectedDataView == 'Pie'){
          this.setDataViewByEmissionType();
        }
        else if(this.isDiffuseDatas){
          this.diffuseElements();
        }
        else if(this.selectedEmission!='Total'){
          //
        }
        else{
          this.setDataViewMonthly(startDateParam,endDateParam);
        }
        this.setDataViews();
        this.isGenerateReport = true;
      }
    );
  }

  setDataViews(){
    this.setDatasetColors();
    if(this.isDiffuseDatas){
      this.setColorsUndiffused();
    }
    this.setDataViewSettings();
  }

  setDataViewByEmissionType(){
    let map = this.getLabelsByEmissionType()
    this.data = {
      labels: [...map.keys()],
      datasets: [
          {
            label: 'Total',
            data: [...map.values()],
            backgroundColor: [],
          }
      ]
    }
  }

  setDataViewMonthly(startDateParam:DateFormat,endDateParam:DateFormat){
    let map = new Map();
    const months = this.getMonthlyLabels(startDateParam,endDateParam)
    console.log("months",months)
    for(const element of months){
      map.set(element,0);
    }
    for(const element of this.filteredMeasurements){
      let key = this.convertDateToString(element.measurement.measurementDate.year,element.measurement.measurementDate.month)
      map.set(key,map.get(key)+element.measurement.value)
    }
    this.data = {
      labels: [...map.keys()],
      datasets: [
          {
            label: 'Total',
            data: [...map.values()],
            backgroundColor: [],
          }
      ]
    }
    console.log("labels",this.data.labels)
  }

  setDataViewByGasses(){
  }

  diffuseElements(){
      let startDateParam = new DateFormatClass(this.rangeDates[0].getFullYear(),this.rangeDates[0].getMonth());
      let endDateParam = new DateFormatClass(this.rangeDates[1].getFullYear(),this.rangeDates[1].getMonth());
      const months = this.getMonthlyLabels(startDateParam,endDateParam)
      console.log("months",months)
  
      this.data = {
        labels: months,
        datasets: [
        ]
      }
  
      for(const element of this.emissionTypes){
        let map = new Map();
        for(const element of months){
          map.set(element,0);
        }
        for(const e of this.filteredMeasurements){
          if(e.measurement.measurementType==element){
            let key = this.convertDateToString(e.measurement.measurementDate.year,e.measurement.measurementDate.month)
            map.set(key,map.get(key)+e.measurement.value)
          }
        }
        this.data.datasets.push({
          label:element,
          data:[...map.values()],
          backgroundColor: [],
        })
      }
      console.log("diffused data:", this.data.datasets)

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
          fontSize: 8
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
    this.transparanecy = 0.2;
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

  setColorsUndiffused(){
    this.transparanecy = 0.2;
    this.colorIncRate = Math.floor(255/this.dataSetLen);
    this.color = this.colorIncRate;
    const colors:string[] = [];
    for(const e of this.data.datasets){
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
        e.borderColor = colorString;
        this.color += this.colorIncRate;
    }
    return colors;
  }




  convertDateToString(year:number,month:number):string{
    const monthNames = [
      [0, 'January'], 
      [1, 'February'],
      [2, 'March'],
      [3, 'April'],
      [4, 'May'],
      [5, 'June'],
      [6, 'July'],
      [7, 'August'],
      [8, 'September'],
      [9, 'October'],
      [10, 'November'],
      [11, 'December'],
  ];  

    return `${monthNames[month]} ${year}`
  }
  getMonthlyLabels(startDate:DateFormat, endDate:DateFormat): string[] {
    if (!startDate || !endDate) {
        throw new Error('Both startDate and endDate must be provided');
    }

    const monthLabels: string[] = [];

    let currentDateYear = startDate.year;
    let currentDateMonth = startDate.month;

    while (currentDateYear < endDate.year || (currentDateYear === endDate.year && currentDateMonth <= endDate.month)) {
      monthLabels.push(this.convertDateToString(currentDateYear, currentDateMonth));
      
      // Increment the month
      currentDateMonth += 1;
      
      // Check if we need to go to the next year
      if (currentDateMonth > 11) {
        currentDateMonth = 0;
        currentDateYear += 1;
      }
    }

    return monthLabels;
  }

  getLabelsByEmissionType():any{
    let map = new Map();
    
    for(const element of this.emissionTypes){
      map.set(element,0);
    }
  
    for(const element of this.filteredMeasurements){
      map.set(element.measurement.measurementTypeHeader,map.get(element.measurement.measurementType)+element.measurement.value);
    }
    return map;
  }

}
