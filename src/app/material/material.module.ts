import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';


const MaterialComponentsArray = [ MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
                                  MatDialogModule, MatFormFieldModule, MatInputModule, MatBadgeModule,
                                  MatGridListModule, MatRadioModule, MatSelectModule, MatDatepickerModule,
                                  MatNativeDateModule, MatCheckboxModule, MatSnackBarModule, MatProgressSpinnerModule,
                                  MatProgressBarModule, MatTooltipModule, MatTableModule, MatPaginatorModule,
                                  MatSortModule
                                ];
@NgModule({
  imports: [ HttpClientModule, FormsModule, MaterialComponentsArray],
  exports: [MaterialComponentsArray]
})
export class MaterialModule { }
