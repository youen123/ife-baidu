// 校验名称
function verifyName(input, tip) {
    var name = input.value.trim();
    var res = true;
    if (!name) {
        res = "名称不能为空！";
    } else if (getStrLen(name) < 4) {
        res = "名称长度过短！";
    } else if (getStrLen(name) > 16) {
        res = "名称长度太长";
    }
    setTip(res, input, tip, "名称可用");
    return res;
}
// 校验密码
function verifyPwd(input, tip) {
    var pwd = input.value, res = true;
    if (!pwd) {
        res = "密码不能为空！";
    } else if (getStrLen(pwd) < 4) {
        res = "密码长度过短！";
    } else if (getStrLen(pwd) > 16) {
        res = "密码长度太长";
    } 
    setTip(res, input, tip, "密码可用");
    return res;
}
// 校验密码
function verifyRepwd(input, pwdinput, tip) {
    var pwd1 = input.value, 
        pwd = pwdinput.value,
        res = true;
    if (!pwd) {
        res = "密码不能为空！";
    } else if (pwd1 !== pwd) {
        res = "两次密码输入不一致！";
    }
    setTip(res, input, tip, "密码输入一致");
    return res;
}
// 校验email
function verifyEmail(input, tip) {
    var email = input.value.trim(), 
        re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        res = true;
    if (!email) {
        res = "邮箱不能为空";
    } else if (!re.test(email)) {
        res = "邮箱不符合格式";
    }
    setTip(res, input, tip, "邮箱输入合法");
    return res;
}
// 校验电话
function verifyTel(input, tip) {
    var tel = input.value.trim(),
        re = /1[0-9]{10}/,
        res = true;
    if (!tel) {
        res = "手机不能为空";
    } else if (!re.test(tel)) {
        res = "手机不符合格式";
    }
    setTip(res, input, tip, "手机输入合法");
    return res;   
}
// 获取字符串长度，中文占2个字节
function getStrLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) <= 0xff) {
            len++;
        } else {
            len += 2;
        }
    };
    return len;
}
// 重置样式
function resetinput(input, tip) {
    input.classList.remove('pass');
    input.classList.remove('error');
    tip.classList.remove('pass');
    tip.classList.remove('error');    
}
// 通过样式设置
function pass(input, tip) {
    input.classList.add('pass');
    tip.classList.add('pass');
}
// 不通过的显示
function refuse(input,tip,res) {
    input.classList.add('error');
    tip.classList.add('error');
    tip.innerHTML = res;    
}
// 根据返回结果设置提示
function setTip(res, input, tip, validStr) {
    if (res === true) {
        pass(input, tip);
        tip.innerHTML = validStr || "";
    } else {
        refuse(input, tip, res);
    }
    return res;    
}

var nameinput = document.getElementById('name'),
    nametip = document.getElementById('nametip'),
    password = document.getElementById('password'),
    passwordtip = document.getElementById('passwordtip'),
    repassword = document.getElementById('repassword'),
    repasswordtip = document.getElementById('repasswordtip'),
    email = document.getElementById('email'),
    emailtip = document.getElementById('emailtip'),
    tel = document.getElementById('tel'),
    teltip = document.getElementById('teltip'),
    cmbtn = document.getElementById('commit');

// 绑定事件
nameinput.onfocus = function() {
    resetinput(nameinput, nametip);
    nametip.innerHTML = "必填，长度为4-16个字符";
}
nameinput.onblur = function() {
    verifyName(nameinput, nametip);
}
password.onfocus = function() {
    resetinput(password, passwordtip);
    passwordtip.innerHTML = "必填，长度为4-16个字符";
}
password.onblur = function() {
    verifyPwd(password, passwordtip);
}
repassword.onfocus = function() {
    resetinput(repassword, repasswordtip);
    repasswordtip.innerHTML = "再次输入相同密码";
}
repassword.onblur = function() {
    verifyRepwd(repassword, password, repasswordtip);
}
email.onfocus = function() {
    resetinput(email, emailtip);
}
email.onblur = function() {
    verifyEmail(email, emailtip);
}
tel.onfocus = function() {
    resetinput(tel, teltip);
    teltip.innerHTML = "仅支持11位手机号";
}
tel.onblur = function() {
    verifyTel(tel, teltip);
}
cmbtn.onclick = function(e) {
    e.preventDefault();
    var res = true;
    if (verifyName(nameinput, nametip) !== true) {
        res = false;
    }
    if (verifyPwd(password, passwordtip) !== true) {
        res = false;
    }
    if (verifyRepwd(repassword, password, repasswordtip) !== true) {
        res = false;
    };
    if (verifyEmail(email, emailtip) !== true) {
        res = false;
    }
    if (verifyTel(tel, teltip) !== true) {
        res = false;
    }   
    if (!res) {
        alert('提交失败');
    } else {
        alert('提交成功');
    }
}


