import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatCardModule,
          MatButtonModule, MatFormFieldModule, MatInputModule,
          MatDialogModule, MatGridListModule, MatRadioModule, 
          MatSelectModule, MatDatepickerModule, MatNativeDateModule, 
          MatCheckboxModule, MatSnackBarModule, MatProgressSpinnerModule,
          MatTooltipModule, MatTableModule, MatPaginatorModule, MatSortModule
        } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material';


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
