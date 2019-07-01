<?

include("data.php");

$subject="Заказ диагностики с сайта ATB-Сервис";

$body="Имя: ".clearData($_POST[_fixed_name("name")])."
Телефон: ".clearData($_POST[_fixed_name("tel")])."
";

@mail($email,$subject,$body,"From:$email\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n");
?>	