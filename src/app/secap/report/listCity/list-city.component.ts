import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormat, DateFormatClass } from 'src/app/secap/shared/measurement/measurement-type.model';
import { MeasurementService } from 'src/app/secap/shared/measurement/measurement.service';
import { ReportModel } from '../../shared/measurement/measurement-model';


@Component({
    selector: 'app-main-report-page',
    standalone: false,
    templateUrl: './list-city.component.html',
})
export class ListCityComponent implements OnInit {


    cityNameIdMap:Map<string,number>;
    selectedCityId: number;
    selectedCityName:string;
    years: string[];
    selectedYear:string[];
    cityNames:string[];
    report: ReportModel;
    gasTypes: string[];
    dataViewTypes: string[] = ["Pie", "Bar"];

    selectedDataView: string = null;
    rangeDates: Date[];

    /* data */
    data: any;
    options: any;
    dataSetLen: number;
    transparanecy: number;
    color: number;

    /*controls */
    isGenerateReport: boolean
    isDiffuseDatas: boolean

    constructor(
        private router: Router, 
        private measurementService: MeasurementService,) {
            this.years = [
                "2024",
                "2023",
                "2022",
                "2021"
            ];
         }

    ngOnInit(): void {
        this.cityNameIdMap.set("İstanbul",34)
        this.cityNames.push("İstanbul");
        this.transparanecy = 0.8;
        this.isGenerateReport = false;
        this.gasTypes = this.measurementService.getGassesHardcoded();
    }

    update(event: Event) {
        this.generateReport();
    }

    reGenReport() {
        if (this.isGenerateReport) {
            this.isGenerateReport = false;
            this.generateReport()
        }
    }

    assignCityId(){
        this.selectedCityId = this.cityNameIdMap.get(this.selectedCityName)
    }

    generateReport(): void {
        if (this.selectedDataView != null) {
            this.loadData();
            //console.log("generated mock data:", this.data.datasets[0].data);
        }
    }

    loadData(): void {
        let startDateParam = new DateFormatClass(this.rangeDates[0].getFullYear(), this.rangeDates[0].getMonth());
        let endDateParam = new DateFormatClass(this.rangeDates[1].getFullYear(), this.rangeDates[1].getMonth());

        let filter = {
            cityId: this.selectedCityId,
            year: this.selectedYear
        };
        console.log("filters:", filter);
        //filter.gasTypes.push(this.selectedGas);

        this.measurementService.getCityMeasurementsByFilter(filter).subscribe(
            (r) => {
                console.log(r)
                this.report = r;
                this.diffuseDataForPie();
                this.setDataViews();
                this.isGenerateReport = true;
            }
        );
    }

    setDataViews() {
        if (!this.isDiffuseDatas) {
            if (this.selectedDataView != 'Pie') {
                this.setOneColor();
            }
            else {
                this.setColors();
            }
        }
        else {
            this.setColorsDiffused();
        }
        this.setDataViewSettings();
    }

    diffuseDataForPie() {
        let map = new Map();

        let gasNames = this.measurementService.getGasNames();
        for (const element of gasNames) {
            map.set(element, 0);
        }


            map.set("CO2", map.get("CO2") + this.report.data.co2);

            map.set("CH4", map.get("CH4") + this.report.data.ch4);

            map.set("Biofuel CO2", map.get("Biofuel CO2") + this.report.data.biofuelCO2);

            map.set("CO2e", map.get("CO2e") + this.report.data.co2e);

            map.set("EF", map.get("EF") + this.report.data.ef);

            map.set("N2O", map.get("N2O") + this.report.data.n2O);


        this.data = {
            labels: [...map.keys()],
            datasets: [{
                label: "Gasses",
                data: [...map.values()],
                backgroundColor: [],
            }
            ]
        }
    }

    setDataViewSettings() {
        if (this.selectedDataView != "Pie") {
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
        else {
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

    setColors() {
        this.dataSetLen = this.data.datasets[0].data.length;
        const hueIncrement = 360 / this.dataSetLen;
        for (let i = 0; i < this.dataSetLen; i++) {
            const hue = i * hueIncrement;
            const colorString = this.hslToRgba(hue, 100, 50, this.transparanecy);
            this.data.datasets[0].backgroundColor.push(colorString);
        }
    }

    setOneColor() {
        this.dataSetLen = this.data.datasets[0].data.length;
        const hueIncrement = 360 / this.dataSetLen;
        const hue = 1 * hueIncrement;
        const colorString = this.hslToRgba(hue, 100, 50, this.transparanecy);
        this.data.datasets[0].backgroundColor.push(colorString);
    }

    setColorsDiffused() {
        const hueIncrement = 360 / this.data.datasets.length;
        let i = 0
        for (const e of this.data.datasets) {
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
}