<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CryptoTradeController extends Controller
{
    public function index(){
        $apiKey = 'kQH5HW/8p1uGOVjbgWA7FunAmGO8lsSUXNsu3eow76sz84Q18fWxnyRzBHCd3pd5nE9qa99HAZtuZuj6F1huXg==';
     $apiSecret = 'kQH5HW/8p1uGOVjbgWA7FunAmGO8lsSUXNsu3eow76sz84Q18fWxnyRzBHCd3pd5nE9qa99HAZtuZuj6F1huXg==';
$nonce = time(); // Use the current timestamp as the nonce

$data = array(
    'pair' => 'XXBTZUSD',
    'type' => 'buy',
    'ordertype' => 'limit',
    'price' => '45000.1',
    'volume' => '2.1234',
    'leverage' => '2:1',
    'close[ordertype]' => 'stop-loss-limit',
    'close[price]' => '38000',
    'close[price2]' => '36000'
);

$postData = http_build_query($data);

dd($postData);

$sign = hash_hmac('sha256', $nonce . $postData, base64_decode($apiSecret), true);
// dd($sign);
$signature = base64_encode($sign);
// dd($signature);
$url = 'https://api.kraken.com/0/private/AddOrder';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'API-Key: ' . $apiKey,
    'API-Sign: ' . $signature,
    'Content-Type: application/x-www-form-urlencoded; charset=utf-8'
));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

$b = curl_getinfo($ch);

// dd($b);die;

if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    echo 'Response: ' . $response;
}

curl_close($ch);
    }
}
