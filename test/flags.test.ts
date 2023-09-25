import { test, expect } from 'vitest'
import { createArgs } from '../src/index.js'

test('args-flags', () => {
  interface ArgsFlags {
    'flag-a'?: boolean
    'flag-b'?: string
    'flag-c'?: boolean
    'flag-d'?: string
  }

  // $ --flag-a --flag-b value-b --flag-c --flag-d value-d
  const argsFlags = createArgs<ArgsFlags>({
    argv: [
      '--flag-a',
      '--flag-b',
      'value-b',
      '--flag-c',
      '--flag-d',
      'value-d',
    ],
  })

  expect(argsFlags).toStrictEqual({
    _: [],
    'flag-a': true,
    'flag-b': 'value-b',
    'flag-c': true,
    'flag-d': 'value-d',
  })
})
