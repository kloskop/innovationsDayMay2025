import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FakeBackendService } from './repositories/fake-backend.service';
import { IFormRecordSavedInDB } from './interfaces/i-form-record-saved-in-db';
import { IType } from './interfaces/i-type';
import { IMyFormControls } from './interfaces/i-my-form-controls';
import { TypeCheckingService } from './type-checking.service';
import { SchemaKeyMap } from './schema-map';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(
    private _formBuilder: FormBuilder,
    private _fakeBackend: FakeBackendService,
    private _typeChecker: TypeCheckingService
  ) {
    this.types = _fakeBackend.getTypes();
  }

  //* General form Group
  public myForm?: FormGroup;

  //* Form with list of fields
  // public myForm?: FormGroup<IMyFormControls>;

  public types: IType[] = [];

  //* Static form
  public initializeMyForm(): void {
    this.myForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      type: [''],
      description: [''],
      isImportant: [false],
      valueX: [[]],
      valueY: [[]],
      valueZ: [[]],
    });
  }

  //* Form with values from backend
  // public initializeMyForm(): void {
  //   this._fakeBackend.getValuesForFormRecords().subscribe({
  //     next: (values) => {
  //       this.myForm = this._formBuilder.group({
  //         name: [this.assignFormFieldValueFromBackendRecord('name', values), [Validators.required]],
  //         type: [this.assignFormFieldValueFromBackendRecord('type', values)],
  //         description: [this.assignFormFieldValueFromBackendRecord('description', values)],
  //         isImportant: [this.assignFormFieldValueFromBackendRecord('isImportant', values)],
  //         valueX: [this.assignFormFieldValueFromBackendRecord('valueX', values)],
  //         valueY: [this.assignFormFieldValueFromBackendRecord('valueY', values)],
  //         valueZ: [this.assignFormFieldValueFromBackendRecord('valueZ', values)],
  //       });
  //     }
  //   })
  // }

  //* Form with controls list as interface
  // public initializeMyForm(): void {
  //   this._fakeBackend.getValuesForFormRecords().subscribe({
  //     next: (values) => {
  //       this.myForm = this._formBuilder.group<IMyFormControls>({
  //         name: [this.assignFormFieldValueFromBackendRecord('name', values), [Validators.required]],
  //         type: [this.assignFormFieldValueFromBackendRecord('type', values)],
  //         description: [this.assignFormFieldValueFromBackendRecord('description', values)],
  //         isImportant: [this.assignFormFieldValueFromBackendRecord('isImportant', values)],
  //         valueX: [this.assignFormFieldValueFromBackendRecord('valueX', values)],
  //         valueY: [this.assignFormFieldValueFromBackendRecord('valueY', values)],
  //         valueZ: [this.assignFormFieldValueFromBackendRecord('valueZ', values)],
  //       });
  //     }
  //   })
  // }

  //* Form with cotnrols list as FormControls in interface
  // public initializeMyForm(): void {
  //   this._fakeBackend.getValuesForFormRecords().subscribe({
  //     next: (values) => {
  //       this.myForm = this._formBuilder.group<IMyFormControls>({
  //         name: new FormControl(this.assignFormFieldValueFromBackendRecord<string>('name', values), [Validators.required]),
  //         type: new FormControl(this.assignFormFieldValueFromBackendRecord<IType>('type', values)),
  //         description: new FormControl(this.assignFormFieldValueFromBackendRecord<string>('description', values)),
  //         isImportant: new FormControl(this.assignFormFieldValueFromBackendRecord<boolean>('isImportant', values)),
  //         valueX: new FormControl(this.assignFormFieldValueFromBackendRecord<IRecord[]>('valueX', values)),
  //         valueY: new FormControl(this.assignFormFieldValueFromBackendRecord<IRecord[]>('valueY', values)),
  //         valueZ: new FormControl(this.assignFormFieldValueFromBackendRecord<IRecord[]>('valueZ', values)),
  //       });
  //     }
  //   })
  // }

  //* With ZOD
  // public initializeMyForm(): void {
  //   this._fakeBackend.getValuesForFormRecords().subscribe({
  //     next: (values) => {
  //       this.myForm = this._formBuilder.group<IMyFormControls>({
  //         name: new FormControl(
  //           this.assignFormFieldValueFromBackendRecord('name', values),
  //           [Validators.required]
  //         ),
  //         type: new FormControl(
  //           this.assignFormFieldValueFromBackendRecord('type', values)
  //         ),
  //         description: new FormControl(
  //           this.assignFormFieldValueFromBackendRecord('description', values)
  //         ),
  //         isImportant: new FormControl(
  //           this.assignFormFieldValueFromBackendRecord('isImportant', values)
  //         ),
  //         valueX: new FormControl(
  //           this.assignFormFieldValueFromBackendRecord('valueX', values)
  //         ),
  //         valueY: new FormControl(
  //           this.assignFormFieldValueFromBackendRecord('valueY', values)
  //         ),
  //         valueZ: new FormControl(
  //           this.assignFormFieldValueFromBackendRecord('valueZ', values)
  //         ),
  //       });
  //     },
  //   });
  // }

  private assignFormFieldValueFromBackendRecord(
    formControlName: keyof IMyFormControls,
    values: IFormRecordSavedInDB[]
  ): any {
    const value: string | undefined = values.find((v) => {
      return v.formControlName === formControlName;
    })?.formValue;

    //* raw value
    return value;

    //* Parsing to Objects
    // if (value) {
    //   try {
    //     return JSON.parse(value);
    //   } catch (error) {
    //     console.error(error);
    //     return value;
    //   }
    // } else {
    //   return value;
    // }
  }

  //* With types control
  // private assignFormFieldValueFromBackendRecord<T>(formControlName: keyof IMyFormControls, values: IFormRecordSavedInDB[]): T | null {
  //   const value: string | undefined = values.find((v) => {
  //     return v.formControlName === formControlName
  //   })?.formValue;

  //   if (value) {
  //     try {
  //       return JSON.parse(value);
  //     } catch (error) {
  //       console.error(error);
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  //* With ZOD runtime check
  // private assignFormFieldValueFromBackendRecord<
  //   K extends keyof IMyFormControls
  // >(
  //   formControlName: K,
  //   values: IFormRecordSavedInDB[]
  // ): IMyFormControls[K] | null {
  //   const value: string | undefined = values.find(
  //     (v) => v.formControlName === formControlName
  //   )?.formValue;

  //   if (value) {
  //     try {
  //       const parsed: unknown = JSON.parse(value);
  //       const schemaKey = this.getSchemaKeyForFormControl(formControlName);
  //       return this._typeChecker.parseAsType(
  //         parsed,
  //         schemaKey as any
  //       ) as IMyFormControls[K];
  //     } catch (error) {
  //       console.error('Invalid JSON or type mismatch:', error);
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  // private getSchemaKeyForFormControl<K extends keyof SchemaKeyMap>(
  //   key: K
  // ): SchemaKeyMap[K] {
  //   const mapping: SchemaKeyMap = {
  //     name: 'string',
  //     type: 'IType',
  //     description: 'string',
  //     isImportant: 'boolean',
  //     valueX: 'IRecordArray',
  //     valueY: 'IRecordArray',
  //     valueZ: 'IRecordArray',
  //   };
  //   return mapping[key];
  // }
}
