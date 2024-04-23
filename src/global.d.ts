import { App as OriginalApp, ILeafer } from 'leafer-ui/types'
import { IAppConfig as OriginalIAppConfig, ILeaferConfig } from '@leafer-ui/interface';

// declare module '@leafer-ui/interface' {
//   interface IAppConfig extends OriginalIAppConfig {
//     frame?: ILeaferConfig;
//   }
// }

declare module 'leafer-ui/types' {
  interface App extends OriginalApp {
    frame: ILeafer;
  }
}