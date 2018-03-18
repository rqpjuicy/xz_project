//广告轮播
$(()=>{
	var LIWIDTH=960,timer=null,moved=0,duration=500,wait=3000;
   $.get("data/index/getCarousel.php").then(data=>{
      var html="";
	  for (var p of data )
	  {
		  html+=`<li>
              <a href="${p.href}" title="${p.title}">
                <img src="${p.img}">
              </a>
            </li>`;
	  }
	   html+=`<li>
              <a href="${data[0].href}" title="${data[0].title}">
                <img src="${data[0].img}">
              </a>
            </li>`;
	  var $ul=$("[data-load=bannerImgs]");
	  $ul.html(html).css("width",LIWIDTH*(data.length+1))
	  var $ulInds=$("[data-load=bannerInds]");
	  $ulInds.html("<li></li>".repeat(data.length))
		  .children().first().addClass("hover");
	  function move(){
	      $ul.animate({
		   left:-LIWIDTH*moved
		 },duration,function(){
		     if (moved==4)
		     {
				moved=0;
				$ul.css("left",0);
		     }
			 $ulInds.children(`:eq(${moved})`).addClass("hover").siblings().removeClass("hover");
		   })
	  }
	  timer= setInterval(()=>{
		  moved++;
	      move();
	  },wait+duration);
	   $ulInds.on("mouseover","li",e=>{
		 var $li=$(e.target);
		 moved=$li.index();
		 //防动画/定时器叠加
		 clearInterval(timer);
		 $ul.stop(true);
		 move();
	   })
		$("#banner").hover(
		  ()=>clearInterval(timer),
		  ()=>timer=setInterval(()=>{
			     moved++;move();
			  },wait+duration)
	      )
		$("[data-move=right]").click(()=>{
		   if (!$ul.is(":animated"))
		   {
			    moved++;
		        move();
		   } 
		})
		$("[data-move=left]").click(()=>{
		    if (!$ul.is(":animated"))
		    {
				if (moved==0)
				{
					$ul.css("left",-LIWIDTH*data.length);
				    moved=4;
				}
			    moved--;
		        move();
		   } 
		})
   })
})

//楼层1
$(()=>{
  $.get("data/index/getFloor1.php").then(resData=>{
      var html="";
	  for (var i=0;i<resData.length;i++)
	  {
		  var p=resData[i];
		  html+=
		   i<2?`<div>
					<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				   </div>
				  <img src="${p.pic}">
              </div>`:
		   i==2?`<div>
					<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				   </div>
				  <img src="${p.pic}">
              </div>`:
               `<div class="product">
				  <img src="${p.pic}">
				  <p class="name">${p.title}</p>
				  <p class="price">¥${p.price}</p>
				  <a href="${p.href}">查看详情</a>
				</div> `;
	  }
	  document.querySelector("#f1 .floor-content").innerHTML=html;
  });
});
//楼层2
$(()=>{
  $.get("data/index/getFloor2.php").then(resData=>{
      var html="";
	  for (var i=0;i<resData.length;i++)
	  {
		  var p=resData[i];
		  html+=
		   i<2?`<div>
					<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				   </div>
				  <img src="${p.pic}">
              </div>`:
		   i==2?`<div>
					<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				   </div>
				  <img src="${p.pic}">
              </div>`:
               `<div class="product">
				  <img src="${p.pic}">
				  <p class="name">${p.title}</p>
				  <p class="price">¥${p.price}</p>
				  <a href="${p.href}">查看详情</a>
				</div> `;
	  }
	  document.querySelector("#f2 .floor-content").innerHTML=html;
  })
});
//楼层3
$(()=>{
  $.get("data/index/getFloor3.php").then(resData=>{
      var html="";
	  for (var i=0;i<resData.length;i++)
	  {
		  var p=resData[i];
		  html+=
		   i<2?`<div>
					<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				   </div>
				  <img src="${p.pic}">
              </div>`:
		   i==2?`<div>
					<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				   </div>
				  <img src="${p.pic}">
              </div>`:
               `<div class="product">
				  <img src="${p.pic}">
				  <p class="name">${p.title}</p>
				  <p class="price">¥${p.price}</p>
				  <a href="${p.href}">查看详情</a>
				</div> `;
	  }
	  document.querySelector("#f3 .floor-content").innerHTML=html;
  })
});
//楼层滚动
$(()=>{
  $(window).scroll(()=>{
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	//console.log(scrollTop);
	var $f1=$(".floor:first");
	var offsetTop=$f1.offset().top;
	if (offsetTop<=scrollTop+innerHeight/2)
	{
		$("#lift").show();
	}else {
	    $("#lift").hide();
	}
	$floors=$(".floor");
	for (var i=0;i<$floors.length;i++)
	{
		var $f=$($floors[i]);
		if ($f.offset().top>scrollTop+innerHeight/2)
		{
			break;
		}
	}
	//console.log(i);
	$(`#lift>ul>li:eq(${i-1})`).addClass("lift_item_on").siblings().removeClass("lift_item_on");
  })
	$("#lift>ul").on("click","a.lift_btn",function(){
     var $a=$(this);
	 var i=$a.parent().index();
	 var offsetTop=$(`.floor:eq(${i})`).offset().top;
	 $("html").stop(true).animate({
	   scrollTop:offsetTop-50
	 },500)
  })
})