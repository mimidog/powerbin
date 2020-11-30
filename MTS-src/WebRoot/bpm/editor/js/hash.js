//Hash.js  
//定义Hash的javascript类  
var Hash = function () {  
    this._data = new Object();  
}  
function Hash$clear() {  
    delete this._data;  
    this._data = new Object();  
}  
function Hash$add(key, value) {  
    if (!key || typeof (value) === 'undefined') return false;  
    return this._data[key] = value;
    
}  
function Hash$addRange(h) {  
    for (var key in h._data) {  
        var item = h._data[key];  
        if (typeof (item) !== 'undefined') {  
            this.add(item.key, item.value);  
        }  
    }  
}  
function Hash$remove(key) {  
    if (!key) return undefined;  
    var item = this._data[key];  
    delete this._data[key];  
    return item;  
}  
function Hash$removeAt(index) {  
    if (isNaN(index)) return undefined;  
    var i = 0;  
    for (var key in this._data) {  
        if (i == index) {  
            return this.remove(key);  
        }  
        i++;  
    }  
    return undefined;  
}  
function Hash$removeRange(startIndex, endIndex) {  
    if (isNaN(startIndex) || isNaN(endIndex)) return undefined;  
    var i = 0;  
    var h = new Hash();  
    for (var key in this._data) {  
        if (i >= startIndex && i <= endIndex) {  
            h.add(key, this.remove(key).value);  
        }  
        i++;  
    }  
    return h;  
}  
function Hash$getCount() {  
    var i = 0;  
    for (var key in this._data) i++;  
    return i;  
}  
function Hash$forEach(method, instance) {  
    var i = 0;  
    for (var key in this._data) {  
        var item = this._data[key];  
        if (typeof (item) !== 'undefined') {  
            method.call(instance, item, i, this);  
            i++;  
        } else {  
            delete this._data[key];  
        }  
    }  
}  
function Hash$getKeys() {  
    var arr = new Array();  
    for (var key in this._data) {  
        //var item = this._data[key];  
        arr.push(key);  
    }  
    return arr;  
}  

function Hash$getItem(key) {  
    if (!key) return undefined;  
    var item = this._data[key];  
    if (typeof (item) !== 'undefined') {  
        return item;  
    } else {  
        delete this._data[key];  
        return undefined;  
    }  
}  
function Hash$containsKey(key) {  
    if (typeof (this.getItem(key)) !== 'undefined') {  
        return true;  
    }  
    return false;  
}  
function Hash$containsValue(value) {  
    for (var key in this._data) {  
        if (value === this._data[key].value) {  
            return true;  
        }  
    }  
    return false;  
}  
//新增加的加入一个数组自动计算key的个数函数  
function Hash$addArray(s) {  
    //统计个数  
    var vc = 0;  
    var item = null;  
    for (var i = 0; i < s.length; i++) {  
        if (this.containsKey(s[i]) == false) {  
            this.add(s[i], 1);  
        }  
        else {  
            item = this.getItem(s[i]);  
            vc = item.value;  
            vc += 1;  
            this.remove(s[i]);  
            this.add(s[i], vc);  
        }  
    }  
}  
//获取key=(value)对的显示测试信息  
function Hash$getHashKeyValueInfo() {  
    //显示  
    var inf = '';  
    var keyArray = this.getKeys();  
    var valArray = this.getValues();  
    for (var i = 0; i < keyArray.length; i++) {  
        inf += keyArray[i] + '=(' + valArray[i] + "),";  
    }  
    return inf;  
}  
//获取key对应的值  
function Hash$getValue(key) {  
    var item = this.getItem(key);  
    var vc = item;  
    return vc;  
}  

function Hash$getValues() {  
    var arr = new Array(); 
    for (var key in this._data) {  
        var item = this._data[key];  
        arr.push(item);  
    }  
    return arr;  
} 


//获取所有的值
function Hash$Values(){
	var tmp=[];
	for(var o in this){
		if(this.hasOwnProperty(o)){
			if(o!='_data'){
				tmp[tmp.length] = this[o];
			}
		}
	}
	return tmp;
} 
//获取所有的键
function Hash$Keys(){
	var tmp=[];
	for(var o in this){
		if(this.hasOwnProperty(o)){
			if(o!='_data'){
				tmp[tmp.length] = o;
			}
		}
	}
	return tmp;
}

//原型定义  
Hash.prototype = {  
    //_data: null,  
    //_keys: null,  
    clear: Hash$clear,  
    add: Hash$add,  
    addRange: Hash$addRange,  
    remove: Hash$remove,  
    removeAt: Hash$removeAt,  
    removeRange: Hash$removeRange,  
    getCount: Hash$getCount,  
    forEach: Hash$forEach,  
    getKeys: Hash$getKeys,  
    getValues: Hash$getValues,  
    getItem: Hash$getItem,  
    containsKey: Hash$containsKey,  
    containsValue: Hash$containsValue,  
    addArray: Hash$addArray,  
    getHashKeyValueInfo: Hash$getHashKeyValueInfo,  
    getValue: Hash$getValue 
	,values:Hash$Values
	,keys:Hash$Keys
}  
Hash.__typeName = 'Hash';  
Hash.__class = true; 


