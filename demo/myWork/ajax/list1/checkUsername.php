<?
$username = array("bill","lili");

sleep(2);

if(!in_array($_REQUEST["username"], $username)){
    echo "okey";
}else{
    echo "approve";
}
?>