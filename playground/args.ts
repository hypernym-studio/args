import { createArgs } from '../src/index.js'

interface Args {}

const args = createArgs<Args>()

console.log(args)
