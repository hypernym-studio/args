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
 *   flag?: boolean
 *   alias?: string
 *   arg?: string
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

  const setArg = (arg: string, index: number, start: number) => {
    let value: boolean | string = true
    const argKey = arg.slice(start)
    const argValue = argv[index + 1]

    if (argValue && !argValue.startsWith('-')) value = argValue

    if (argKey && !argKey.includes('=')) {
      if (alias?.[argKey]) {
        const _aliasKey = alias[argKey]

        if (isString(_aliasKey)) args[_aliasKey] = value
        if (isArray(_aliasKey)) {
          for (const key of _aliasKey) args[key] = value
        }
      }

      args[argKey] = value
    }
  }

  for (const [index, arg] of argv.entries()) {
    // flags '--'
    if (isFlag(arg)) setArg(arg, index, 2)
    // aliases '-'
    else if (isAlias(arg)) setArg(arg, index, 1)
    // unprefixed values
    else {
      const _arg = argv[index - 1]

      if (!_arg) {
        if (!isAlias(arg) && !arg.includes('=')) {
          args._.push(arg)
        }
      } else if (!isAlias(_arg) && !arg.includes('=')) {
        args._.push(arg)
      } else if ((_arg === '-' || _arg === '--') && !arg.includes('=')) {
        args._.push(arg)
      }
    }
  }

  return args as Args<T>
}
