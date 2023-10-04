# @hypernym/args

A fast and ultra lightweight CLI argument parser.

<sub><a href="https://github.com/hypernym-studio/args">Repository</a> | <a href="https://www.npmjs.com/package/@hypernym/args">Package</a> | <a href="https://github.com/hypernym-studio/args/releases">Releases</a> | <a href="https://github.com/hypernym-studio/args/discussions">Discussions</a></sub>

```sh
npm i @hypernym/args
```

## Features

- TypeScript friendly
- Fully tree-shakeable
- No dependencies

## Parser

### Arguments

Unprefixed inputs are stored in an array.

```sh
$ arg

# => { _: ['arg'] }
```

```sh
$ arg-a arg-b arg-c

# => { _: ['arg-a', 'arg-b', 'arg-c'] }
```

### Flags

Inputs with `--` prefix are parsed as _flags_.

By default, standalone flags with no value are defined as `true`.

```sh
$ --flag

# => { _: [], flag: true, }
```

```sh
$ --flag value

# => { _: [], flag: 'value', }
```

### Aliases

Inputs with `-` prefix are parsed as _aliases_.

By default, standalone aliases with no value are defined as `true`.

```sh
$ -alias

# => { _: [], alias: true, }
```

```sh
$ -alias value

# => { _: [], alias: 'value', }
```

### Ignores

- Ignores standalone inputs `--` and `-`
- Ignores all inputs that include `=`

```sh
$ --flag=value -- arg=value - -alias=value

# => { _: [] }
```

## Usage

```sh
$ hello world --foo bar -baz -cli demo --fuz
```

```ts
import { createArgs } from '@hypernym/args'

interface Args {
  foo?: string
  baz?: boolean
  cli?: string
  fuz?: boolean
}

const args = createArgs<Args>()

console.log(args)

/* Output:
{
  _: ['hello', 'world'],
  foo: 'bar',
  baz: true,
  cli: 'demo',
  fuz: true
}
*/
```

## Options

### argv

- Type: `string[]`
- Default: `process.argv.slice(2)`

```ts
const args = createArgs({
  argv: process.argv.slice(2),
})
```

### alias

- Type: `object`
- Default: `undefined`

```ts
const args = createArgs({
  alias: {
    config: ['conf', 'c'],
    help: 'h',
  },
})
```

## Community

Feel free to use the official [discussions](https://github.com/hypernym-studio/args/discussions) for any additional questions.

## License

Developed in 🇭🇷 Croatia

Released under the [MIT](LICENSE.txt) license.

© Hypernym Studio
