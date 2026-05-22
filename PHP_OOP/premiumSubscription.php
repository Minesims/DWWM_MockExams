<?php

class PremiumSubscription extends StandardSubscription {

    private float $discount;

    /**
     * This is a construct method to retrieve all requested values
     * 
     * @param string parent $user
     * @param float parent $monthlyPrice
     * @param datetime parent $startingDate
     * @param bool parent $isActive
     * @param float $discount
     */
    public function __construct($user, $monthlyPrice, $startingDate, $isActive, $discount) {
        parent::__construct($user, $monthlyPrice, $startingDate, $isActive);
        $this->discount = $discount;
    }

    public function applyDiscount() {
        $newPrice = round($this->monthlyPrice - ($this->monthlyPrice * $this->discount / 100), 2);
        $this->monthlyPrice = $newPrice;
        return $this->monthlyPrice;
    }

    public function activate() {
        parent::activate();
    }

    public function cancelSubs() {
        parent::cancelSubs();
    }

    public function calcTotalPrice(int $month) {
        parent::calcTotalPrice();
    }

    public function showDetails() {
        $this->applyDiscount();
        $infos = parent::showDetails();
        $infos['discount'] = $this->discount;
        return $infos;
    }

}
?>