import { test, expect } from 'vitest'
import { createArgs } from '../src/index.js'

test('args-aliases', () => {
  interface ArgsAliases {
    a?: string
    b?: string
    c?: boolean
    d?: boolean
  }

  // $ -a value -b value -c -d
  const argsAliases = createArgs<ArgsAliases>({
    argv: ['-a', 'value', '-b', 'value', '-c', '-d'],
  })

  expect(argsAliases).toStrictEqual({
    _: [],
    a: 'value',
    b: 'value',
    c: true,
    d: true,
  })
})
