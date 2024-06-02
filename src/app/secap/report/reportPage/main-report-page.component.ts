import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormat, DateFormatClass} from 'src/app/secap/shared/measurement/measurement-type.model';
import { MeasurementService } from 'src/app/secap/shared/measurement/measurement.service';
import { BuildingMeasurement  } from '../../shared/measurement/measurement-model';


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
  emissionTypeKeys: string[];
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
    this.transparanecy = 0.8;
    this.isGenerateReport = false;
    this.emissionTypes = this.measurementService.getMeasurementTypeHeadersHardcoded();
    this.emissionTypeKeys = this.measurementService.getEmissionTypeKeysHardcoded();
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
    //filter.gasTypes.push(this.selectedGas);

    this.measurementService.getMeasurementsByFilter(filter).subscribe(
      (buildingMeasurements) => {
        console.log(buildingMeasurements)
        this.filteredMeasurements =  buildingMeasurements.content;
        console.log("filteredData",this.filteredMeasurements)

        if(this.selectedDataView == 'Pie'){
          if(this.selectedEmission=='Total'){
            this.setDataViewByEmissionType();
          }
          else{
            this.diffuseDataForPie();
          }
        }
        else if(this.isDiffuseDatas){
          this.diffuseElements();
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
    if(!this.isDiffuseDatas){
      if(this.selectedDataView!='Pie'){
        this.setOneColor();
      }
      else{
        this.setColors();
      }
    }
    else{
      this.setColorsDiffused();
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
      console.log("key",key);
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


  diffuseElements(){
    if(this.selectedEmission=='Total'){
      this.diffuseDataByEmissions();
    }
    else{
      this.diffuseDataByGasses();
    }
  }

  diffuseDataByEmissions(){
    let startDateParam = new DateFormatClass(this.rangeDates[0].getFullYear(),this.rangeDates[0].getMonth());
    let endDateParam = new DateFormatClass(this.rangeDates[1].getFullYear(),this.rangeDates[1].getMonth());
    const months = this.getMonthlyLabels(startDateParam,endDateParam)
    console.log("months",months)

    this.data = {
      labels: months,
      datasets: [
      ]
    }

    let emissionTypeMap = new Map()
    for(const element of this.emissionTypeKeys){
      let map = new Map();
      emissionTypeMap.set(element, map);
      for(const element of months){
        map.set(element,0);
      }
    }

    for(const e of this.filteredMeasurements){
      for(const element of this.emissionTypeKeys){
        if(element === e.measurement.measurementTypeHeader){
          let key = this.convertDateToString(e.measurement.measurementDate.year,e.measurement.measurementDate.month)
          emissionTypeMap.get(element).set(key,emissionTypeMap.get(element).get(key)+e.measurement.value)
        }
      }
    }

    for(const element of this.emissionTypeKeys){
      this.data.datasets.push({
        label: element,
          data: [...emissionTypeMap.get(element).values()],
          backgroundColor: [],
      })
    }

    console.log("data:",this.data)
    
  }

  diffuseDataByGasses(){
    let startDateParam = new DateFormatClass(this.rangeDates[0].getFullYear(),this.rangeDates[0].getMonth());
    let endDateParam = new DateFormatClass(this.rangeDates[1].getFullYear(),this.rangeDates[1].getMonth());
    const months = this.getMonthlyLabels(startDateParam,endDateParam)
    console.log("months",months)
    
    this.data = {
      labels: months,
      datasets: [
      ]
    }

    let gasTypeMap = new Map()
    let gasNames = this.measurementService.getGasNames()
    for(const element of gasNames){
      let map = new Map();
      gasTypeMap.set(element, map);
      for(const element of months){
        map.set(element,0);
      }
    }

    for(const e of this.filteredMeasurements){
      let key = this.convertDateToString(e.measurement.measurementDate.year,e.measurement.measurementDate.month)
      
      gasTypeMap.get("CO2").set(key,gasTypeMap.get("CO2").get(key)+e.measurement.measurementCalculation.co2);

      gasTypeMap.get("CH4").set(key,gasTypeMap.get("CH4").get(key)+e.measurement.measurementCalculation.ch4);

      gasTypeMap.get("Biofuel CO2").set(key,gasTypeMap.get("Biofuel CO2").get(key)+e.measurement.measurementCalculation.biofuelCO2);

      gasTypeMap.get("CO2e").set(key,gasTypeMap.get("CO2e").get(key)+e.measurement.measurementCalculation.co2e);

      gasTypeMap.get("EF").set(key,gasTypeMap.get("EF").get(key)+e.measurement.measurementCalculation.ef);

      gasTypeMap.get("N2O").set(key,gasTypeMap.get("N2O").get(key)+e.measurement.measurementCalculation.n2O);
    }

    for(const element of gasNames){
      this.data.datasets.push({
        label: element,
          data: [...gasTypeMap.get(element).values()],
          backgroundColor: [],
      })
    }
  }

  diffuseDataForPie(){
    let map = new Map();

    let gasNames = this.measurementService.getGasNames();
    for(const element of gasNames){
      map.set(element,0);
    }
  
    for(const e of this.filteredMeasurements){

      map.set("CO2",map.get("CO2")+e.measurement.measurementCalculation.co2);

      map.set("CH4",map.get("CH4")+e.measurement.measurementCalculation.ch4);

      map.set("Biofuel CO2",map.get("Biofuel CO2")+e.measurement.measurementCalculation.biofuelCO2);

      map.set("CO2e",map.get("CO2e")+e.measurement.measurementCalculation.co2e);

      map.set("EF",map.get("EF")+e.measurement.measurementCalculation.ef);

      map.set("N2O",map.get("N2O")+e.measurement.measurementCalculation.n2O);
    }

    this.data = {
      labels: [...map.keys()],
      datasets: [{
        label:"Gasses",
        data: [...map.values()],
        backgroundColor: [],
      }
      ]
    }
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

  setColors(){
    this.dataSetLen = this.data.datasets[0].data.length;
    const hueIncrement = 360 / this.dataSetLen;
    for(let i = 0;i<this.dataSetLen;i++){
      const hue = i * hueIncrement;
      const colorString = this.hslToRgba(hue, 100, 50, this.transparanecy);
      this.data.datasets[0].backgroundColor.push(colorString);
      //this.data.datasets[0].borderColor = colorString;
    }
  }

  setOneColor(){
    this.dataSetLen = this.data.datasets[0].data.length;
    const hueIncrement = 360 / this.dataSetLen;
    const hue = 1 * hueIncrement;
    const colorString = this.hslToRgba(hue, 100, 50, this.transparanecy);
    this.data.datasets[0].backgroundColor.push(colorString);
    //this.data.datasets[0].borderColor = colorString;
  }

  setColorsDiffused(){
    const hueIncrement = 360 / this.data.datasets.length;
    let i = 0
    for(const e of this.data.datasets){
        const hue = i * hueIncrement;
        const colorString = this.hslToRgba(hue, 100, 50, this.transparanecy);
        e.borderColor = colorString;
        e.backgroundColor.push(colorString);
        i++;
    }
  }
  
    // Function to convert HSL to RGBA
    hslToRgba(h, s, l, a) {
      s /= 100;
      l /= 100;
      let c = (1 - Math.abs(2 * l - 1)) * s;
      let x = c * (1 - Math.abs((h / 60) % 2 - 1));
      let m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (0 <= h && h < 60) {
          r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
          r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
          r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
          r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
          r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
          r = c; g = 0; b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      return `rgba(${r},${g},${b},${a})`;
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
    
    for(const element of this.emissionTypeKeys){
      map.set(element,0);
    }
  
    for(const element of this.filteredMeasurements){
      map.set(element.measurement.measurementTypeHeader,map.get(element.measurement.measurementTypeHeader)+element.measurement.value);
    }
    return map;
  }

}
