import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HelloComandPipe implements PipeTransform {
  transform(value: string): string {
    const newstr = value.replace(/\/adminhello/, '');

    return newstr;
  }
}
