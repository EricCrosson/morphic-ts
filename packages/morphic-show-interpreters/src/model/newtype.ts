import { ShowURI, ShowType } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { showApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<ShowURI, Env> => ({
    _F: ShowURI,
    newtype: name => a => env => new ShowType({ show: x => `<${name}>(${a(env).show.show(x as any)})` }),
    newtypeCfg: name => a => config => env =>
      new ShowType(showApplyConfig(config)({ show: x => `<${name}>(${a(env).show.show(x as any)})` }, env))
  })
)
