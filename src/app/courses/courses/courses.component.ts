import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns = [ 'name', 'category' ];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError( error => {
        console.log('Erro ao carregar cursos.');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


}
