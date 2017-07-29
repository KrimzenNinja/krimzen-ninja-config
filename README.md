# krimzen-ninja-config

![NPM](https://nodei.co/npm/krimzen-ninja-config.png)
![CircleCi](https://circleci.com/gh/KrimzenNinja/krimzen-ninja-config.svg?style=shield)
![Known Vulnerabilities](https://snyk.io/test/npm/krimzen-ninja-config/badge.svg)
[![codecov](https://codecov.io/gh/KrimzenNinja/krimzen-ninja-config/branch/master/graph/badge.svg)](https://codecov.io/gh/KrimzenNinja/krimzen-ninja-config)

Module for setting up convention based config in krimzen-ninja projects

## Install

    $ npm install --save krimzen-ninja-config

## Usage

```js
import myModule from 'krimzen-ninja-config'

myModule()
//TODO
```

## API

[See details](https://github.com/KrimzenNinja/krimzen-ninja-config/blob/master/API.md)

## License

MIT © [Ryan Kotzen](https://github.com/KrimzenNinja)

## Contributing to this module

Install [Chandler](https://github.com/mattbrictson/chandler) to sync your `CHANGELOG.md` entries to GitHub

### How to publish to NPM

You can either do releases from the master branch or follow the LTS model and branch off when you do a release.

1. Ensure you are on the branch you want to publish from.
1. Decide based on what is going into the release how the version number is going to change, see [Semantic Versioning](http://semver.org/) for more info.
1. The `CHANGELOG.md` file should have pending changes documented in the `Unreleased` section, create a new heading for this version and cut the relevant changes and paste them into the new section.
1. Commit the changes to the `CHANGELOG.md` file.
1. Run one of the prebuilt publish commands that matches your `semver` `patch`, `minor`, `major`
	> `npm run patch -m "A message that makes sense"`
	If none of the prebuilt ones fit, you can use `npm version [major | minor | patch | premajor | preminor | prepatch | prerelease] -m "A message that makes sense"`
1. If you didn't publish from master, make sure to merge back into master if you were fixing a bug or the changes released need to go back to master.

### Snyk dependency checking

You can either add your project via the [web dashboard](https://snyk.io/) or via the cli by installing the lib `npm i -g snyk` and then running the setup `snyk wizzard`.
