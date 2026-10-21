type DisplayPosition={x:number;z:number};

/** Ease into a clear lane before reaching a display's frame. */
export function floatingYPosition(travel:number,cameraZ:number,mobile:boolean,displays:DisplayPosition[]){
 const z=cameraZ-(mobile?8:7);
 let nearest:DisplayPosition|undefined,distance=Infinity;
 for(const display of displays){const gap=Math.abs(z-display.z);if(gap<distance){nearest=display;distance=gap;}}
 const t=Math.min(1,Math.max(0,(5.5-distance)/3));
 const avoidance=t*t*(3-2*t);
 const drift=Math.sin(travel*(mobile?8:9))*(mobile?.35:.6);
 const x=mobile?drift*(1-avoidance):drift*(1-avoidance)-(nearest?Math.sign(nearest.x):0)*1.25*avoidance;
 const floatY=mobile?-.65:.2+Math.sin(travel*6)*.35;
 const y=mobile?floatY+(-2.35-floatY)*avoidance:floatY;
 return {x,y,z};
}
