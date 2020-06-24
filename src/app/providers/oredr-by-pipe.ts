import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe {
    transform(array: Array<any>, arg1: string, arg2: string): Array<string> {
        if (array != null && array.length > 0) {
            if (arg1 == '-') {
                array.sort((a: any, b: any) => {
                    if (a[arg2] < b[arg2]) {
                        return 1;
                    } else if (a[arg2] > b[arg2]) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            } else if (arg1 == '+') {
                array.sort((a: any, b: any) => {
                    if (a[arg2] < b[arg2]) {
                        return -1;
                    } else if (a[arg2] > b[arg2]) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        }
        return array;
    }
}