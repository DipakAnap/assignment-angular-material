import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {

  name;
  constructor(public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data.user.date = new Date(this.data.user.date);
    console.log(data);
  }

  ngOnInit(): void {
  }


  onChooseGender(gender){
    this.data.user.gender = gender;
  }

  update(){
    this.dialogRef.close(this.data.user);
  }
}
