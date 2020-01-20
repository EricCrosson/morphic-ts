import { HKT2, Kind, Kind2, URIS, URIS2 } from '../common/HKT'
import { Algebra1, Algebra2, Algebra } from '../algebras/core'

/**
 * A Program is expressed within an Algebra to materialize a Morph
 */
export interface ProgramType<E, A> {}
export type ProgramURI = keyof ProgramType<any, any>

const interpretSymb = Symbol()
export const interpretable = <T extends { [interpretSymb]?: any }>(program: T): NonNullable<T[typeof interpretSymb]> =>
  program as NonNullable<T[typeof interpretSymb]>

export interface ProgramTypes {}

export interface ProgramAlgebra<F> {}
export interface ProgramAlgebraURI {}

export type InferredAlgebra<F, X extends ProgramURI> = Algebra<ProgramAlgebraURI[X], F>

export interface InferredProgram<E, A, X extends ProgramURI> {
  <G>(a: ProgramAlgebra<G>[X]): HKT2<G, E, A>
  [interpretSymb]?: {
    <G extends URIS>(a: Algebra1<ProgramAlgebraURI[X], G>): Kind<G, A>
    <G extends URIS2>(a: Algebra2<ProgramAlgebraURI[X], G>): Kind2<G, E, A>
  }
}

/***
 * Provides Program builder for the given Program type (Exposing a specific Algebra)
 */
export const makeDefines = <PURI extends ProgramURI>(prog: PURI) => {
  type Prog<E, A> = ProgramType<E, A>[PURI]
  type Res<E, A> = NonNullable<Prog<E, A>[typeof interpretSymb]>
  const defineAs = <E, A>(program: Prog<E, A>): Res<E, A> => program as any // White lie
  const define = <A>(program: Prog<unknown, A>): Res<unknown, A> => program as any
  return { define, defineAs }
}
