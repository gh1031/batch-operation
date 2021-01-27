import zlib from 'zlib';
import fs from 'fs-extra';

const zlibStream = zlib.createGzip();

export default (path: string, outDir: string) => {
  const iptSteream = fs.createReadStream(path);
  const outStream = fs.createWriteStream(outDir + '.zip')
  iptSteream
    .pipe(zlibStream)
    .on('error', error => {
      console.log('create zlib error:',error)
    })
    .pipe(outStream)
    .on('error', error => {
      console.log('output error:', error)
    })
}
