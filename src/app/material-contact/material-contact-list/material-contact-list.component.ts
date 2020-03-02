import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/chat/dialog/dialog.component';
import { MaterialContactComponent } from '../material-contact.component';
import { ConfirmdialogComponent, ConfirmDialogModel } from 'src/app/confirmdialog/confirmdialog.component';
import { MaterialSaveService } from 'src/app/material-save.service';

@Component({
  selector: 'app-material-contact-list',
  templateUrl: './material-contact-list.component.html',
  styleUrls: ['./material-contact-list.component.css']
})
export class MaterialContactListComponent implements OnInit {
contactList = [];
listData: MatTableDataSource<any>;
displayColumn: string[] = ['fullname', 'city', 'email', 'gender', 'actions'];
isWait: boolean;
selectedIndex: any;

constructor( private formService: MaterialSaveService, private empService : EmployeeService ,private dialog: MatDialog) { }
@ViewChild (MatSort) sort: MatSort;
@ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.isWait = true;
    this.formService.onRead().subscribe( data => {
      this.contactList =  data;
      console.log('list ' + this.contactList);

    }, err => console.log(err), () => {
            this.listData = new MatTableDataSource(this.contactList);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.listData.filterPredicate = (data, filter) => {
                return this.displayColumn.some(ele => {
                    return ele !== 'actions';
                });
            };
            console.log(this.listData.data.length);
            this.isWait = false;
    });
  }
  onEdit(row) {
    this.formService.setEditData(row);
    const dialogBoxSettings = {
      panelClass: 'my-class',
     // width:  (window.innerWidth <= 780) ? '80%' : '60%',
      margin: '0 auto',
      autoFocus: true,
      // disableClose: true,
     backdropClass: 'backdropBackground',
      hasBackdrop: true // false used for prevented users to clicking to background while dialog is open..
    };
    this.empService.editDataTitle = 'Edit data';
    let Dref = this.dialog.open(MaterialContactComponent, dialogBoxSettings);
    Dref.afterClosed().subscribe( result =>{
      this.empService.editDataTitle = '';
      if(result){
         this.refresh();
         console.log('after close dialog ' + result);
      }
    });
  }
  deleteContact(key) {
    let abc = 'are you sure to delete record of '+ key.fullname +' ?';
    let message = abc.replace(new RegExp(`(${key.fullname})`, 'gi'), match => {
      return '<strong class="highlight">' + match + '</strong>'});
    const dialogData = new ConfirmDialogModel( 'Confirm Action', message);

    const dref = this.dialog.open(ConfirmdialogComponent, {
      data: dialogData
    });

    dref.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.formService.onContactDelete(key).subscribe ( data => {
          if (data){
            console.log(data);
           // this.refresh();
            const index = this.listData.data.indexOf(key);
            this.listData.data.splice(index, 1);
            this.listData._updateChangeSubscription();
          }
        });
      }
    });
  }

  refresh() {
    this.formService.onRead().subscribe( data => {
      this.contactList =  data;
      console.log('list ' + this.contactList);

    }, err => console.log(err), () => {
            this.listData = new MatTableDataSource(this.contactList);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.listData.data.indexOf
            this.listData.filterPredicate = (data, filter) => {
                return this.displayColumn.some(ele => {
                    return ele !== 'actions';
                });
            };
            console.log(this.listData.data.length);
            this.isWait = false;
    });
  }
  onRowClicked(row) {
    console.log('row clicked ' + JSON.stringify(row));
    const index = this.listData.data.indexOf(row);
    console.log( ' Index ' + index);
  }
  highlight(row) {
      this.selectedIndex = row.key;
  }
}
