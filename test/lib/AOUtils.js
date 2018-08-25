//version 0.1
//this requires console.js with log, logError, logWarn, logInfo, logException, catchHdl
//
//Classes
//
function Empty(totallyEmpty){//v1.1
	var empties = [undefined,null,''];
	empties.constructor.prototype = Object.create(Array.prototype);
	empties.constructor.prototype.equals = function(some){
		var a = [].slice.call(arguments);
		if (1 in a && a[1] instanceof Array) [].splice.apply(a,[1,1].concat(a[1]));
		return !!~empties.concat(a.slice(1)).indexOf(some);
	};
	empties.constructor.prototype.remove = function(some){
		if (!!~empties.indexOf(some)) empties.splice(empties.indexOf(some),1);
	};
	empties.constructor.prototype.noEmptyString = function(){
		this.remove('');
	};
	if (!!totallyEmpty) empties.noEmptyString();
	return empties;
}
//
//Some useful minis
//
function toArray(a){
	var res = [];
	try {
		res = [].slice.call(a);
	} catch (e){
		catchHdl(e,arguments);
	}
	return res;
}
//
//Object Utils
//
function ObjectUtils(){
	/**
	 * requires:
	 * Empty class
	 */
	var self = this;
	self.Empty = Empty;
////////////////////	
	var main = {};
	function instanceOf(obj){
		return ({}).toString.call(obj).slice(8, -1);
	} main.instanceOf = instanceOf;
	function instanceIs(obj,str){
		var res = ({}).toString.call(obj).slice(8, -1);
		if (str === 'Empty') return !!~['Null','Undefined'].indexOf(res);
		return res === str;
	} main.instanceIs = instanceIs;

	function forEachOwn(obj,f){
		if (!(obj instanceof Object) || typeof f !== 'function') return false;
		for (var k in obj){
			if (!obj.hasOwnProperty(k)) continue;
			f(obj[k],k,obj);
		}
		return true;
	} main.forEachOwn = forEachOwn;
	function someOwn(obj,f){
		if (!(obj instanceof Object) || typeof f !== 'function') return false;
		var res = false;
		for (var k in obj){
			if (!obj.hasOwnProperty(k)) continue;
			if (!f(obj[k],k,obj)) continue;
			res = true;
			break;
		}
		return res;
	} main.someOwn = someOwn;
	function everyOwn(obj,f){
		if (!(obj instanceof Object) || typeof f !== 'function') return false;
		var res = true;
		for (var k in obj){
			if (!obj.hasOwnProperty(k)) continue;
			if (f(obj[k],k,obj)) continue;
			res = false;
			break;
		}
		return res;
	} main.everyOwn = everyOwn;
	function reduceOwn(obj,f,ac){
		//если начальное значение не указано, то первое будет ключом из объекта, а не значением!!
		if (!(obj instanceof Object) || typeof f !== 'function') return ac;
		var init = arguments.length>2;
		var keys = Object.keys(obj);
			keys = toArray(keys);
		var args = [function(acc,k){//обёртка 1 аргумента reduce
			return f(acc,obj[k],k,obj);
		}];
		if (!!init) args.push(ac);
		return [].reduce.apply(keys,args);
	} main.reduceOwn = reduceOwn;
	
	var curObj = {};
	function ObjectUtilsInstance(){}
	ObjectUtilsInstance.prototype = Object.create(main);
	forEachOwn(main,function(v,k,o){
		self[k] = v;
		ObjectUtilsInstance.prototype[k] = function(){
			return v.apply(curObj,[curObj].concat(toArray(arguments)));
		};
	});
	var instance = new ObjectUtilsInstance();
	self.for = function(obj){
		curObj = obj || {};
		return instance;
	};
	
	return self;
}