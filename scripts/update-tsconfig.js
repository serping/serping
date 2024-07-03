const fs = require('fs');
const path = require('path');

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

if (fs.existsSync(tsconfigPath)) {
  const tsconfig = require(tsconfigPath);
  
  const pathsToAdd = {
    "@serping/*": ["node_modules/serping/src/*"]
  };

  if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths && !tsconfig.compilerOptions.paths["@serping/*"]) {
    tsconfig.compilerOptions.paths = {
      ...tsconfig.compilerOptions.paths,
      ...pathsToAdd
    };

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log('Updated tsconfig.json with paths for @serping/*');
  } else {
    console.log('tsconfig.json already contains paths for @serping/* or is not a TypeScript project');
  }
} else {
  console.log('tsconfig.json not found. Skipping update.');
}
