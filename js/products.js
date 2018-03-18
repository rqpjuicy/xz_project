function loadPage(pageNo=1){
  var pageSize=9;
  //var query=`pageNo=${pageNo}&pageSize=${pageSize}`;
  var query={pageNo,pageSize};
  var search=location.search;
  if (search.indexOf("kw")!=-1)
  {
	  query.kw=decodeURI(search.split("=")[1]);;
  }
  
  $.get("data/products/getProductsByKw.php",query)
	  .then(result=>{
     console.log(result);
	 var {pageNo,pageCount,data}=result;
	 var html="";
     for (var p of data )
     {
		 html+=`<li>
            <a href="product-details.html?lid=${p.lid}">
              <img src="${p.md}" alt="">
            </a>
            <p>
              ¥<span class="price">${p.price}</span>
              <a href="product-details.html?lid=${p.lid}">${p.title}</a>
            </p>
            <div>
              <span class="reduce">-</span>
              <input type="text" value="1">
              <span class="add">+</span>
              <a href="javascript:;" data-id="${p.lid}" class="addCart">加入购物车</a>
            </div>
          </li>
			 `;
     }
	 document.getElementById("show-list").innerHTML=html;
     html=`<a href="javascript:;" class='${pageNo==1?"previous disabled":"previous"}'>上一页</a>`;
	 for (var i=1;i<=pageCount ;i++ )
	 {
		 html+=`<a href="javascript:;" class='${pageNo==i?"current":""}'>${i}</a>`;
	 }     
     html+=`<a href="javascript:;" class='${pageNo==pageCount?"next disabled":"next"}'>下一页</a>`;
	 document.getElementById("pages").innerHTML=html;
  })

}
function loadCart(){
   $.get("data/cart/getCart.php")
	   .then(item=>{
      var html="",total=0;
	  //console.log(item);
	  for (var p of item )
	  {
		html+=`<div class="item">
              <span title="${p.title}">${p.title}</span>
              <div data-iid="${p.iid}">
                <span class="reduce">-</span>
                <input type="text" value="${p.count}">
                <span class="add">+</span>
              </div>
              <p>
                <span>￥${(p.price*p.count).toFixed(2)}</span>	
              </p>
            </div>`;
		total+=p.price*p.count;
	  }
	  $(".cart_content").html(html);
	  $("#total").html(total.toFixed(2));
   })
}
$(()=>{
	loadPage();
	loadCart();
});
//加入购物车的数量+1/-1
$(()=>{
	//document.getElementById("show-list").onclick=e=>{
	$("#show-list").on("click",".reduce,.add",e=>{
	  var $tar=$(e.target);
//	  if (tar.className=="reduce" || tar.className=="add")
//	  {
		  //var input=tar.parentNode.children[1];
		  //var ipt=tar.parentNode.querySelector("input:nth-child(2)");
		  var $ipt=$tar.parent().children("input:nth-child(2)");
		  var n=parseInt($ipt.val());
		  if ($tar.is(".add"))
		  {
			  n++;
		  }else if(n>1)
			  n--;
		  $ipt.val(n);
//	  }
	})
	.on("click",".addCart",e=>{
		var $tar=$(e.target);
	   $.get("data/users/islogin.php")
		   .then(data=>{
	     if (data.ok==0)
	     {
			 location="login.html?back="+location.href;
	     }else{
		     var lid= $tar.data("id"),count=$tar.prev().prev().val();
			 console.log(lid,count);
			 $.post("data/cart/addCart.php",{lid,count})
				 .then(loadCart);
			 $tar.prev().prev().val(1);
		 }
	   })
	})
});
//购物车操作
$(()=>{
  $("#cart").on("click",".reduce,.add",e=>{
    var $tar=$(e.target);
	var count=$tar.parent().children(":eq(1)").val();
	if ($tar.is(".add"))
	{
		count++;
	}else count--;
	var iid=$tar.parent().data("iid");
	$.get("data/cart/updateCount.php",{iid,count}).then(loadCart);
  })
	  .on("click",".title>a",e=>{
	    e.preventDefault();
       $.get("data/cart/clearCart.php").then(()=>{
	       $(".cart_content").empty();
		   $("#total").html("0.00");
	   })
  })
})
//分页
$(()=>{
	var page=document.getElementById("pages");
	page.onclick=e=>{
		var tar=e.target;
		var i;
//		if (tar.nodeName=="A" && tar.className.indexOf("disable")==-1 && tar.className.indexOf("current")==-1)
		if (tar.nodeName=="A" && !/disabled|current/.test(tar.className))
		{
			if (/previous/.test(tar.className))
			{
				i=parseInt(page.querySelector(".current").innerHTML)-1;
			}else if(/next/.test(tar.className)){
			    i=parseInt(page.querySelector(".current").innerHTML)+1;
			}else
				i=tar.innerHTML;
				loadPage(i);		
		}
		
	}
});