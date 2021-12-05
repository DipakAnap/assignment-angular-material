import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  // displayedColumns: any = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumns: any = ['select', 'name', 'email', 'gender', 'address', 'dob', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users:any = [];
  selection = new SelectionModel<any>(true, []);

  list = [];
  selectedUser:any = {};

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getUserData();
  }

  getUserData() {
    this.http.get("./assets/json/users.json").subscribe((data:any)=>{
      this.list = data;
      this.updateUserData();
    });
  }

  updateUserData(){
    this.users = new MatTableDataSource<any>(this.list);
    this.users.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.users.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  /*Open delete confirmation dialog*/
  openDeletConfirmationDialog(index) {

    this.selectedUser = this.list[index];

    let dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        user: this.selectedUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'yes'){
        this.deleteUser(index);
      }
    });
  }

  /*Delete user*/
  deleteUser(index){
    this.list.splice(index, 1);
    this.updateUserData();
  }

  /*Open edit user dialog*/
  openEditUserDialog(index) {

    this.selectedUser = this.list[index];

    let dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: {
        user: {...this.selectedUser}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedUser = result;
      this.list[index] = result;
      this.updateUserData();
    });
  }
}


/*Dialog component start*/
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'confirmation.dialog.html',
  styleUrls: ['./user-list.component.scss']
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  onChooseConfirmation(action) {
    this.dialogRef.close(action);
  }

}
/*Dialog component end*/
