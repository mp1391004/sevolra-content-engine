import {readFile,writeFile} from 'node:fs/promises';
import {draft30,markdown30} from './engine.mjs';
const data=JSON.parse(await readFile(new URL('./data.json',import.meta.url),'utf8'));
try{
const [kb='KB-01',page='Drive',cap,out]=process.argv.slice(2);
const d=draft30(data,kb,page,cap);
if(out){await writeFile(out,markdown30(d));await writeFile(out.replace(/\.md$/,'.json'),JSON.stringify(d,null,2));console.log(`Saved ${kb} ${page}: ${out}`);}else console.log(markdown30(d));
}catch(e){console.error(e.message);process.exitCode=1;}
