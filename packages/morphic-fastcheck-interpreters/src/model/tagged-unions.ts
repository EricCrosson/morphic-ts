import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { collect } from '@morphic-ts/common/lib/utils'
import { oneof } from 'fast-check'
import { fastCheckApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 * Beware: randomly generated recursive structure with high branching may not end early enough
 */
/**
 *  @since 0.0.1
 */
export const fastCheckTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    taggedUnion: (_tag, dic) => env => new FastCheckType(oneof(...collect(dic, (_, getArb) => getArb(env).arb))),
    taggedUnionCfg: (_tag, dic) => config => env =>
      new FastCheckType(fastCheckApplyConfig(config)(oneof(...collect(dic, (_, getArb) => getArb(env).arb)), env))
  })
)
