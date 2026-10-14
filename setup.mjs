import {spawn} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
function run(args){return new Promise((resolve,reject)=>{const p=spawn(process.execPath,args,{cwd:root,stdio:'inherit',shell:false});p.on('error',reject);p.on('close',code=>code===0?resolve():reject(Error('Không hoàn tất setup ('+code+').')));});}
try{
 if(!process.versions.bun)throw Error('Mở file Khởi động Sevolra để cài bộ chạy Bun.');
 console.log('Đang chuẩn bị Sevolra…');await run(['install','--frozen-lockfile']);
 let live=false;try{live=(await fetch('http://127.0.0.1:4329/api/health',{signal:AbortSignal.timeout(1000)})).ok;}catch{}
 if(!live){const server=spawn(process.execPath,['serve.mjs'],{cwd:root,stdio:'inherit',shell:false});server.on('error',()=>console.error('Không khởi động được tool.'));for(let i=0;i<30;i++){try{if((await fetch('http://127.0.0.1:4329/api/health')).ok){live=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}if(!live)throw Error('Cổng4329 đang bận hoặc tool chưa khởi động.');}
 const url='http://127.0.0.1:4329/';const cmd=process.platform==='darwin'?['open',url]:process.platform==='win32'?['rundll32.exe','url.dll,FileProtocolHandler',url]:['xdg-open',url];spawn(cmd[0],cmd.slice(1),{stdio:'ignore',shell:false}).on('error',()=>console.log('Mở '+url));console.log('Tool sẵn sàng. Bấm Đăng nhập GPT trong trang vừa mở. Giữ cửa sổ này khi dùng tool.');
}catch(e){console.error(e.message);process.exitCode=1;}
