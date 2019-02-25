# Hooked-Form

[![npm version](https://badge.fury.io/js/hooked-form.svg)](https://badge.fury.io/js/hooked-form)
[![Build Status](https://travis-ci.org/JoviDeCroock/hooked-form.svg?branch=master)](https://travis-ci.org/JoviDeCroock/hooked-form)
[![Bundle size](https://badgen.net/bundlephobia/minzip/hooked-form)](https://badgen.net/bundlephobia/minzip/hooked-form)
[![codecov](https://codecov.io/gh/JoviDeCroock/Hooked-Form/branch/master/graph/badge.svg)](https://codecov.io/gh/JoviDeCroock/Hooked-Form)

This form library was made only with functional components, making the initial goal
of having reduced bundle size easier to achieve.

I hope to make libraries like these a more recurring theme, since focussing on reduced
bundle size isn't only the concern of the application developer. It is also a
commitment that should be made by library authors.

[Docs](https://jovidecroock.github.io/hooked-form/)

[Example](https://codesandbox.io/s/k8mylo9lo)

## Installation

**yarn**

```bash
  yarn add hooked-form
```

**npm**

```bash
  npm i --save hooked-form
```

**UMD**

_dev_:

```html
<script src="https://unpkg.com/hooked-form@latest/dist/hooked-form.umd.js"></script>
```

_prod_:

```html
<script src="https://unpkg.com/hooked-form@latest/dist/prod/hooked-form.umd.js"></script>
```

## Modern build

This library offers a modern build (ES2015 output), this is smaller and parses faster in the browser.
So if you don't plan to target older browsers feel free to use this.

### Webpack

```json
  "resolve": {
    "alias": {
      "hooked-form": "hooked-form/dist/hooked-form.modern.js"
    }
  }
```

### Parcel

```json
  "alias": {
    "hooked-form": "hooked-form/dist/hooked-form.modern.js"
  }
```

## Credits

- [Microbundle](https://github.com/developit/microbundle)
