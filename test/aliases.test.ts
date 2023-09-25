import { test, expect } from 'vitest'
import { createArgs } from '../src/index.js'

test('args-aliases', () => {
  interface ArgsAliases {
    'alias-a'?: string
    'alias-b'?: string
    'alias-c'?: boolean
    'alias-d'?: boolean
  }

  // $ -alias-a value-a -alias-b value-b -alias-c -alias-d
  const argsAliases = createArgs<ArgsAliases>({
    argv: [
      '-alias-a',
      'value-a',
      '-alias-b',
      'value-b',
      '-alias-c',
      '-alias-d',
    ],
  })

  expect(argsAliases).toStrictEqual({
    _: [],
    'alias-a': 'value-a',
    'alias-b': 'value-b',
    'alias-c': true,
    'alias-d': true,
  })
})
