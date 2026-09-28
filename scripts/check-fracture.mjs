import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {createFracturedGlass} from '../three/fracturedGlass.ts';

// Run with Node >=22.18 (native TypeScript stripping).
for (const mobile of [false,true]) {
 const width=mobile?6.16:12.16,height=(width-.16)*9/16+.16;
 const fracture=createFracturedGlass(width,height,mobile);
 const initial=fracture.group.children.map(mesh=>mesh.position.clone());
 let volume=0;
 for(const mesh of fracture.group.children){
  const positions=mesh.geometry.getAttribute('position');
  assert([...positions.array].every(Number.isFinite));
  const a=new Vector3(),b=new Vector3(),c=new Vector3();
  let signed=0;
  for(let i=0;i<positions.count;i+=3){a.fromBufferAttribute(positions,i);b.fromBufferAttribute(positions,i+1);c.fromBufferAttribute(positions,i+2);signed+=a.dot(b.cross(c))/6;}
  assert(Math.abs(signed)>0,'Every shard must have volume');volume+=Math.abs(signed);
 }
 // Phone geometry has no bevel: the shards must partition the entire plate.
 if(mobile)assert(Math.abs(volume-width*height*.16)<.0001,'Plate has missing or overlapping cells');
 fracture.update(.5,1);
 assert(fracture.group.visible&&!fracture.cracks.visible);
 assert(fracture.group.children.some(mesh=>mesh.position.z>4),'Some shards approach the camera');
 fracture.update(0,1);
 assert(!fracture.group.visible&&fracture.cracks.visible);
 fracture.group.children.forEach((mesh,i)=>{assert(mesh.position.distanceTo(initial[i])<1e-9);assert(Math.abs(mesh.rotation.x)<1e-9)});
 fracture.update(0,0);assert(!fracture.cracks.visible);
 console.log(`${mobile?'Mobile':'Desktop'}: ${initial.length} volumetric shards; finite geometry, approach and reverse-scroll reset passed.`);
}

