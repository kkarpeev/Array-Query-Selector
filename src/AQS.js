function AQS(arr) {
	var data,lastFindResult,lastResult,lastError,queue,operands,ops,opsUn,opsBin,o,expected;
	(function(){
		data = arr instanceof Array ? arr : [];
		if (arr instanceof Function) {
			var __data = arr();
			if (__data instanceof Array)
				data = __data;
		}
	})();
	function noLastFindResult(){return getLastFindResult()==undefined;} this.noLastFindResult = noLastFindResult;
	function getLastFindResult(){return lastFindResult;} this.getLastFindResult = getLastFindResult;
	function getLastResult(){return lastResult;} this.getLastResult = getLastResult;
	function getLastError(){return lastError;} this.getLastError = getLastError;
	function setLastFindResult(res){return lastFindResult=res;}
	function setLastResult(res){return lastResult=res;}
	function setLastError(res){return lastError=res?new Error(res):undefined;}
	function resetLastFindResult(){return setLastFindResult();} this.resetLastFindResult = resetLastFindResult;
	function resetLastResult(){return setLastResult();} this.resetLastResult = resetLastResult;
	function resetLastError(){return setLastError();} this.resetLastError = resetLastError;
	function resetStates(){
		resetLastFindResult();
		resetLastResult();
		resetLastError();
	} this.resetStates = resetStates;
	function trim(str){return String.trim(str);}
	function wrapRX(lefty,rx,righty,flags){
		if (!rx) return rx;
		var source = rx.source;
		var flags = flags || rx.flags;
		if (!!lefty) source=""+lefty+source;
		if (!!righty) source+=""+righty;
		return new RegExp(source,flags);
	}
	function expect(what,where,remove){
		if (!where) return false;
		var t = [RegExp,String,Array,Number,Boolean,Function,Object];
		var i = t.indexOf(what.constructor)+"";
		var res = false;
		where = trim(where);
		switch (i){
			case "RegExp":
			case "0":
				if (!~what.source.indexOf("^")) what = wrapRX("^",what);
				res = where.match(what);
				if (!!remove){}
				break;
			case "String":
			case "1":
				res = where.search(what+"\\b") === 0;
				if (!!remove){}
				break;
			case "Array":
			case "2":
				//TODO
				break;
			case "Number":
			case "3":
				res = where.search(what+"\\b") === 0;
				if (!!remove){}
				break;
			case "Boolean":
			case "4":
				res = where.search(what+"\\b") === 0;
				if (!!remove){}
				break;
			case "Function":
			case "5":
				res = what(where);
				break;
			case "Object":
			case "6":
				res = expect(what.rx,where,remove);
				break;
			default:
				res = false;
				break;
		}
		return res;
	}
	function AQSInstance(){}
    AQSInstance.prototype = Object.create(AQS.prototype);
	AQSInstance.prototype.getData = function(){return data.slice(0);};
	AQSInstance.prototype.get = function (queryFind,queryTransform,_data,_stock){
		resetStates();
		this.find(queryFind,_data,_stock);
		this.transform(queryTransform,_data,_stock);
		return getLastResult();
	};
	AQSInstance.prototype.setData = function (newArr) {
		resetStates();
		if (newArr instanceof Array) {
			data = newArr;
			return true;
		} else {
			if (newArr instanceof Function) {
				var __data = newArr();
				if (__data instanceof Array)
					data = __data;
			}
			return false;
		}
	};
	(function(){
		operands = [
			opd({
				name: "all",
				rx: /all/i,
				type: "element"
			}),
			opd({
				name: "first",
				rx: /first/i,
				type: "element"
			}),
			opd({
				name: "last",
				rx: /last/i,
				type: "element"
			}),
			opd({
				name: "nth",
				rx: /№(\d+)/i,
				type: "element"
			}),
			opd({
				name: "item",
				rx: /item/i,
				type: "element"
			}),
			opd({
				name: "key",
				rx: /:[^\s\r\t\n\b]*/i,
				type: "value"
			}),
			opd({
				name: "string",
				rx: /\$\{((?:(?:\\})|[^}])*)(?:[^\\])?\}/i,
				type: "value"
			}),
			opd({
				name: "number",
				rx: /\d+(I|F|L)?/,
				type: "value"
			}),
			opd({
				name: "boolean",
				rx: /\b(?:true)|(?:false)\b/,
				type: "value"
			}),
			opd({
				name: "array",
				rx: /\[([^\[\]]+)\]/,
				type: "element"
			})
		];
		opsBin = [
			op({
				name: "like",
				rx: /==/,
				type: "op",
				opds: 2,
				opd1: [String,Number,Boolean,null],
				opd2: [String,Number,Boolean,null]
			}),
			op({
				name: "is",
				rx: /===/,
				type: "op",
				opds: 2,
				opd1: [String,Number,Boolean,null],
				opd2: [String,Number,Boolean,null]
			}),
			op({
				name: "in",
				rx: /@/,
				type: "op",
				opds: 2,
				opd1: [String,Number,Boolean],
				opd2: [Object,Array]
			}),
			op({
				name: "allIn",
				rx: /@\&/,
				type: "op",
				opds: 2,
				opd1: Array,
				opd2: [Object,Array]
			}),
			op({
				name: "someIn",
				rx: /@\|/,
				type: "op",
				opds: 2,
				opd1: Array,
				opd2: [Object,Array]
			}),
			op({
				name: "and",
				rx: /\&\&?/,
				type: "op",
				opds: 2,
				opd1: Boolean,
				opd2: Boolean
			}),
			op({
				name: "or",
				rx: /\|\|?/,
				type: "op",
				opds: 2,
				opd1: Boolean,
				opd2: Boolean
			}),
			op({
				name: "xand",
				rx: /!\&/,
				type: "op",
				opds: 2,
				opd1: Boolean,
				opd2: Boolean
			}),
			op({
				name: "xor",
				rx: /!\|/,
				type: "op",
				opds: 2,
				opd1: Boolean,
				opd2: Boolean
			})
		];
		opsUn = [
			op({
				name: "not",
				rx: /not/,
				type: "op",
				opds: 1,
				opd2: Boolean
			})
		];
		ops = [].concat(opsBin).concat(opsUn);
		o = {
			operands: operands,
			ops: ops,
			opsUn: opsUn,
			opsBin: opsBin
		};
		expected = {
			
		};
		function op(_op){
			typeDecor(_op);
			return _op;
		}
		function opd(_opd){
			typeDecor(_opd);
			return _opd;
		}
		function typeDecor(_opd){
			var _type = {
				element: function(rx){
					_opd.rx = _opd.rx && _opd.rx.source && _opd.rx.source.indexOf("^")!==0 && _opd.rx.source.indexOf("\\b")!==0 ? wrapRX("[\\b\\s]*(",rx,")[\\b\\s]*"):rx;
					return _opd;
				},
				value: function(rx){
					_opd.rx = _opd.rx && _opd.rx.source && _opd.rx.source.indexOf("^")!==0 && _opd.rx.source.indexOf("\\b")!==0 ? wrapRX("^",rx) : rx;
					return _opd;
				},
				op: function(rx){
					_opd.rx = _opd.rx && _opd.rx.source && _opd.rx.source.indexOf("^")!==0 && _opd.rx.source.indexOf("\\b")!==0 ? wrapRX("[\\b\\s]*(",rx,")[\\b\\s]*") : rx;
				}
			};
			if (_opd["type"]) _type[ _opd["type"] ](_opd.rx);
			return _opd;
		}
	})();
	AQSInstance.prototype.find = function(query,_data,_stock){
		resetLastError();
		resetLastFindResult();
		var list = (_data || this.getData()).slice(0);
		query = String(query).trim();
		if (!query) return setLastFindResult(list);
		var error = false;
		var eol = false;
		while(!eol && !error){
			var e = expect();
			
			eol = true;
		}
		if (error){
			return setLastError(error);
		}
		if (eol){
			
		}


		return setLastFindResult(list);
	};
	AQSInstance.prototype.transform = function(query,_data,_stock){
		if (noLastFindResult() && !_data){
			return setLastError("There is no given data to transform. Sorry.");
		}
		resetLastError();
		resetLastResult();
		var list = (_data || this.getData()).slice(0);
		query = String(query).trim();


		return setLastResult(list);
	};
	return new AQSInstance();
}
