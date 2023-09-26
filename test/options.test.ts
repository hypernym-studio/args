import { test, expect } from 'vitest'
import { createArgs } from '../src/index.js'

test('args-options', () => {
  interface Args {
    a?: string
    b?: string
    c?: string
    d?: boolean
    e?: boolean
    f?: boolean
  }

  // $ --a value --d
  const argsFlags = createArgs<Args>({
    argv: ['--a', 'value', '--d'],
    alias: {
      a: ['b', 'c'],
      d: ['e', 'f'],
    },
  })

  expect(argsFlags).toStrictEqual({
    _: [],
    a: 'value',
    b: 'value',
    c: 'value',
    d: true,
    e: true,
    f: true,
  })
})
