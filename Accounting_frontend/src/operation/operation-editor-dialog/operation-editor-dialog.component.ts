import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyService } from 'src/notify/service/notify-service';
import { CashOperationDataManager } from '../cash-operation/data-manager/cash-operation-data-manager';
import { ContractorOperationDataManager } from '../contractor-operation/data-manager/contractor-operation-data-manager';
import { CorrectionOperationDataManager } from '../correction-operation/data-manager/correction-operation-data-manager';
import { Operation } from '../model/operation';
import { OperationClass, operationClassLocal } from '../model/operation-class';
import { TransferOperationDataManager } from '../transfer-operation/data-manager/transfer-operation-data-manager';
import { OperationService } from './service/operation.service';

@Component({
  selector: 'app-operation-editor-dialog',
  templateUrl: './operation-editor-dialog.component.html',
  styleUrls: ['./operation-editor-dialog.component.scss'],
  providers: [
    OperationService,
    // менеджеры отдельны операций
    ContractorOperationDataManager,
    TransferOperationDataManager,
    CorrectionOperationDataManager,
    CashOperationDataManager,
  ],
})
export class OperationEditorDialogComponent implements OnInit {
  public OperationClass = OperationClass;

  public operationClassLocal = operationClassLocal;

  public classControl = new FormControl<OperationClass>(
    OperationClass.ContractorOperation
  );

  public operationClasses = Object.values(OperationClass).filter(
    (operationClass) => !isNaN(Number(operationClass))
  );

  constructor(
    private dialogRef: MatDialogRef<OperationEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) operation: Operation,
    private _operationService: OperationService,
    private notifyService: NotifyService
  ) {
    this._operationService.operation = operation;
    this.classControl.setValue(operation.operationClass);
  }

  ngOnInit(): void {}

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onSave() {
    const operationClass = this.classControl.value;

    if (operationClass != null) {
      this._operationService.save(operationClass).subscribe((operation) => {
        if (operation) {
          this._operationService.operation = operation;
        }
        this.notifyService.notify('Сохранено', 'success');
        this.dialogRef.close(true);
      });
    }
  }
}
