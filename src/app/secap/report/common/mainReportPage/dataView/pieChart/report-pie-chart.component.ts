import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-report-pie-chart',
    standalone: false,
    templateUrl: './report-pie-chart.component.html',
})
export class ReportPieChartComponent implements OnInit {

    data: any;
    options: any;
    colorIncRate:number;
    dataSetLen:number;
    transparanecy:number;
    color: number;
    constructor() {
        
    }

    ngOnInit(): void {}
        

    loadData():void{
        this.transparanecy = 0.5;
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [],
                }
            ]
        }

        this.dataSetLen = this.data.datasets[0].data.length;
        this.colorIncRate = Math.floor(255/this.dataSetLen);
        this.color = this.colorIncRate;
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
            this.data.datasets[0].backgroundColor.push(colorString);
            console.log('Pushed:' ,this.data.datasets[0].backgroundColor[i])
            this.color += this.colorIncRate;
        }


        this.options = {
            title: {
                display: true,
                text: 'Pie-Chart',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            }
        };
    }


    update(event: Event) {
        this.data = this.data;//create new data
    }

    
    refreshReport(){
        this.data = this.data;//create new data
    }
    

}
