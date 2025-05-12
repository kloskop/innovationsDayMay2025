import { FormControl } from "@angular/forms";
import { IRecord } from "./i-record";
import { IType } from "./i-type";

export interface IMyFormControls {
    //* Form control names
    name: any,
    type: any,
    description: any,
    isImportant: any,
    valueX: any;
    valueY: any;
    valueZ: any;

    //* FormControls with types
    // name: FormControl<string | null>,
    // type: FormControl<IType | null>,
    // description: FormControl<string | null>,
    // isImportant: FormControl<boolean | null>,
    // valueX: FormControl<IRecord[] | null>;
    // valueY: FormControl<IRecord[] | null>;
    // valueZ: FormControl<IRecord[] | null>;

}
