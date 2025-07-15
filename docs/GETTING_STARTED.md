# Getting Started

This guide demonstrates how to use the Swiss Ephemeris WebAssembly module and the accompanying TypeScript wrapper.

## Installation

Download the prebuilt files from the GitHub release or build them yourself using the provided Makefile.
The distributable artifacts are created by the build workflow and placed in the `dist/` directory. They include:

- `astro.mjs` – ES module wrapper around the wasm code
- `astro.wasm` – WebAssembly binary
- `astro.data` – ephemeris data packaged for the virtual file system
- `sweph.js` and `sweph.d.ts` – TypeScript wrapper

## Usage

```html
<script type="module">
import { Sweph } from 'https://cdn.jsdelivr.net/gh/<owner>/<repo>@<tag>/dist/sweph.js';

const sweph = await Sweph.init('https://cdn.jsdelivr.net/gh/<owner>/<repo>@<tag>/dist/astro.mjs');
const result = sweph.get({
  year: 2024,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  lonG: 0,
  lonM: 0,
  lonS: 0,
  lonEW: 'E',
  latG: 0,
  latM: 0,
  latS: 0,
  latNS: 'N',
  houseSystem: 'P'
});
console.log(result);
</script>
```

Replace `<owner>`, `<repo>` and `<tag>` with the release you wish to use.
