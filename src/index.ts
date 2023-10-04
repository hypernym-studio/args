// Inspired by mri, https://github.com/lukeed/mri 1.2.0 MIT
// Rewritten in TypeScript by Ivo Dolenc, Hypernym Studio

import { isString, isArray, isFlag, isAlias } from './utils.js'
import type { Defaults, Args, Options } from './types/index.js'

/**
 * Creates a command-line argument parser for the Node process.
 *
 * @example
 *
 * ```ts
 * import { createArgs } from '@hypernym/args'
 *
 * interface Args {
 *   a?: string
 *   b?: boolean
 *   c?: string
 * }
 *
 * const args = createArgs<Args>()
 * ```
 */
export function createArgs<T = Defaults>({
  argv = process.argv.slice(2),
  alias,
}: Options = {}): Args<T> {
  const args: Args = {
    _: [],
  }

  function _setArg(arg: string, index: number) {
    let value: boolean | string = true
    const argKey = isFlag(arg) ? arg.slice(2) : arg.slice(1)
    const argValue = argv[index + 1]

    if (argValue && !argValue.startsWith('-')) value = argValue

    if (argKey && !argKey.includes('=')) {
      if (alias) {
        for (const [aliasKey, aliasValue] of Object.entries(alias)) {
          if (aliasKey.includes(argKey) || aliasValue.includes(argKey)) {
            args[aliasKey] = value
            if (isString(aliasValue)) args[aliasValue] = value
            if (isArray(aliasValue)) for (const v of aliasValue) args[v] = value
          }
        }
      }

      args[argKey] = value
    }
  }

  for (const [index, arg] of argv.entries()) {
    // flags '--'
    if (isFlag(arg)) _setArg(arg, index)
    // aliases '-'
    else if (isAlias(arg)) _setArg(arg, index)
    // unprefixed values
    else {
      const _arg = argv[index - 1]

      if (!_arg) {
        if (!arg.startsWith('-') && !arg.includes('=')) {
          args._.push(arg)
        }
      } else if (!_arg.startsWith('-') && !arg.includes('=')) {
        args._.push(arg)
      } else if ((_arg === '-' || _arg === '--') && !arg.includes('=')) {
        args._.push(arg)
      }
    }
  }

  return args as Args<T>
}
