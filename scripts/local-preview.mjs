// Local files only: avoid Vite's optional Windows network-drive discovery.
// The sandbox blocks cmd.exe; no mapped drives are used by this project.
import childProcess from 'node:child_process';
import {syncBuiltinESMExports} from 'node:module';
const originalExec=childProcess.exec;
childProcess.exec=function(command,...args){
 if(command==='net use'){const callback=args.findLast(v=>typeof v==='function');queueMicrotask(()=>callback?.(null,'',''));return {on(){return this}};}
 return originalExec.call(this,command,...args);
};
syncBuiltinESMExports();
await import('./run-framework.mjs');
