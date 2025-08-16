<h1 align="center">@hypernym/args</h1>

<p align="center">A fast and ultra lightweight CLI argument parser.</p>

<p align="center">
  <a href="https://github.com/hypernym-studio/args">Repository</a>
  <span>✦</span>
  <a href="https://www.npmjs.com/package/@hypernym/args">Package</a>
  <span>✦</span>
  <a href="https://github.com/hypernym-studio/args/releases">Releases</a>
  <span>✦</span>
  <a href="https://github.com/hypernym-studio/args/discussions">Discussions</a>
</p>

<br>

<pre align="center">pnpm add @hypernym/args</pre>

<br>

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

```sh
$ --flag=value

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

```sh
$ -alias=value

# => { _: [], alias: 'value', }
```

### Ignores

- Ignores standalone inputs `--` and `-`
- Ignores argument inputs that include `=`

```sh
$ arg=value -- arg-b=value -

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

/*
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

Specifies an array of values to parse as arguments.

- Type: `string[] | undefined`
- Default: `process.argv.slice(2)`

```ts
import { createArgs } from '@hypernym/args'

createArgs({
  argv: process.argv.slice(2),
})
```

### alias

Specifies an object of `alias` that will be added to the parsed output with matching values.

- Type: `Record<string, string | string[]> | undefined`
- Default: `undefined`

```ts
import { createArgs } from '@hypernym/args'

createArgs({
  alias: {
    config: ['conf', 'c'],
    help: 'h',
  },
})
```

### defaults

Specifies an object of `defaults` that will be added to the parsed output regardless of `CLI` inputs.

- Type: `(Record<string, unknown> & { _?: string[] }) | undefined`
- Default: `undefined`

```ts
import { createArgs } from '@hypernym/args'

createArgs({
  defaults: {
    _: ['value'],
    a: true,
  },
})
```

### exclude

Specifies an array of values that will be skipped when parsing arguments.

- Type: `string[] | undefined`
- Default: `undefined`

```ts
import { createArgs } from '@hypernym/args'

createArgs({
  exclude: ['arg', '--flag', '-alias'],
})
```

## License

Developed in 🇭🇷 Croatia, © Hypernym Studio.

Released under the [MIT](LICENSE.txt) license.
