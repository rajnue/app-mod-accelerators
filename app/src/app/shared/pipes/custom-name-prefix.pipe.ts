import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name : 'nameprefix'
})
// {{"Raj" | nameprefix: "male"}}
export class CustomNamePrefixPipe implements PipeTransform{

    transform(name: string, gender: string) {
        if (gender === 'male'){
            return 'Mr. ' + name;
        }
        else if (gender === 'female'){
            return 'Mrs. ' + name;
        }
        else{
            return name;
        }
    }

}
