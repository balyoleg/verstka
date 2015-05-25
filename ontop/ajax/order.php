<?php
    include('config.php');
    
    
    $subject=$_POST['subject'];

// письмо админу
    $header="";
    $header.='MIME-Version: 1.0'."\r\n";
    $header.='Date: '.date("D, d M Y H:i:s O")."\r\n";
    $header.="From: Waterlab ".$config['system_email']."\r\n";
    $header.="Reply-To: Waterlab ".$config['admin_email']."\r\n";
    $header.="Content-type: text/html; charset=utf-8\r\n";

    $msg="";
    $msg.="<strong>".$subject."</strong><br /><br /><br /><br />";
    $msg.="<strong>Информация о покупателе:</strong><br />";
    $msg.="<strong>Имя:</strong> ".$_POST['name']."<br />";
    $msg.="<strong>Телефон:</strong> ".$_POST['phone']."<br />";

    if($config['enabled'])mail($config['admin_email'],$subject,$msg,$header);
?>