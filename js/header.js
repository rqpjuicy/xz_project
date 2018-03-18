$(()=>{
  // ajax({type:"get",url:"header.html"})
  $("#header").load(
	     "header.html",
	   //.then(html=>{
	     ()=>{
	      //console.log(html);
//			  document.getElementById("header").innerHTML=html;
//			  var txtSearch=document.getElementById("txtSearch");
//			  var aSearch= document.querySelector("[data-trigger=search]");
//			  aSearch.onclick=function(){
//				if (txtSearch.value.trim()!=="")
//				  location="products.html?kw="+txtSearch.value.trim();
//				else location="products.html";
//			  }
//			  txtSearch.onkeyup=e=>{
//				if (e.keyCode==13)
//				aSearch.onclick();
//			  }  
//			  var search=location.search;
//			  if (search.indexOf("kw")!=-1)
//			  {
//				  txtSearch.value=decodeURI(search.split("=")[1]);
//			  }
          $(document.body).on("click","[data-trigger=search]",function(){
		     var $a=$(this);
			 var $txtSearch=$a.prev().children(".txtSearch");
			 if ($txtSearch.val().trim()!=="")
			 {
				location="products.html?kw="+$txtSearch.val().trim();
			 }else location="products.html";
		  });
		  $(document).on("keyup",".txtSearch",e=>{
		     var $tar=$(e.target);
			 var $shelper=$tar.prev();
			 switch (e.keyCode)
			 {
				 case 13:
					  $tar.parent().next().click();
					  break;
				 case 38:
					 if (!$shelper.is(":has(.focus)"))
					  {
					    $shelper.children().last().addClass("focus");
					  }else if($shelper.children().first().is(".focus"))
							$shelper.children().removeClass("focus").last().addClass("focus");
					   else $shelper.children(".focus").removeClass("focus").prev().addClass("focus");
					   $(".txtSearch").val($shelper.children(".focus").children().first().html());
					  break;
				 case 40:
					  if (!$shelper.is(":has(.focus)"))
					  {
					    $shelper.children().first().addClass("focus");
					  }else if($shelper.children().last().is(".focus"))
							$shelper.children().removeClass("focus").first().addClass("focus");
					   else $shelper.children(".focus").removeClass("focus").next().addClass("focus");
					   $(".txtSearch").val($shelper.children(".focus").children().first().html());
					  break;
				 default:
					 if ($tar.val().trim()!=="")
					 {
						 $(".txtSearch").val($tar.val());
						 $.get("data/products/autocomplete.php",{term:$tar.val().trim()})
							 .then(data=>{
							 //console.log(data);
							 var html="";
							 for (var p of data)
							 {
								 html+=`<li>
										<div class="search-item" title="${p.title}">${p.title}</div>
										</li>`;
							 }
							 $tar.prev().html(html).show();
						 })
					 }	 
			 }
			
		  });
			  var search=location.search;
			  if (search.indexOf("kw")!=-1)
			  {
				  $(".txtSearch").val(decodeURI(search.split("=")[1]));
			  }
		//登录状态
		function isLogin(){
			   $.get("data/users/islogin.php").then(data=>{
				//data={ok:1,uname:"dingding"};
			   if (data.ok==0)
			   {
				   $("[data-toggle=loginList]").show().next().hide();
			   }else $("[data-toggle=loginList]").hide().next().show().find("[data-name=uname]").html(data.uname);
			})
		}
		isLogin();
		//
		$(document.body).on("click","[data-toggle=loginList]>li:last-child>a",e=>{
		    var $tar=$(e.target);
			location="login.html?back="+location.href;
		});
		$(document.body).on("click","[data-toggle=welcomeList]>li:last-child>a",e=>{
		  $.get("data/users/logout.php").then(()=>{
		    location.reload(true);
		  });
		})
      })
   //})
});	
//为页面添加滚动事件
$(()=>{
 $(window).scroll(()=>{
   var scrollTop=$(window).scrollTop();
   if (scrollTop>=60+385)
   {
	   $("#header-top").clone(true).addClass("fixed_nav").appendTo(document.body);
   }else $(".fixed_nav").remove();
 })
})
