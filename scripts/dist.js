import { mkdirSync, existsSync, copyFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, 'backlight-uppy.config.json');

if (!existsSync(configPath)) {
  console.error(
    'Missing backlight-uppy.config.json. Copy backlight-uppy.config.example.json and set "targetPath".',
  );
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, 'utf8'));

if (!config.targetPath || typeof config.targetPath !== 'string') {
  console.error('Invalid config: "targetPath" must be a non-empty string.');
  process.exit(1);
}

function expandHomeDir(inputPath) {
  if (inputPath === '~') {
    return os.homedir();
  }

  if (inputPath.startsWith('~/')) {
    return path.join(os.homedir(), inputPath.slice(2));
  }

  return inputPath;
}

function resolveModulePublisherRoot(targetPath) {
  const expandedTargetPath = path.resolve(projectRoot, expandHomeDir(targetPath));
  const modulePublisherSuffix = path.join(
    'src',
    'backlight',
    'modules',
    'module-publisher',
  );
  const repoRootCandidate = path.join(expandedTargetPath, modulePublisherSuffix);

  if (existsSync(path.join(repoRootCandidate, 'lib'))) {
    return repoRootCandidate;
  }

  if (existsSync(path.join(expandedTargetPath, 'lib'))) {
    return expandedTargetPath;
  }

  console.error(
    [
      'Could not resolve module-publisher target from config targetPath.',
      `Checked: ${repoRootCandidate}`,
      `Checked: ${expandedTargetPath}`,
    ].join('\n'),
  );
  process.exit(1);
}

const modulePublisherRoot = resolveModulePublisherRoot(config.targetPath);
const sourceJsPath = path.join(projectRoot, 'dist', 'uppy.bundle.js');
const sourceCssPath = path.join(projectRoot, 'dist', 'uppy.css');
const targetJsPath = path.join(modulePublisherRoot, 'lib', 'js', 'uppy.js');
const targetCssPath = path.join(modulePublisherRoot, 'lib', 'css', 'uppy.min.css');

mkdirSync(path.dirname(targetJsPath), { recursive: true });
mkdirSync(path.dirname(targetCssPath), { recursive: true });
copyFileSync(sourceJsPath, targetJsPath);
copyFileSync(sourceCssPath, targetCssPath);

console.log(`Copied ${sourceJsPath} -> ${targetJsPath}`);
console.log(`Copied ${sourceCssPath} -> ${targetCssPath}`);
