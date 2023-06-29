import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'firstName',
})
export class FirstNamePipe implements PipeTransform {
	transform(value: string | null): string {
		if (value === null) {
			return '';
		}

		return value.split(' ')[0];
	}
}
