<?php

require 'function.php';

echo  "  _____             _   _  __        _____                _             
 / ____|           | | (_)/ _|      / ____|              | |            
| (___  _ __   ___ | |_ _| |_ _   _| |     _ __ ___  __ _| |_ ___  _ __ 
 \___ \| '_ \ / _ \| __| |  _| | | | |    | '__/ _ \/ _` | __/ _ \| '__|
 ____) | |_) | (_) | |_| | | | |_| | |____| | |  __/ (_| | || (_) | |   
|_____/| .__/ \___/ \__|_|_|  \__, |\_____|_|  \___|\__,_|\__\___/|_|   
       | |                     __/ |                                    
       |_|                    |___/                                     \n";




echo "\n";

echo "Total Akun Yang Mau Dibuat : ";
$total = trim(fgets(STDIN));
echo "Passsword : ";
$passwd = trim(fgets(STDIN));
echo "\n";

$no = 1;
for ($x = 1; $x <= $total; $x++) {	
$nama = explode(" ", nama());
$nama1 = $nama[0];
$nama2 = $nama[1];
$hasil1 = acak(5);

$headers = array();
$headers[] = 'User-Agent: Spotify/8.5.51 Android/22 (SM-A908N)';
$headers[] = 'Content-Type: application/x-www-form-urlencoded';


$gas = curl('https://spclient.wg.spotify.com/signup/public/v1/account/', 'key=142b583129b2df829de3656f9eb484e6&password='.$passwd.'&creation_point=client_mobile&name=Aww&gender=male&iagree=true&platform=Android-ARM&birth_day=6&birth_month=4&birth_year=2006&password_repeat='.$passwd.'&email='.$nama1.''.$nama2.''.$hasil1.'%40haikak.my.id', $headers);
	if (strpos($gas[1], 'Email itu sudah terdaftar pada akun.')) {
		echo "[$no] [Gagal] $nama1$nama2$hasil1@haikak.my.id|$passwd\n";
	} else {
		echo "[$no] [Success Register] $nama1$nama2$hasil1@haikak.my.id|$passwd\n";
		fwrite(fopen('spot.txt', 'a'), "$nama1$nama2$hasil1@haikak.my.id|$passwd\n");
		$no++;
	}
// // sleep(5);
// $headers = array();
//     $headers[] = 'Host: generator.email';
//     $headers[] = 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0';
//     $headers[] = 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
//     $headers[] = 'Accept-Language: id,en-US;q=0.7,en;q=0.3';
//     $headers[] = 'Connection: close';
//     $headers[] = 'Cookie: surl=haikak.my.id%2F'.$nama1.''.$nama2.'; _ga=GA1.2.1171942595.1592936484; _gid=GA1.2.1882707753.1592936484; __gads=ID=123d57699689eca8:T=1592936486:S=ALNI_MZ5U15we3U99-D5aAEncHBqVAhQUw; _gat=1';
//     $headers[] = 'Upgrade-Insecure-Requests: 1';

// $verifmail = curl('https://generator.email/inbox3/', null, $headers);
// preg_match_all('/<a href="(.*?)"/', $verifmail[1], $outputs);
// $veriflink = ($outputs[1]['3']);
// $verif = curl(''.$veriflink.'', null, null);
// $redirect = get_between($verif[1], 'https://www.spotify.com/email-verification/?', '"');
// $verification = curl('https://www.spotify.com/id/email-verification/?'.$redirect.'', null, null);
// if (strpos($verification[1], 'email-verification/success/')) {
// 	echo "[2] Email Verification Sukses\n";
// 	echo "File Saved To output.txt";
// } else {
// 	echo "[2] Gagal Verification\n";
// }
}