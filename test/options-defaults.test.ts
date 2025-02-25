import { createArgs } from '@'
import { test, expect } from 'vitest'

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
