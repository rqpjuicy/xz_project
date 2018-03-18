(()=>{
  var lid=location.search.split("=")[1];
  var LID={lid};
  $.get("data/products/getProductByLid.php",LID).then(output=>{
	  //console.log(output);
	  var {product,spec,imgs}=output;
      document.querySelector("#show-details>h1").innerHTML=product.title;
      document.querySelector("#show-details>h3>a").innerHTML=product.subtitle;
      document.querySelector("#show-details .stu-price>span").innerHTML="￥"+product.price;
      document.querySelector("#show-details .promise>span").innerHTML=product.promise;
	  var html="";
      for (var s of spec )
      {
	       html+=`<a href="product_details.html?lid=${s.lid}" class=${
              s.lid===product.lid?"active":""
            }>${s.spec}</a>`;
      }
	  document.querySelector("#show-details .spec>div").innerHTML=html;
	  var {lname,os,memory,resolution,video_card,cpu,video_memory,category,disk,details}=product;
	  document.querySelector("#param>ul").innerHTML
	        =`<li>
						<a href="javascript:;">商品名称：${lname}</a>
                    </li>
					<li>
					  <a href="javascript:;">系统：${os}</a>
					</li>
					<li>
					  <a href="javascript:;">内存容量：${memory}</a>
					</li>
					<li>
					  <a href="javascript:;">分辨率：${resolution}</a>
					</li>
					<li>
					  <a href="javascript:;">显卡型号：${video_card}</a>
					</li>
					<li>
					  <a href="javascript:;">处理器：${cpu}</a>
					</li>
					<li>
					  <a href="javascript:;">显存容量：${video_memory}</a>
					</li>
					<li>
					  <a href="javascript:;">分类：${category}</a>
					</li>
					<li>
					  <a href="javascript:;">硬盘容量：${disk}</a>
					</li>`;
	  document.querySelector("#product-intro").innerHTML=details;
	  var html="";
      for (var img of imgs )
      {
	       html+=`<li class="i1">
			          <img src="${img.sm}" data-md="${img.md}" data-lg="${img.lg}">
			      </li>`;
      }
	  var ul=document.querySelector("#product-details h1>#icon_list");
	  ul.innerHTML=html;
	  ul.style.width=62*imgs.length+"px";
	  if (imgs.length<=5)
	  {
		  document.querySelector("#preview>h1>a.forward").className="forward disabled";
	  }//禁用前翻按钮
	  document.querySelector("#mImg").src=imgs[0].md;
	  document.querySelector("#largeDiv").style.backgroundImage=`url(${imgs[0].lg})`;
  })
})();
//放大镜功能
(()=>{
  var [aBackward,aForward]=
	    document.querySelectorAll("#preview>h1>a");
  var ul=document.getElementById("icon_list");
  var LIWIDTH=62,OFFSET=20,moved=0;
  aForward.onclick=e=>{
	if (e.target.className.indexOf("disabled")==-1)
	{
		 move(1);	
	} 
  }
  aBackward.onclick=e=>{
	if (e.target.className.indexOf("disabled")==-1)
	{
		 move(-1);
	} 
  }
  function move(dir){
	moved+=dir;
	var left=-LIWIDTH*moved+20;
	ul.style.left=left+"px";
	checkA();
  }
  function checkA(){
	if (moved==0)
	{
		aBackward.className="backward disabled";
	}else if (ul.children.length-moved==5)
	{
		aForward.className="forward disabled";
	}else {
		aBackward.className="backward";
		aForward.className="forward";
	}
  }
  var mImg=document.getElementById("mImg"),
    largeDiv=document.getElementById("largeDiv"),
    mask=document.getElementById("mask"),
    supermask=document.getElementById("superMask");
  ul.onmouseover=e=>{
	if (e.target.nodeName=="IMG")
	{
		mImg.src=e.target.dataset.md;
		largeDiv.style.backgroundImage=`url(${e.target.dataset.lg})`;
	}
  }
  supermask.onmouseover=()=>{
	mask.style.display=largeDiv.style.display="block";
  }
  supermask.onmouseout=()=>{
    mask.style.display=largeDiv.style.display="none";
  }
  var MAX=175;
  supermask.onmousemove=e=>{
	 var offsetX=e.offsetX,offsetY=e.offsetY;
	var top=offsetY-175/2,
	left=offsetX-175/2;
	top=top<0?0:top>175?175:top;
	left=left<0?0:left>175?175:left;
	mask.style.top=top+"px";
	mask.style.left=left+"px";
	largeDiv.style.backgroundPosition=-left*16/7+"px "+(-top*16/7)+"px";
  }

})()
