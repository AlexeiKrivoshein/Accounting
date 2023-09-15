import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { Template, templateDefault } from '../model/template';
import { TemplateService } from '../services/template.service';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';

const TEMPLATE_COLUMNS: Column[] = [
  {
    path: 'name',
    header: 'Наименование',
  },
  {
    path: 'defaultCategory.name',
    header: 'Категория',
  },
];

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent {
  public selected: Template | null = null;

  public columns = TEMPLATE_COLUMNS;

  public dataSource: MatTableDataSource<Template> =
    new MatTableDataSource<Template>([]);

  constructor(
    private templateService: TemplateService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.templateService
      .get()
      .subscribe((data) => (this.dataSource.data = data));
  }

  public onAdd() {
    this.moodify(templateDefault());
  }

  public onModify() {
    if (!!this.selected) {
      this.moodify(this.selected);
    }
  }

  private moodify(template: Template) {
    if (!template) {
      return;
    }

    const dialog = this.dialog.open(TemplateEditorComponent, {
      width: '40em',
      height: 'auto',
      data: template,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.templateService
          .get()
          .subscribe((data) => (this.dataSource.data = data));
      }
    });
  }

  public onDelete() {
    if (!this.selected) {
      return;
    }

    this.templateService
      .remove(this.selected.id)
      .pipe(switchMap(() => this.templateService.get()))
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
    this.moodify(event);
  }
}
