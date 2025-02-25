export type Defaults = Record<string, unknown>

export type Args<T = Defaults> = T & {
  _: string[]
}

export interface Options {
  /**
   * Specifies an array of values to parse as arguments.
   *
   * @default process.argv.slice(2)
   *
   * @example
   *
   * ```ts
   * import { createArgs } from '@hypernym/args'
   *
   * createArgs({
   *   argv: process.argv.slice(2),
   * })
   * ```
   */
  argv?: string[]
  /**
   * Specifies an `alias` object that will be added to the parsed output with matching values.
   *
   * @default undefined
   *
   * @example
   *
   * ```ts
   * import { createArgs } from '@hypernym/args'
   *
   * createArgs({
   *   alias: {
   *     config: ['conf', 'c'],
   *     help: 'h',
   *   },
   * })
   * ```
   */
  alias?: Record<string, string | string[]>
  /**
   * Specifies an `defaults` object that will be added to the parsed output regardless of `CLI` inputs.
   *
   * @default undefined
   *
   * @example
   *
   * ```ts
   * import { createArgs } from '@hypernym/args'
   *
   * createArgs({
   *   defaults: {
   *     _: ['value'],
   *     a: true,
   *   }
   * })
   * ```
   */
  defaults?: Defaults & {
    _?: string[]
  }
  /**
   * Specifies an array of values that will be skipped when parsing arguments.
   *
   * @default undefined
   *
   * @example
   *
   * ```ts
   * import { createArgs } from '@hypernym/args'
   *
   * createArgs({
   *   exclude: ['arg', '--flag', '-alias'],
   * })
   * ```
   */
  exclude?: string[]
}

export * from '@'
