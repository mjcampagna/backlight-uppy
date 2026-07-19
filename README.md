# backlight-uppy

Bundles [Uppy](https://uppy.io/) as a self-hosted ESM for use in Backlight. Includes Core, Dashboard, Tus, and XHR Upload with extracted CSS.

## Quick Start

```bash
npm install
npm run build  # Production bundle → dist/
npm run dist   # Build and copy into a configured Backlight source tree
npm run watch  # Rollup watch mode
```

## Output

```
dist/uppy.bundle.js   # ESM bundle (Core + Dashboard + Tus + XHRUpload)
dist/uppy.css         # Dashboard styles
```

## Usage

```html
<head>
  <link rel="stylesheet" href="./dist/uppy.css" />
</head>
<body>
  <script type="module">
    import { Core, Dashboard, Tus, XHRUpload } from './dist/uppy.bundle.js';

    const uppy = new Core();
    uppy.use(Dashboard, { target: '#uppy' });
    uppy.use(Tus, { endpoint: '/upload' });
    uppy.use(XHRUpload, { endpoint: '/upload' });
  </script>
</body>
```

## Backlight Dist Copy

Use `npm run dist` to build the bundle and copy it into a Backlight `module-publisher` source tree.

### Setup

Create a local config file named `backlight-uppy.config.json` in the project root.

You can copy the example:

```bash
cp backlight-uppy.config.example.json backlight-uppy.config.json
```

Then edit it and set `targetPath`:

```json
{
  "targetPath": "~/Development/ttg/backlight-6"
}
```

The `targetPath` may point to either:

- your Backlight repo root, for example `~/Development/ttg/backlight-6`
- or directly to `~/Development/ttg/backlight-6/src/backlight/modules/module-publisher`

The local config file is ignored by git, so your machine-specific path stays local.

### Use

Run:

```bash
npm run dist
```

This command:

- runs the production bundle build
- resolves the `module-publisher` directory from `targetPath`
- copies the compiled assets into the expected Backlight locations

The copied files are:

```text
dist/uppy.bundle.js -> <target>/lib/js/uppy.js
dist/uppy.css       -> <target>/lib/css/uppy.min.css
```

For example, if `targetPath` is `~/Development/ttg/backlight-6`, the outputs land at:

```text
~/Development/ttg/backlight-6/src/backlight/modules/module-publisher/lib/js/uppy.js
~/Development/ttg/backlight-6/src/backlight/modules/module-publisher/lib/css/uppy.min.css
```

If `backlight-uppy.config.json` is missing, the command exits with an error and prints:

```text
Missing backlight-uppy.config.json. Copy backlight-uppy.config.example.json and set "targetPath".
```

If `targetPath` does not resolve to a valid Backlight `module-publisher` directory, the command exits with an error and shows the paths it checked.

## License

ISC
