function generateRandomAlphaNum(len,radix) {
    var rdmString = "";
	//如果 toString() 的 radix 参数不在 2 到 36 之间，将会抛出一个 RangeError。
	if(radix<2 || radix>36 || !radix) radix = 10;
    for (; rdmString.length < len; rdmString += Math.random().toString(radix).substr(2));
    return rdmString.substr(0, len);
}