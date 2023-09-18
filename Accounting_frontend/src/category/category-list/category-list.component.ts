import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { CategoryEditorComponent } from '../category-editor/category-editor.component';
import { Category, categoryDefault } from '../model/category';
import { CategoryService } from '../services/category.service';

const CATEGORY_COLUMNS: Column[] = [
  {
    path: 'name',
    header: 'Наименование',
  },
];

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  public selected: Category | null = null;

  public columns = CATEGORY_COLUMNS;

  public dataSource: MatTableDataSource<Category> =
    new MatTableDataSource<Category>([]);

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.categoryService
      .get()
      .subscribe((data) => (this.dataSource.data = data));
  }

  public onAdd() {
    this.modify(categoryDefault());
  }

  public onModify() {
    if (!!this.selected) {
      this.modify(this.selected);
    }
  }

  private modify(category: Category) {
    if (!category) {
      return;
    }

    const dialog = this.dialog.open(CategoryEditorComponent, {
      width: '40em',
      height: 'auto',
      data: category,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.get().subscribe((data) => {
          this.dataSource.data = data;

          const index = this.dataSource.data.findIndex(
            (item) => item.id === category.id
          );

          if (index >= 0 && this.dataSource.data[index]) {
            this.selected = this.dataSource.data[index];
          } else {
            this.selected = null;
          }
        });
      }
    });
  }

  public onDelete() {
    if (!this.selected) {
      return;
    }

    this.categoryService
      .remove(this.selected.id)
      .pipe(switchMap(() => this.categoryService.get()))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.notifyService.notify('Запись удалена.', 'success');
        },
        error: (err) => {
          console.log(err);
          this.notifyService.notify('Не удалось удалить запись.', 'error');
        },
      });
  }

  public onDoubleClick(event: any) {
    this.modify(event);
  }
}
