import { createArgs } from '../src'

interface Args {
  a?: string
  b?: boolean
  c?: string
}
const args = createArgs<Args>({
  argv: ['arg', '-a', 'value-a', '-b', '-c', 'value-c'],
  alias: {
    d: ['c', 'f'],
  },
})

console.log(args)
