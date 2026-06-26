import { RegexInterfaceProtocol } from './regex-interface.protocol';

export class RemoveSpacesInterfaceRegex implements RegexInterfaceProtocol {
  execute(str: string): string {
    return str.replace(/\s+/g, '');
  }
}
