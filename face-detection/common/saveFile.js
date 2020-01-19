const fs = require('fs');
const path = require('path');

module.exports = (fileName, buf) => {
  const outDir = path.resolve(__dirname, '../images/out');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(path.resolve(outDir, fileName), buf);
};