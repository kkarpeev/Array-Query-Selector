function testData() {
	var list = [
		{
			name: "One",
			sysname: "one",
			"int": 1,
			"float": (1).toFixed(2),
			"Number": new Number(1),
			"string": "1",
			"any": 1
		},
		{
			name: "Two",
			sysname: "two",
			"int": 2,
			"float": (2).toFixed(2),
			"Number": new Number(2),
			"string": "2",
			"any": 2
		},
		{
			name: "Three",
			sysname: "three",
			"int": 3,
			"float": (3).toFixed(2),
			"Number": new Number(3),
			"string": "3",
			"any": 3
		},
		{
			name: "Thirteen",
			sysname: "thirteen",
			"int": 13,
			"float": (13).toFixed(2),
			"Number": new Number(13),
			"string": "13",
			"any": 13
		},
		{
			name: "One",
			sysname: "one",
			"int": 1,
			"float": (1).toFixed(2),
			"Number": new Number(1),
			"string": "1",
			"any": (1).toFixed(2)
		},
		{
			name: "Two",
			sysname: "two",
			"int": 2,
			"float": (2).toFixed(2),
			"Number": new Number(2),
			"string": "2",
			"any": (2).toFixed(2)
		},
		{
			name: "Three",
			sysname: "three",
			"int": 3,
			"float": (3).toFixed(2),
			"Number": new Number(3),
			"string": "3",
			"any": (3).toFixed(2)
		},
		{
			name: "Thirteen",
			sysname: "thirteen",
			"int": 13,
			"float": (13).toFixed(2),
			"Number": new Number(13),
			"string": "13",
			"any": (13).toFixed(2)
		},
		{
			name: "One",
			sysname: "one",
			"int": 1,
			"float": (1).toFixed(2),
			"Number": new Number(1),
			"string": "1",
			"any": new Number(1)
		},
		{
			name: "Two",
			sysname: "two",
			"int": 2,
			"float": (2).toFixed(2),
			"Number": new Number(2),
			"string": "2",
			"any": new Number(2)
		},
		{
			name: "Three",
			sysname: "three",
			"int": 3,
			"float": (3).toFixed(2),
			"Number": new Number(3),
			"string": "3",
			"any": new Number(3)
		},
		{
			name: "Thirteen",
			sysname: "thirteen",
			"int": 13,
			"float": (13).toFixed(2),
			"Number": new Number(13),
			"string": "13",
			"any": new Number(13)
		},
		{
			name: "One",
			sysname: "one",
			"int": 1,
			"float": (1).toFixed(2),
			"Number": new Number(1),
			"string": "1",
			"any": "1"
		},
		{
			name: "Two",
			sysname: "two",
			"int": 2,
			"float": (2).toFixed(2),
			"Number": new Number(2),
			"string": "2",
			"any": "2"
		},
		{
			name: "Three",
			sysname: "three",
			"int": 3,
			"float": (3).toFixed(2),
			"Number": new Number(3),
			"string": "3",
			"any": "3"
		},
		{
			name: "Thirteen",
			sysname: "thirteen",
			"int": 13,
			"float": (13).toFixed(2),
			"Number": new Number(13),
			"string": "13",
			"any": "13"
		}
	];
	return list;
}

var a = new AQS(testData);
var b = new AQS([]);

log(a.find());
log(b.find());


