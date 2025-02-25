import { createArgs } from '@'
import { test, expect } from 'vitest'

test('args-alias', () => {
  interface ArgsAlias {
    a?: string
    b?: string
    c?: boolean
    d?: boolean
  }

  const argsAlias = createArgs<ArgsAlias>({
    argv: ['-a=value', '-b', 'value', '-c', '-d'],
  })

  expect(argsAlias).toStrictEqual({
    _: [],
    a: 'value',
    b: 'value',
    c: true,
    d: true,
  })
})
