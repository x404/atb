<?
if (isset($_POST['token'])) {
    $captcha_token = $_POST['token'];
} else {
    die('Капча работает некорректно. Обратитесь к администратору!');
}
 
$url = 'https://www.google.com/recaptcha/api/siteverify';
$params = [
    'secret' => '',
    'response' => $captcha_token,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];
 
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
$response = curl_exec($ch);
if(!empty($response)) $decoded_response = json_decode($response);
 
$success = false;
 
var_dump($response);
if ($decoded_response && $decoded_response->success  && $decoded_response->score > 0) {
    $success = $decoded_response->success;
    // обрабатываем данные формы, которая защищена капчей
    echo ("Человек");

	include("data.php");
	require_once 'sms/sms.ru.php';
	$subject="Заказ диагностики с сайта ATB-Сервис";
	$name = clearData($_POST[_fixed_name("name")]);
	$tel = clearData($_POST[_fixed_name("tel")]);

$body="Имя: ".$name."
Телефон: ".$tel."
";


	$smsbody = $name.', '.$tel;


	// SMS
	$smsru = new SMSRU('b3134538-5800-61f4-8d0e-49f522ab68ed'); // Ваш уникальный программный ключ, который можно получить на главной странице

	$data = new stdClass();
	$data->to = '380963974481';
	$data->text = $smsbody; // Текст сообщения
	// $data->from = ''; // Если у вас уже одобрен буквенный отправитель, его можно указать здесь, в противном случае будет использоваться ваш отправитель по умолчанию
	// $data->time = time() + 7*60*60; // Отложить отправку на 7 часов
	$data->translit = 1; // Перевести все русские символы в латиницу (позволяет сэкономить на длине СМС)
	$data->test = 1; // Позволяет выполнить запрос в тестовом режиме без реальной отправки сообщения
	// $data->partner_id = '1'; // Можно указать ваш ID партнера, если вы интегрируете код в чужую систему
	// $sms = $smsru->send_one($data); // Отправка сообщения и возврат данных в переменную

	// if ($sms->status == "OK") { // Запрос выполнен успешно
	//     echo "Сообщение отправлено успешно. ";
	//     echo "ID сообщения: $sms->sms_id. ";
	//     echo "Ваш новый баланс: $sms->balance";
	// } else {
	//     echo "Сообщение не отправлено. ";
	//     echo "Код ошибки: $sms->status_code. ";
	//     echo "Текст ошибки: $sms->status_text.";
	// }


	@mail($email,$subject,$body,"From:$email\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n");

} else {
    // прописываем действие, если пользователь оказался ботом
    echo ("Бот");
}
 

	echo json_encode($success);
?>	