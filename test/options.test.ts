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

  // $ --c value --e
  const argsOptions = createArgs<Args>({
    argv: ['--c', 'value', '--e'],
    alias: {
      a: ['b', 'c'],
      d: ['e', 'f'],
    },
  })

  expect(argsOptions).toStrictEqual({
    _: [],
    a: 'value',
    b: 'value',
    c: 'value',
    d: true,
    e: true,
    f: true,
  })
})
