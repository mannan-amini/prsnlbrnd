import fs from 'node:fs';

const lockPath = './package-lock.json';
const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));

// 1. Fix packages mapping
const newPackages = {};

for (const [key, val] of Object.entries(lock.packages)) {
  // Skip sharp completely as it is not needed or used
  if (key.includes('sharp')) continue;

  let newKey = key;
  if (newKey.startsWith('../node_modules/')) {
    newKey = newKey.replace('../node_modules/', 'node_modules/');
  }

  // Remove extraneous flag
  if (val.extraneous) {
    delete val.extraneous;
  }

  // Mark platform-specific packages as optional
  if (newKey.includes('@next/swc-') || (val.os && val.os.length > 0) || (val.cpu && val.cpu.length > 0)) {
    val.optional = true;
  }

  newPackages[newKey] = val;
}

// 2. Add Linux SWC package as optional so npm ci on Cloudflare Linux runner finds it
if (!newPackages['node_modules/@next/swc-linux-x64-gnu']) {
  newPackages['node_modules/@next/swc-linux-x64-gnu'] = {
    version: '15.5.28',
    resolved: 'https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-15.5.28.tgz',
    cpu: ['x64'],
    optional: true,
    os: ['linux'],
    engines: {
      node: '>= 10',
    },
  };
}

// 3. Fix root dependencies
if (newPackages[''] && newPackages[''].dependencies) {
  delete newPackages[''].dependencies['sharp'];
}

lock.packages = newPackages;

fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2), 'utf8');
console.log('✓ package-lock.json cleaned and made cross-platform!');
