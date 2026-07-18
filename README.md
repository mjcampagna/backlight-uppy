# backlight-uppy

Bundles [Uppy](https://uppy.io/) as a self-hosted ESM for use in Backlight. Includes Core, Dashboard, Tus, and XHR Upload with extracted CSS.

## Quick Start

```bash
npm install
npm run build  # Production bundle → dist/
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

## License

ISC
