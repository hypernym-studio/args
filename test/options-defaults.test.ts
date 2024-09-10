import { test, expect } from 'vitest'
import { createArgs } from '@'

test('args-options-defaults', () => {
  interface Args {
    c?: boolean
    d?: string
  }

  const argsOptionsDefaults = createArgs<Args>({
    argv: [],
    defaults: {
      _: ['arg-a', 'arg-b'],
      c: true,
      d: 'value-d',
    },
  })

  expect(argsOptionsDefaults).toStrictEqual({
    _: ['arg-a', 'arg-b'],
    c: true,
    d: 'value-d',
  })
})
