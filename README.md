# @hypernym/args

A fast and ultra lightweight CLI argument parser.

<sub><a href="https://github.com/hypernym-studio/args">Repository</a> | <a href="https://www.npmjs.com/package/@hypernym/args">Package</a> | <a href="https://github.com/hypernym-studio/args/releases">Releases</a> | <a href="https://github.com/hypernym-studio/args/discussions">Discussions</a></sub>

```sh
npm i -D @hypernym/args
```

## Features

- TypeScript friendly
- Fully tree-shakeable
- No dependencies

## Parser

### Commands

Specifies _commands_ without a prefix.

```sh
$ command

# => { _: ['command'] }
```

```sh
$ command-a command-b command-c

# => { _: ['command-a', 'command-b', 'command-c'] }
```

### Flags

Specifies _flags_ with the `--` prefix.

```sh
$ --flag

# => { _: [], flag: true, }
```

```sh
$ --flag value

# => { _: [], flag: 'value', }
```

### Aliases

Specifies _aliases_ with the `-` prefix.

```sh
$ -alias

# => { _: [], alias: true, }
```

```sh
$ -alias value

# => { _: [], alias: 'value', }
```

### Ignores

- Ignores args `--` and `-`
- Ignores all args that include `=`

```sh
$ --flag=value -- arg=value - -alias=value

# => { _: [] }
```

## Usage

### Simple

```sh
$
```

```ts
import { createArgs } from '@hypernym/args'

interface Args {}

const args = createArgs<Args>()

console.log(args)

/*

*/
```

### Custom

```sh
$
```

```ts
import { createArgs } from '@hypernym/args'

interface Args {}

const args = createArgs<Args>({
  alias: {
    alias: ['a', 'b'],
    command: 'cmd',
  },
})

console.log(args)

/* 

*/
```

## Community

Feel free to use the official [discussions](https://github.com/hypernym-studio/args/discussions) for any additional questions.

## License

Developed in 🇭🇷 Croatia

Released under the [MIT](LICENSE.txt) license.

© Hypernym Studio
