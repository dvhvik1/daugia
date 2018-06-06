if(req.act=="getlist")
{
DB_user.find({ name: { $ne: "admin" }},{ pass: 0 },function(err,data){
	if(data.length>0){
	res.send(JSON.stringify(data));
	}
	else
	{
		res.send("[]");
	}
});
}
if(req.act=="remove" && req.session.isAdmin==1)
{
var id_remove=func.intval(req.body.id);
if(id_remove>0){
DB_user.find({ id: id_remove }, function(err,books) {
    if (!err) {
        books.forEach(function(book){
           book.remove(function(err){
              
           });
       });
       res.send('{"sys":"true"}');
    }
    else {
       res.send('{"sys":"false"}');
    }
});
}
else
{
    res.send('{"sys":"false"}');
}
}

if(req.act=="login")
{
if(func.stringval(req.body.name)!=""){
var name=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.name)));
var pass=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.pass)));
DB_user.find({name:name,pass:pass},function(err,data){
	if(data.length>0){
		if(func.intval(data[0].report)<5){
	req.session.u_id=data[0].id;
	req.session.u_name=data[0].name;
	req.session.isAdmin=1;
	req.session.save();
	res.send('{"sys":"true","u_id":'+data[0].id+'}');
}
else
{
	res.send('{"sys":"false","err":"Khóa tài khoản vì đã hủy hơn 5 đơn hàng"}');
}
	}
	else
	{
		res.send('{"sys":"false","err":"pass"}');
	}
});
}
else
{
	res.send('{"sys":"false","err":"null"}');
}
}




if(req.act=="reg")
{
if(func.stringval(req.body.name)!=""){
var name=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.name)));
var pass=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.pass)));
var re_pass=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.re_pass)));
var email=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.email)));
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var check=re.test(String(email).toLowerCase());
var ertxt="";
if(!check)
{
ertxt="Email không hợp lệ";
}
else
if(name!=req.body.name)
{
	ertxt="Tên tài khoản không chấp nhận ký tự đặc biệt";
}
else
if(name.length<6)
{
	ertxt="Tên tài khoản không thấp hơn 6 ký tự";
}
else
if(pass!=req.body.pass)
{
	ertxt="Mật khẩu không chấp nhận ký tự đặc biệt";
}
else
if(pass.length<6)
{
	ertxt="Mật khẩu không thấp hơn 6 ký tự";
}
else
if(pass!=re_pass)
{
	ertxt="Mật khẩu không trùng khớp";
}


if(ertxt==""){
var add_user=DB_user({name:name,pass:pass,email:email});
	add_user.save(function(err,auser){
		if(!err)
			{
		errText="Thêm thành công !";
		res.send('{"sys":"true","err":"'+errText+'"}');
		console.log("=========----",auser);
		req.session.u_id=auser.id;
	req.session.u_name=auser.name;
	if(auser.name=="admin")
	req.session.isAdmin=1;
	req.session.save();
	}
	else
		{
			errText=err.errmsg;
			res.send('{"sys":"false","err":"'+errText+'"}');
		}
		

	});
}
else
{
res.send('{"sys":"false","err":"'+ertxt+'"}');
}

}
else
{
	res.send('{"sys":"false","err":"Chưa nhập dữ liệu"}');
}
}




if(req.act=="logout")
{
if(func.intval(req.session.u_id)>0){
	req.session.u_id=0;
	req.session.u_name="";
	req.session.isAdmin=0;
	req.session.save();
	res.send('{"sys":"true","err":"null"}');
}
else
{
	res.send('{"sys":"false","err":"null"}');
}
}