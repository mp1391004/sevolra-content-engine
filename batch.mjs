export async function mapLimit(items,limit,worker){let next=0;const result=[];async function run(){while(next<items.length){const i=next++;result[i]=await worker(items[i],i);}}await Promise.all(Array.from({length:Math.min(limit,items.length)},run));return result;}
export function validateBatch(input){
 const count=Number(input.count??1),parallel=Number(input.parallel??2);
 if(!Number.isInteger(count)||count<1||count>12)throw Error('Chọn số lượng từ 1 đến 12.');
 if(!Number.isInteger(parallel)||parallel<1||parallel>10)throw Error('Chọn số luồng từ 1 đến 10.');
 if(!['Drive','Desk'].includes(input.page))throw Error('Chọn page Drive hoặc Desk.');
 if(typeof input.kb!=='string'||typeof input.cap!=='string')throw Error('Chọn kịch bản và caption.');
 return {count,parallel,page:input.page,kb:input.kb,cap:input.cap};
}
