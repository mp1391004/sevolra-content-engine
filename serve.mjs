import {oauthReady,imageCommand,createLoginManager,oauthEnvironment} from './provider.mjs';
import {assertSpatialPlan} from './spatial.mjs';
import {reviewImage} from './visual-qa.mjs';
import http from 'node:http';import path from 'node:path';import{fileURLToPath}from'node:url';import{readFile,writeFile,mkdir,readdir,access}from'node:fs/promises';import{spawn}from'node:child_process';import{draft30}from'./engine.mjs';import{mapLimit,validateBatch}from'./batch.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));const port=Number(process.env.PORT||4329);const host='127.0.0.1';
const data=JSON.parse(await readFile(path.join(root,'data.json'),'utf8'));const batches=new Map();const writes=new Map();const login=createLoginManager();let globalActive=0;const globalWaiters=[];
await mkdir(path.join(root,'generated/images'),{recursive:true});await mkdir(path.join(root,'generated/batches'),{recursive:true});
for(const file of await readdir(path.join(root,'generated/batches'))){if(!file.endsWith('.json'))continue;try{const b=JSON.parse(await readFile(path.join(root,'generated/batches',file),'utf8'));for(const j of b.jobs)if(['running','queued','reviewing','repairing'].includes(j.status)){j.status='error';j.error='Lượt chạy trước bị gián đoạn. Có thể chạy lại.';}b.status=b.jobs.every(j=>j.status==='done')?'done':b.jobs.some(j=>j.image_url)?'partial':'error';batches.set(b.id,b);}catch{}}
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.md':'text/plain; charset=utf-8'};
function send(res,status,body,type='application/json; charset=utf-8'){res.writeHead(status,{'content-type':type,'cache-control':'no-store'});res.end(typeof body==='string'||Buffer.isBuffer(body)?body:JSON.stringify(body));}
async function inputJson(req){let n=0;const chunks=[];for await(const part of req){n+=part.length;if(n>100000)throw Error('Nội dung quá lớn.');chunks.push(part);}return JSON.parse(Buffer.concat(chunks).toString()||'{}');}
async function persist(b){const previous=writes.get(b.id)||Promise.resolve();const content=JSON.stringify(b,null,2);const write=previous.catch(()=>{}).then(()=>writeFile(path.join(root,'generated/batches',b.id+'.json'),content));writes.set(b.id,write);await write;}
async function acquire(){if(globalActive<10){globalActive++;return;}await new Promise(resolve=>globalWaiters.push(resolve));}
function release(){const next=globalWaiters.shift();if(next)next();else globalActive--;}
async function renderImage(job,repair=false){
 const output=path.join(root,'generated/images',job.id+(repair?'-repair':'')+'.png');const refs=[...(repair?[job.image_url.slice(1)]:[]),job.story.reference,job.story.character.image,...(job.story.layout?.reference?[job.story.layout.reference]:[])].map(x=>path.join(root,x));for(const ref of refs)await access(ref);
 const command=await imageCommand();if(!command)throw Error('Chưa cài bộ chạy. Mở file Khởi động Sevolra để setup.');
 const imagePrompt=repair?'Edit the first image to correct ONLY the physical staging defects identified in this review: '+job.qa.summary+' '+job.qa.panels.filter(p=>!p.layout_ok||!p.product_orientation_ok||!p.product_scale_ok||!p.text_placement_ok||!p.face_visible||!p.text_ok).map(p=>'Panel '+p.number+': '+p.reason).join('; ')+'. Preserve actor identity, Sevolra product, all four numbers/timings/text/CTA. Use the attached cabin reference for fixed geometry. Correct spatial plan: '+job.story.storyboard_prompt:job.story.storyboard_prompt;
 const roles=repair?'INPUT ROLES: image1 is the edit target; image2 is official product identity; image3 is the exact presenter identity; '+(job.story.layout?'image4 is the correct cabin geometry.':''):'INPUT ROLES: image1 is official product identity; image2 is the exact presenter identity; '+(job.story.layout?'image3 is the correct cabin geometry.':'');
 const args=[...command.prefix,'edit',roles+'\n\n'+imagePrompt,'--oauth','--size','1536x2048','--quality','medium','-o',output];for(const ref of refs)args.push('-i',ref);
 // Reuse the old Content Engine's existing OAuth image provider. No credential values enter prompts or logs.
 await new Promise((resolve,reject)=>{const child=spawn(command.file,args,{cwd:root,shell:false,env:{...oauthEnvironment(),PATH:path.join(process.env.HOME||'','.bun/bin')+':'+(process.env.PATH||'')}});child.stdout.resume();child.stderr.resume();const timer=setTimeout(()=>{child.kill('SIGTERM');reject(Error('Tạo ảnh quá thời gian. Hãy chạy lại riêng storyboard này.'));},360000);child.on('error',()=>{clearTimeout(timer);reject(Error('Không khởi động được kết nối tạo ảnh.'));});child.on('close',code=>{clearTimeout(timer);code===0?resolve():reject(Error('Kết nối tạo ảnh chưa hoàn tất (mã '+code+'). Có thể chạy lại, các ảnh đã xong vẫn được giữ.'));});});
 const bytes=await readFile(output);if(bytes.length<1000||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Kết nối chưa trả về ảnh PNG hợp lệ.');
 job.image_url='/generated/images/'+path.basename(output);job.image_bytes=bytes.length;
}
async function runBatch(b){
 await mapLimit(b.jobs,b.parallel,async job=>{await acquire();job.status='running';job.started_at=new Date().toISOString();b.active++;b.peak_active=Math.max(b.peak_active,b.active);await persist(b);
 try{assertSpatialPlan(job.story);await renderImage(job);job.status='reviewing';await persist(b);job.qa=await reviewImage(root,job,path.join(root,job.image_url.slice(1)));if(job.qa.status==='fail'){job.initial_image_url=job.image_url;job.initial_qa=job.qa;job.status='repairing';await persist(b);await renderImage(job,true);job.status='reviewing';await persist(b);job.qa=await reviewImage(root,job,path.join(root,job.image_url.slice(1)));}job.status=job.qa.status==='pass'?'done':'needs_review';}catch(e){job.status='error';job.error=e.message;}finally{job.finished_at=new Date().toISOString();b.active--;release();await persist(b);}});
 b.status=b.jobs.every(j=>j.status==='done')?'done':b.jobs.some(j=>j.image_url)?'partial':'error';b.finished_at=new Date().toISOString();await persist(b);
}
const server=http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://'+host+':'+port);
 if(req.method==='POST'){
  const origin=req.headers.origin;if(origin&&!['http://127.0.0.1:'+port,'http://localhost:'+port].includes(origin))return send(res,403,{error:'Không cho phép yêu cầu từ trang khác.'});
  if(url.pathname==='/api/auth/login')return send(res,202,await login.start());
  if(url.pathname==='/api/batches'){
   let input;try{input=validateBatch(await inputJson(req));assertSpatialPlan(draft30(data,input.kb,input.page,input.cap));}catch(e){return send(res,400,{error:e.message});}
   if(!(await oauthReady()))return send(res,503,{error:'Bấm Đăng nhập GPT trước khi tạo ảnh.'});
   if([...batches.values()].filter(b=>b.status==='running').length>=3)return send(res,429,{error:'Đang có 3 lô chạy. Chờ một lô hoàn tất rồi chạy tiếp.'});
   const id='B-'+Date.now()+'-'+Math.random().toString(36).slice(2,7);const b={id,...input,status:'running',active:0,peak_active:0,created_at:new Date().toISOString(),jobs:Array.from({length:input.count},(_,i)=>({id:id+'-'+(i+1),index:i+1,status:'queued',story:draft30(data,input.kb,input.page,input.cap,i)}))};batches.set(id,b);await persist(b);send(res,202,b);runBatch(b).catch(async()=>{b.status='error';b.error='Lô chạy bị gián đoạn; các ảnh đã tạo vẫn được giữ.';await persist(b);});return;
  }
  return send(res,404,{error:'Không tìm thấy thao tác.'});
 }
 if(url.pathname==='/api/auth/status')return send(res,200,await oauthReady()?{status:'ready'}:login.snapshot());
 if(url.pathname==='/api/health')return send(res,200,{ok:true,image_ready:await oauthReady(),max_parallel:10});
 if(url.pathname==='/api/batches')return send(res,200,{batches:[...batches.values()].sort((a,b)=>b.created_at.localeCompare(a.created_at)).slice(0,20)});
 if(url.pathname.startsWith('/api/batches/')){const b=batches.get(url.pathname.split('/').at(-1));return send(res,b?200:404,b||{error:'Không tìm thấy lô chạy.'});}
 const name=decodeURIComponent(url.pathname);if(name.split('/').some(x=>x.startsWith('.')))return send(res,403,'Forbidden','text/plain');const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))return send(res,403,'Forbidden','text/plain');const bytes=await readFile(file);if(url.searchParams.get('download')==='1')res.setHeader('content-disposition','attachment; filename="'+path.basename(file)+'"');return send(res,200,bytes,mime[path.extname(file)]||'application/octet-stream');
}catch{return send(res,404,{error:'Không tìm thấy nội dung hoặc yêu cầu không hợp lệ.'});}});
server.listen(port,host,()=>console.log('Sevolra Content Engine: http://'+host+':'+port));
