import { test, expect } from 'vitest'
import { createArgs } from '@'

test('args-flags', () => {
  interface ArgsFlags {
    a?: boolean
    b?: string
    c?: boolean
    d?: string
  }

  const argsFlags = createArgs<ArgsFlags>({
    argv: ['--a', '--b=value', '--c', '--d', 'value'],
  })

  expect(argsFlags).toStrictEqual({
    _: [],
    a: true,
    b: 'value',
    c: true,
    d: 'value',
  })
})
