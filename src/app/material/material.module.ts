import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatCardModule,
          MatButtonModule, MatFormFieldModule, MatInputModule,
          MatDialogModule, MatGridListModule, MatRadioModule, 
          MatSelectModule, MatDatepickerModule, MatNativeDateModule, 
          MatCheckboxModule
        } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';


const MaterialComponentsArray = [ MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
                                  MatDialogModule, MatFormFieldModule, MatInputModule, MatBadgeModule,
                                  MatGridListModule, MatRadioModule, MatSelectModule, MatDatepickerModule,
                                  MatNativeDateModule, MatCheckboxModule
                                ]
@NgModule({
  imports: [ HttpClientModule, FormsModule, MaterialComponentsArray],
  exports: [MaterialComponentsArray]
})
export class MaterialModule { }
