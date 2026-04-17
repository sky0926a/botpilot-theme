#!/usr/bin/env node
/**
 * Post-build script for @botpilot/theme
 *
 * 1. Prepends "use client" to all .js bundles (Next.js App Router needs this)
 * 2. Creates index.d.ts aliases for hashed .d.ts files (tsdown outputs hashed names
 *    but package.json exports reference index.d.ts)
 */
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

// 1. Add "use client" directive to all .js files
for (const f of fs.readdirSync(distDir, { recursive: true })) {
  if (f.endsWith('.js')) {
    const fp = path.join(distDir, f);
    const content = fs.readFileSync(fp, 'utf8');
    if (!content.startsWith('"use client"')) {
      fs.writeFileSync(fp, '"use client";\n' + content);
    }
  }
}

// 2. Create index.d.ts from hashed d.ts files
for (const entry of fs.readdirSync(distDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const subDir = path.join(distDir, entry.name);
  const indexDts = path.join(subDir, 'index.d.ts');
  if (fs.existsSync(indexDts)) continue;

  const dtsFiles = fs.readdirSync(subDir).filter(
    (f) => f.endsWith('.d.ts') && !f.endsWith('.d.ts.map')
  );
  if (dtsFiles.length === 1) {
    fs.copyFileSync(path.join(subDir, dtsFiles[0]), indexDts);
  }
}

// 3. Create stable top-level .d.ts aliases for hashed standalone entry files
for (const file of fs.readdirSync(distDir)) {
  if (!file.endsWith('.js') || file.endsWith('.js.map')) continue;

  const stem = file.slice(0, -3);
  const stableDts = path.join(distDir, `${stem}.d.ts`);
  if (fs.existsSync(stableDts)) continue;

  const hashedDts = fs
    .readdirSync(distDir)
    .find((candidate) => candidate.startsWith(`${stem}-`) && candidate.endsWith('.d.ts'));

  if (hashedDts) {
    fs.copyFileSync(path.join(distDir, hashedDts), stableDts);
  }
}
