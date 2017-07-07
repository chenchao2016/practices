function generateRandomAlphaNum(len,radix) {
    var rdmString = "";
	//��� toString() �� radix �������� 2 �� 36 ֮�䣬�����׳�һ�� RangeError��
	if(radix<2 || radix>36 || !radix) radix = 10;
    for (; rdmString.length < len; rdmString += Math.random().toString(radix).substr(2));
    return rdmString.substr(0, len);
}