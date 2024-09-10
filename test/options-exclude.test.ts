import { test, expect } from 'vitest'
import { createArgs } from '@'

test('args-options-exclude', () => {
  interface Args {
    a?: boolean
    b?: boolean
    d?: string
  }

  const argsOptionsExclude = createArgs<Args>({
    argv: ['arg', '--a', '-b', 'c', '--d', 'value-d', '-e', '--f'],
    exclude: ['c', '-e', '--f'],
  })

  expect(argsOptionsExclude).toStrictEqual({
    _: ['arg'],
    a: true,
    b: true,
    d: 'value-d',
  })
})
