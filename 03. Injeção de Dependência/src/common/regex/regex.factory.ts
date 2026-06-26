import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegexInterfaceProtocol } from './regex-interface.protocol';
import { OnlyLowerCaseLettersInterfaceRegex } from './only-lower-case-letters-interface.regex';
import { RemoveSpacesInterfaceRegex } from './remove-spaces-interface.regex';

export type ClassNames =
  | 'OnlyLowerCaseLettersInterface'
  | 'RemoveSpacesInterface';

@Injectable()
export class RegexFactory {
  create(className: ClassNames): RegexInterfaceProtocol {
    switch (className) {
      case 'OnlyLowerCaseLettersInterface':
        return new OnlyLowerCaseLettersInterfaceRegex();
      case 'RemoveSpacesInterface':
        return new RemoveSpacesInterfaceRegex();
      default:
        throw new InternalServerErrorException(
          `No class found for ${className}`,
        );
    }
  }
}
