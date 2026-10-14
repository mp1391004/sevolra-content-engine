import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {createLoginManager,imageCommand,codexCommand,oauthReady} from '../provider.mjs';
let signedIn=false,calls=0,child;
function fakeSpawn(file,args,options){calls++;assert.equal(options.shell,false);assert.equal(file,'codex-local');assert(args.includes('login'));child=new EventEmitter();child.stdout=new EventEmitter();child.stderr=new EventEmitter();child.kill=()=>{};return child;}
const manager=createLoginManager({ready:async()=>signedIn,command:async()=>({file:'codex-local',prefix:[]}),spawnProcess:fakeSpawn});
assert.equal((await manager.start()).status,'starting');await manager.start();assert.equal(calls,1);
child.stderr.emit('data',Buffer.from('Private output must never be exposed\nhttps://auth.openai.com/oauth/authorize?client_id=public&state=demo&code_challenge=demo\n'));
assert.equal(manager.snapshot().status,'waiting');assert(manager.snapshot().url.startsWith('https://auth.openai.com/'));assert(!JSON.stringify(manager.snapshot()).includes('Private output'));
signedIn=true;child.emit('close',0);await new Promise(r=>setTimeout(r,0));assert.deepEqual(manager.snapshot(),{status:'ready'});
assert.deepEqual(await manager.start(),{status:'ready'});assert.equal(calls,1);
const missing=createLoginManager({ready:async()=>false,command:async()=>null});assert.equal((await missing.start()).status,'error');
assert(await imageCommand());assert(await codexCommand());assert.equal(typeof await oauthReady(),'boolean');
console.log('PASS OAuth login: one process, OpenAI URL only, ready/error transitions, no raw output/tokens in browser response.');
