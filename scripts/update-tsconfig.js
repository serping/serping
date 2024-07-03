// scripts/update-tsconfig.js

const fs = require('fs');
const path = require('path');

const updateTsconfig = () => {
  const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    console.error(`tsconfig.json not found at ${tsconfigPath}`);
    process.exit(1);
  }

  const tsconfig = require(tsconfigPath);

  const pathsToAdd = {
    "@serping/*": ["./node_modules/serping/src/*"]
  };

  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};

  if (!tsconfig.compilerOptions.paths["@serping/*"]) {
    tsconfig.compilerOptions.paths = {
      ...tsconfig.compilerOptions.paths,
      ...pathsToAdd
    };

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log('Updated tsconfig.json with paths for @serping/*');
  } else {
    console.log('tsconfig.json already contains paths for @serping/*');
  }
};

updateTsconfig();
