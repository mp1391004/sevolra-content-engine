import path from 'node:path';
import os from 'node:os';
import {access,readFile} from 'node:fs/promises';
import {constants} from 'node:fs';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const home=os.homedir();
export function oauthEnvironment(){const {OPENAI_API_KEY,OPENAI_BASE_URL,...env}=process.env;return env;}
export async function executable(name,override){
 const names=[override,path.join(root,'node_modules/.bin',name+(process.platform==='win32'?'.exe':'')),path.join(root,'node_modules/.bin',name),path.join(home,'.bun/bin',name+(process.platform==='win32'?'.exe':'')),path.join(home,'.local/bin',name),...(process.env.PATH||'').split(path.delimiter).map(dir=>path.join(dir,name+(process.platform==='win32'?'.exe':'')))].filter(Boolean);
 for(const file of names){try{await access(file,constants.X_OK);return file;}catch{}}
 return null;
}
export async function imageCommand(){const bun=await executable('bun',process.env.BUN_BIN);if(!bun)return null;const local=path.join(root,'node_modules/gpt-image/src/cli.ts');try{await access(local);return {file:bun,prefix:[local]};}catch{}const bunx=await executable('bunx',process.env.BUNX_BIN);return bunx?{file:bunx,prefix:['gpt-image@0.1.0']}:null;}
export async function codexCommand(){const bun=await executable('bun',process.env.BUN_BIN);const local=path.join(root,'node_modules/@openai/codex/bin/codex.js');if(bun)try{await access(local);return {file:bun,prefix:[local]};}catch{}const bin=await executable('codex',process.env.CODEX_BIN);return bin?{file:bin,prefix:[]}:null;}
export async function oauthReady(){
 if(!await imageCommand())return false;
 const files=[{file:path.join(process.env.XDG_CONFIG_HOME||path.join(home,'.config'),'gpt-image/auth.json'),nested:false},{file:path.join(home,'.codex/auth.json'),nested:true}];
 for(const x of files)try{const data=JSON.parse(await readFile(x.file,'utf8')),tokens=x.nested?data.tokens:data;if(tokens?.access_token)return true;}catch{}
 return false;
}
export function createLoginManager({ready=oauthReady,command=codexCommand,spawnProcess=spawn,timeoutMs=300000}={}){
 let state={status:'idle'},child;
 return {snapshot:()=>({...state}),async start(){
  if(await ready())return state={status:'ready'};
  if(child)return this.snapshot();
  const cmd=await command();if(!cmd)return state={status:'error',error:'Chưa cài bộ chạy. Mở file Khởi động Sevolra để setup.'};
  state={status:'starting'};let buffer='';
  const running=spawnProcess(cmd.file,[...cmd.prefix,'-c','cli_auth_credentials_store="file"','-c','forced_login_method="chatgpt"','login'],{cwd:root,shell:false,env:oauthEnvironment()});child=running;
  const timer=setTimeout(()=>{running.kill('SIGTERM');state={status:'error',error:'Đăng nhập hết thời gian. Bấm Đăng nhập GPT để thử lại.'};},timeoutMs);timer.unref?.();
  const inspect=chunk=>{buffer=(buffer+chunk.toString()).slice(-12000);const match=buffer.match(/https:\/\/auth\.openai\.com\/oauth\/authorize\?[^\s]+/);if(match){state={status:'waiting',url:match[0]};buffer='';}};
  // OAuth URL contains only public client, PKCE challenge and state. Never forward raw CLI output or tokens.
  running.stdout.on('data',inspect);running.stderr.on('data',inspect);
  running.on('error',()=>{clearTimeout(timer);child=null;state={status:'error',error:'Không mở được đăng nhập GPT. Chạy lại bộ khởi động.'};});
  running.on('close',async code=>{clearTimeout(timer);child=null;state=code===0&&await ready()?{status:'ready'}:{status:'error',error:'Đăng nhập chưa hoàn tất. Kiểm tra cửa sổ đăng nhập hoặc cổng 1455, rồi thử lại.'};});
  return this.snapshot();
 }};
}
