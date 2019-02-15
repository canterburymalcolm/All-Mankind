<?php
require_once('vendor/autoload.php');
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
\Stripe\Stripe::setApiKey("sk_test_2QxwHCFDOsve8Rhs6yyPsXvh");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
$token = $_POST['stripeToken'];
$amount = $_POST['amount'];
$cart = $_POST['cart'];
$desc = $_POST['description'];
$email = $_POST['email'];
$customer = [];
$debug = '';

$customers = \Stripe\Customer::all(['email' => $email]); 

if (sizeof($customers['data']) > 0) {
    $customer = $customers['data'][0];
    // \Stripe\Customer::update($customer, [
    //     'source' => $token,
    // ]);
} else {
    $customer = \Stripe\Customer::create([
        'email' => $email,
        'source' => $token,
    ]);
    $debug = 'created customer';
}

$charge = \Stripe\Charge::create([
    'amount' => $amount,
    'currency' => 'usd',
    'description' => $desc,
    'customer' => $customer,
    //'source' => $token,
    'receipt_email' => $email, 
    //'metadata' => ['cart' => $cart],
    'metadata' => ['debug' => $debug],
]);
?>