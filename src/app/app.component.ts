import { Component, OnInit } from '@angular/core';
import { FormsService } from './forms.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { IType } from './interfaces/i-type';
import { IMyFormControls } from './interfaces/i-my-form-controls';
import { IRecord } from './interfaces/i-record';
import { TypeCheckingService } from './type-checking.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  providers: [TypeCheckingService],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private _formsService: FormsService) {
  }

  title = 'innovationsDay2025';

  //* General form group
  public get MainPageForm(): FormGroup | undefined {
    return this._formsService.myForm;
  }


  //* FormGroup with list of form controls
  // public get MainPageForm(): FormGroup<IMyFormControls> | undefined {
  //   return this._formsService.myForm;
  // }


  public getRecordTypeValue(formControlName: 'valueX' | 'valueY' | 'valueZ'): IRecord[] {
    return this.MainPageForm?.controls[formControlName]?.value;
    // return this.MainPageForm?.controls[formControlName]?.value || [];
  }

  public get AvailableTypes(): IType[] {
    return this._formsService.types;
  }

  public get IsThisImportant(): boolean {
    const isImportantField: boolean = this.MainPageForm?.controls['isImportant']?.value;
    // const isImportantField: boolean = this.MainPageForm?.controls['isImportant']?.value || false;
    return isImportantField === true;
  }

  ngOnInit(): void {
    this._formsService.initializeMyForm();
  }


}
