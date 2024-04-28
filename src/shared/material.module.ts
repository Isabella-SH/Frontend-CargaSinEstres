import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes de angular material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatInputModule,
        MatToolbarModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatGridListModule,
        MatExpansionModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatInputModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatChipsModule,
        MatGridListModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class MaterialModule { }
