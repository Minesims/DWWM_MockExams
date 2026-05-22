<?php
require_once 'standardSubscription.php';
require_once 'premiumSubscription.php';

// instance of a standard subscription account

$accountsArray = [];
$accountsArray[] = ['Florian', 14.99, new datetime(2026-06-02), true];
$accountsArray[] = ['Olivia', 14.99, new datetime(2026-05-07), true, 15];

$i = 0;
foreach ($accountsArray as $accounts) {
    $arrayCount = count($accounts);
    if ($arrayCount == 4) {
        $account = new StandardSubscription($accounts[$i][0], float($accounts[$i][1]), $accounts[$i][2], $accounts[$i][3]);
    } else if ($arrayCount == 5) {
        $account = new PremiumSubscription($accounts[$i][0], float($accounts[$i][1]), $accounts[$i][2], $accounts[$i][3], $accounts[$i][4]);
    } else {
        print('Error');
        exit;
    }
    $infos = $account->showDetails();
    if ($account->activate()) {
        echo 'Subscription activated.</br>';
        print($infos['user'].'</br>');
    }
    if ($account->cancelSubs()) {
        echo 'Subscription canceled.</br>';
        print($infos['user'].'</br>');
    }
    $oneYearPrice = $account->calcTotalPrice(12);
    print('Total annual amount : '.$oneYearPrice.' €.</br>');
    print('Account owner : '.$infos['user'].'. Price per month : '.$infos['monthlyPrice'].' €. Subscription date : '.$infos['startingDate'].'.');
    if(isset($infos['discount'])) {
        print(' Applied discount : '.$infos['discount'].' %.</br>');
    } else {
        print('</br>');
    }
    $i++;
}

?>