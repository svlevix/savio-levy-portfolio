type DisplayPosition={x:number;z:number;innerEdgeX:number};

/** Ease into a clear lane before reaching a display's frame. */
export function floatingYPosition(travel:number,cameraZ:number,mobile:boolean,displays:DisplayPosition[]){
 const z=cameraZ-(mobile?8:7);
 let nearest:DisplayPosition|undefined,distance=Infinity;
 for(const display of displays){const gap=Math.abs(z-display.z);if(gap<distance){nearest=display;distance=gap;}}
 const t=Math.min(1,Math.max(0,(5.5-distance)/3));
 const avoidance=t*t*(3-2*t);
 // Follow the camera's sightline instead of drifting toward either wall.
 const cameraX=Math.sin(travel*Math.PI*3)*(mobile?.25:1.05);
 const centreX=cameraX+(Math.sin(travel*7)*.4-cameraX)*(mobile?8:7)/16;
 const drift=centreX+Math.sin(travel*(mobile?8:9))*(mobile?.12:.18);
 const safeX=!nearest?drift:nearest.x>0?Math.min(drift,nearest.innerEdgeX-.8):Math.max(drift,nearest.innerEdgeX+.8);
 const x=mobile?centreX:drift+(safeX-drift)*avoidance;
 const floatY=mobile?-.65:-.55+Math.sin(travel*6)*.18;
 const y=mobile?floatY+(-2.35-floatY)*avoidance:floatY;
 return {x,y,z};
}
