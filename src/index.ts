import { isString, isArray, isFlag, isAlias } from './utils'
import type { Defaults, Args, Options } from './types'

/**
 * Creates a command-line argument parser.
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
  defaults,
  exclude,
}: Options = {}): Args<T> {
  const args: Args = {
    _: [],
  }

  const excludes = ['--', '-', ...(exclude || [])]
  argv = argv.filter((arg) => !excludes.includes(arg))

  const setArg = (arg: string, index: number) => {
    let value: boolean | string = true
    let argKey: string = isFlag(arg) ? arg.slice(2) : arg.slice(1)
    let argValue: string

    if (arg.includes('=')) {
      const split = argKey.split('=')
      argKey = split[0]
      argValue = split[1]
    } else {
      argValue = argv[index + 1]
    }

    if (argValue && !argValue.startsWith('-')) value = argValue

    if (alias) {
      for (const [aliasKey, aliasValue] of Object.entries(alias)) {
        if (aliasKey.includes(argKey) || aliasValue.includes(argKey)) {
          args[aliasKey] = value
          if (isString(aliasValue)) args[aliasValue] = value
          if (isArray(aliasValue)) for (const v of aliasValue) args[v] = value
          return
        }
      }
    }

    args[argKey] = value
  }

  for (let i = 0, l = argv.length; i < l; i++) {
    const arg = argv[i]

    // '--flags' and '-alias'
    if (isFlag(arg) || isAlias(arg)) setArg(arg, i)
    // 'arguments' (unprefixed)
    else {
      const prevArg: string | undefined = argv[i - 1]

      if (!prevArg) {
        if (!arg.includes('=')) args._.push(arg)
      } else if (prevArg) {
        if (!prevArg.startsWith('-') || prevArg.includes('=')) {
          if (!arg.includes('=')) args._.push(arg)
        }
      }
    }
  }

  if (defaults) {
    if (defaults._) args._ = [...defaults._, ...args._]
    for (const [dKey, dValue] of Object.entries(defaults)) {
      if (dKey !== '_') args[dKey] = dValue
    }
  }

  return args as Args<T>
}
