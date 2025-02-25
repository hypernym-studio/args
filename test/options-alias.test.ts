import { createArgs } from '@'
import { test, expect } from 'vitest'

test('args-options-alias', () => {
  interface Args {
    a?: string
    b?: string
    c?: string
    d?: boolean
    e?: boolean
    f?: boolean
  }

  const argsOptionsAlias = createArgs<Args>({
    argv: ['--c', 'value', '--e'],
    alias: {
      a: ['b', 'c'],
      d: ['e', 'f'],
    },
  })

  expect(argsOptionsAlias).toStrictEqual({
    _: [],
    a: 'value',
    b: 'value',
    c: 'value',
    d: true,
    e: true,
    f: true,
  })
})
