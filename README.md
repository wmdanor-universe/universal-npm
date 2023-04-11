# Universal Node.js Package Manager

This is a command-line tool that acts as a proxy for popular package managers used in Node.js projects, including npm, yarn (v1.x.x), and pnpm. With this tool, you can use the same set of commands to manage dependencies in your projects, regardless of the package manager that you prefer.

`unpm` is built using TypeScript and Yargs, and it offers a simple and intuitive CLI that makes it easy to use. You can use it to install, update, remove, and list dependencies, as well as to run scripts defined in your project's package.json file.

It will automatically detect which package manager is used in the project, so no additional configuration is needed from you.
In case you want to use `unpm` in a new project, default package manager will be used, this can be configured using `unpm config defaultPm <npm|yarn|pnpm>` command.
By default `npm` will be used for new projects.

## Installation

| Package Manager | Install Command |
| - | - |
| **npm** | `npm install universal-npm --location=global` |
| **yarn** | `yarn global add universal-npm` |
| **pnpm** | `pnpm install universal-npm --global` |

Once installed, you can use the `unpm` commands to interact with your dependencies, depending on the package manager used in your project. For example:

- Run `unpm` or `unpm install` for installing all your packages
- `unpm start`, `unpm build`, `unpm build:watch` for running scripts from package.json (you can also explicitly call `run` command by running `unpm run <script-name>`)
- `unpm i express` to add `express` to your application
- `unpm i -g ts-node` for installing the package globally

## Usage

Simply type the command below to your terminal to get a list of features

```console
unpm --help
```

## Note

unpm v1 will have support only for essential commands.

Commands that are not supported by all package managers are avoided.
Example: if the command is only supported by npm only, then it will not be added.

Essential commands are commands:

- for managing dependencies
- for running scripts
- few utility command like `init`, `bin`, etc.

Commands and options that are only used in pipelines are not going to be supported too.

## Creating new command

To create a new command use `create-command` script

You can enter new command name when invoking the script `npm run create-command <command-name>`

OR

You will be prompted to enter a new command name, if `<command-name>` was not specified

## `config` command

Package managers have different configuration options and file formats, so it's not feasible to provide a 
unified `config` command that works for all of them. Instead, you should refer to the documentation of each 
package manager for configuration details. For example, to configure npm, you can use the `npm config` command; 
to configure yarn, you can use the `yarn config` command; and to configure pnpm, you can use the `pnpm config` command.
You can also use the `unpm config` command to configure default settings for `unpm`, such as the default package manager to use in new projects.

## FAQ

### How to contribute

Right now contributing is not possible, if you found a bug, please create an issue and I will fix it when possible.

Contribution flow will be added soon.

### How to report bugs

If you find a bug in the tool, please create an issue on the [GitHub issues page](https://github.com/wmdanor-universe/universal-npm/issues)
and describe the problem in detail. I will do my best to fix it as soon as possible.

### Why is `@ts-ignore` added to the `builder` property definition?

To reduce development time (by not writing types for every command) utility types were created,
but the price to this is `builder` property type incompatibility in command module object.

Quick and easy solution for the type incompatibility was not found and
with current code structure this issue is not going to affect anything,
because all other types are inferred from command module object type annotation.
