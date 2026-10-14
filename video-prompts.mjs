// Each 15s renderer call is self-contained; never rely on a previous call's memory.
export function videoClips(story){
 const drive=story.page==='Drive';
 const actor=drive?'Mike, tan cap, navy shirt, salt-and-pepper beard':'Alex, wavy dark hair, grey T-shirt, neat stubble';
 const setting=drive?'Same parked red left-hand-drive truck, navy driver seat, open left door; view from outside that door. Seat faces dashboard; wheel ahead, feet in footwell.':'Same bright office, pale oak desk and black mesh chair; same viewpoint and lighting.';
 const action=f=>drive?(f.number===2?'Outside on ground, holding shoulder-width cushion at waist.':'Upright in the same driver seat; cushion under hips/behind lumbar, face visible.'):f.action;
 return [0,1].map(part=>{
  const offset=part*15,frames=story.frames.slice(part*2,part*2+2);
  const prompt=`Render ONE 15-second vertical 9:16 video, part ${part+1}/2. Attach the SAME four-panel storyboard for this run; use ONLY panels ${frames.map(f=>f.number).join(' and ')} as full-screen sequential shots, never the grid.\nREFERENCE LOCK: Same ${actor}; match exact face/outfit, product and setting from the images. ${setting} ${story.framing||''}\nPRODUCT LOCK: Same Sevolra one-piece black/grey cushion, ribs and tailbone cutout;44×40×37cm. Fixed size/shape; seat and cushion face forward. No extra people/details.\n${part?'CONTINUITY RESET: New call, same references. From frame one, preserve face/product/setting/seat/lighting. Optional clip1 last-frame reference locks identity/lighting; panel3 defines pose.\n':''}${frames.map(f=>`${f.start-offset}–${f.end-offset}s · panel${f.number}: ${action(f)} Text EXACT: "${f.text}".`).join('\n')}\nClean cuts, subtle movement; copy lowered readable text placement, clear of face/product. ${part?'Hold the final CTA through15s.':'No added CTA.'} No grid/numbers/times, title cards, dialogue, medical claims or morphing. Exactly15.0s.`;
  return {part:part+1,duration:15,global_start:offset,global_end:offset+15,panels:frames.map(f=>f.number),prompt};
 });
}
export function combinedVideoPrompt(clips){return clips.map(c=>`PART ${c.part} · 15s · storyboard ${c.global_start}–${c.global_end}s\n${c.prompt}`).join('\n\n');}
