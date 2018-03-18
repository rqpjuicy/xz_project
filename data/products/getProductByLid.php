<?php
header("Content-Type:application/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
$output=[];
if ($lid){
    $sql="select * from xz_laptop where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$product=mysqli_fetch_all($result,1)[0];
	$output["product"]=$product;
	$family_id=$product["family_id"];
	$sql="select lid,spec from xz_laptop where family_id=$family_id";
	$result=mysqli_query($conn,$sql);
	$spec=mysqli_fetch_all($result,1);
	$output["spec"]=$spec;
	$sql="select * from xz_laptop_pic where laptop_id=$lid";
	$result=mysqli_query($conn,$sql);
	$imgs=mysqli_fetch_all($result,1);
	$output["imgs"]=$imgs;
}
echo json_encode($output);
