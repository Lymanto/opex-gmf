import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { kursType, selectType } from 'src/app/lib/types';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';

@Component({
  selector: 'app-kurs-usd',
  templateUrl: './kurs-usd.component.html',
  styleUrls: ['./kurs-usd.component.css'],
})
export class KursUsdComponent implements OnInit {
  yearsSelected!: number;
  inputValue!: number;
  tableData!: kursType[];
  currentYear: string = format(new Date(), 'yyyy');
  console = console;
  yearsData: selectType[] = [
    {
      id: (parseInt(this.currentYear) + 1).toString(),
      value: (parseInt(this.currentYear) + 1).toString(),
    },
    {
      id: this.currentYear,
      value: this.currentYear,
    },
  ];
  constructor(private kurs: KursUsdService) {}
  generateYears(): void {
    for (let i = 1; i <= 10; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
  }
  getValueInputText(val: string): void {
    this.inputValue = parseInt(val);
  }
  kursAddPost(years: number, value: number, createdBy: string): void {
    this.kurs.postKurs({
      years,
      value,
      createdBy,
    });
  }
  getKurs() {
    return this.kurs.getAllKurs().subscribe((response: any) => {
      this.tableData = response;
    });
  }

  ngOnInit() {
    this.generateYears();
    this.getKurs();
    this.console.log(this.getKurs());
  }
}
