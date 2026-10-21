import * as THREE from 'three';

// Outline of the Y in the supplied LEVY ART wordmark: flat arms,
// angular shoulders and a straight central stem. Extrusion preserves its depth.
export function createBrandY(){
 const shape=new THREE.Shape();
 const outline=[[-.94,1.18],[-.55,1.18],[-.55,.12],[-.40,-.02],[.40,-.02],[.55,.12],[.55,1.18],[.94,1.18],[.94,-.03],[.52,-.43],[.47,-.43],[.47,-1.18],[-.47,-1.18],[-.47,-.43],[-.52,-.43],[-.94,-.03]];
 outline.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();
 const geometry=new THREE.ExtrudeGeometry(shape,{depth:.42,bevelEnabled:true,bevelThickness:.065,bevelSize:.045,bevelSegments:3,curveSegments:1,steps:1});
 geometry.translate(0,0,-.21);
 const face=new THREE.MeshPhysicalMaterial({color:'#cad4e5',metalness:1,roughness:.2,clearcoat:1,clearcoatRoughness:.13,envMapIntensity:1.7});
 const edge=new THREE.MeshPhysicalMaterial({color:'#5488d9',metalness:1,roughness:.25,clearcoat:.8,envMapIntensity:2});
 const group=new THREE.Group();group.name='LEVY ART — Y metálico';group.add(new THREE.Mesh(geometry,[face,edge]));
 // Narrow blue seams on the inner shoulders catch the corridor lighting.
 const seamMaterial=new THREE.MeshStandardMaterial({color:'#1555f4',emissive:'#0145f2',emissiveIntensity:1.1,metalness:.8,roughness:.2});
 for(const side of [-1,1]){const seam=new THREE.Mesh(new THREE.BoxGeometry(.025,.85,.015),seamMaterial);seam.position.set(side*.551,.64,.262);group.add(seam);}
 return group;
}
