<p align="center">
   <img alt="property-tycoon" src="https://user-images.githubusercontent.com/20372099/73877400-7a9e4e00-4850-11ea-9355-7b2d9ed2d788.png">
</p>

#

<p align="center">Property Tycoon written in JavaScript</p>

## Setup

First, make sure you have both NodeJS and npm installed on your machine.

On Ubuntu/Debian

```
$ apt install nodejs npm
```

On MacOS

If you use homebrew:
```
$ brew install node
```

If you don't use homebrew, use the [NodeJS installer](https://nodejs.org/en/download/).

On Windows 10

Use the [installer](https://nodejs.org/en/download/).

Next, clone or [download](https://github.com/ketnipz/property-tycoon/archive/master.zip) the repository.

```
$ git clone https://github.com/ketnipz/property-tycoon
```

Extract, navigate to location of repo and run `npm install` to get the dependencies.

```
$ cd /path/to/PropertyTycoon
$ npm install
```

To test the game, run `npm start` (Auto-opens in browser).

To build the game, run `npm run build`.

## Documentation

To build the docs for this project, you just need [JSDoc](https://jsdoc.app/).

```
$ npm i -g jsdoc
$ jsdoc -r -d docs src
```
