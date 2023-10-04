import { test, expect } from 'vitest'
import { createArgs } from '../src/index.js'

test('args-mix', () => {
  interface Args {
    foo?: string
    baz?: boolean
    cli?: string
    fuz?: boolean
  }

  // $ hello world --foo bar -baz -cli demo --fuz
  const argsMix = createArgs<Args>({
    argv: ['hello', 'world', '--foo', 'bar', '-baz', '-cli', 'demo', '--fuz'],
  })

  expect(argsMix).toStrictEqual({
    _: ['hello', 'world'],
    foo: 'bar',
    baz: true,
    cli: 'demo',
    fuz: true,
  })
})
