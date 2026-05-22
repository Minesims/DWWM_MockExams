<?php

class StandardSubscription {

    protected string      $user;
    protected float       $monthlyPrice;
    protected datetime    $startingDate;
    protected bool        $isActive;

    /**
     * This is a construct method to retrieve all requested values
     * 
     * @param string $user
     * @param float $monthlyPrice
     * @param datetime $startingDate
     * @param bool $isActive
     */
    public function __construct($user, $monthlyPrice, $startingDate, $isActive) {
        $this->user = $user;
        $this->monthlyPrice = $monthlyPrice;
        $this->startingDate = $startingDate;
        $this->isActive = $isActive;
    }

    public function activate() {
        $this->isActive = true;
        return true;
    }

    public function cancelSubs() {
        $this->isActive = false;
        return true;
    }

    public function calcTotalPrice(int $month) {
        $totalPrice = $this->monthlyPrice * $month;
        return $totalPrice;
    }

    public function showDetails() {
        $dateStr = $this->startingDate->format('d/m/Y');
        $infos = ['user'=>$this->user, 'monthlyPrice'=>$this->monthlyPrice, 'startingDate'=>$dateStr, 'isActive'=>$this->isActive];
        return $infos;
    }

}
?>