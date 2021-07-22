import {Component, ViewChild} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  csvRecords: any[] = [];
  header = true;
  columnsAll: string[];
  massNumeric: string[] = [];
  massString: string[] = [];
  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  @ViewChild('fileImportInput') fileImportInput: any;
  columns = new FormControl();
  shown = false;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
      this.csvRecords = result;
      this.columnsAll = Object.keys(this.csvRecords[0]);
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  checkedColumn(selected): void{
    this.massString = [];
    this.massNumeric  = [];
      const generalColumns = selected.map( nameColumn => {
        return [nameColumn, this.csvRecords.map(row => row[nameColumn])];
    });
      generalColumns.map(arr => {
        if (parseInt(arr[1][0])) {
          this.massNumeric.push(arr);
        }
        else {  this.massString.push(arr); }
      });
      this.shown = true;
  }
}
