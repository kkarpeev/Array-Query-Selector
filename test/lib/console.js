//version 1.0
function log(what,pfx,type,type2){
	if (typeof console !== "undefined"){
		if (pfx) log(pfx);
		if (console[type]){
			console[type](what);
		} else if (console[type2]) {
			console[type2](what);
		} else {
			console.log(what);
		}
		return true;
	}
	return false;
}
function logInfo(what,pfx){return log(what,pfx,'info');}
function logWarn(what,pfx){return log(what,pfx,'warn');}
function logError(what,pfx){return log(what,pfx,'error');}
function logException(what,pfx){return log(what,pfx,'exception','error');}
function catchHdl(e,arg,doAlert){
	logException(e,'An exception has been catched...');
	logWarn('The exception data is...');
	logWarn(arg);
	if (doAlert) alert(e);
}