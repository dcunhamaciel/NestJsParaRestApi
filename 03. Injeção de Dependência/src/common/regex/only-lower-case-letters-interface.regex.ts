import { RegexInterfaceProtocol } from './regex-interface.protocol';

export class OnlyLowerCaseLettersInterfaceRegex implements RegexInterfaceProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
