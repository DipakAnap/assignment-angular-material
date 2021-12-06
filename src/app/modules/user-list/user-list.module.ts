import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

/*Flex layout module*/
import { FlexLayoutModule } from '@angular/flex-layout';

/*Material module*/
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';


/*Components*/
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';

const routes: Routes = [
  { path: '',
    component: UserListComponent
  }
];

@NgModule({
  declarations: [
    UserListComponent,
    UpdateUserDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ]
})
export class UserListModule { }
