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
  massNumeric: string[];
  massString: string[];
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
    const generalColumns = selected.map( nameColumn => {
    return [nameColumn, this.csvRecords.map(row => {
      if(parseInt(row[nameColumn])) {
        return [parseInt(row[nameColumn]), true];
      }
      else {
        return [row[nameColumn], false];
      }
    })];
    });

    this.massNumeric = generalColumns.filter(column => column[1][1] = true );
    this.massString = generalColumns.filter(column => column[1][1] = false );

    this.shown = true;

  }
}
