"use strict";

let rangePrice = document.getElementById("range-price");
let inputPrice = document.getElementById("input-price");
let rangeContribution = document.getElementById("range-contribution");
let inputContribution = document.getElementById("input-contribution");
let rangeTerm = document.getElementById("range-term");
let inputTerm = document.getElementById("input-term");
let percentBody = document.querySelector(".contribution-type__text");
let pricePayment = document.querySelector(".price-payment__result").firstChild;
rangePrice.addEventListener("input", changeInputPrice);
inputPrice.addEventListener("input", changeRangePrice);
rangeContribution.addEventListener("input", changeInputContribution);
inputContribution.addEventListener("input", changeRangeContribution);
inputTerm.addEventListener("input", changeRangeTerm);
rangeTerm.addEventListener("input", changeInputTerm);

function changeInputPrice(e) {
    const contribution = (+e.target.value * +10) / 100;
    inputPrice.value = e.target.value;

    percentBody.textContent = "10%";
    rangeContribution.value = 10;
    inputContribution.value = contribution;
    changePaymentResult(e.target.value, contribution, rangeContribution.value, rangeTerm.value);
    changeResultPrice(contribution, rangeTerm.value, pricePayment.textContent);
}

function changeRangePrice(e) {
    let value = +e.target.value;
    const contribution = (value * +10) / 100;
    rangePrice.value = value;
    percentBody.textContent = "10%";
    rangeContribution.value = 10;
    inputContribution.value = contribution;
    changeResultPrice(contribution, rangeTerm.value, pricePayment.textContent);
}

function changeInputContribution(e) {
    const contribution = (+inputPrice.value * +e.target.value) / 100;
    percentBody.textContent = e.target.value + "%";
    inputContribution.value = contribution;
    changeResultPrice(contribution, rangeTerm.value, pricePayment.textContent);
}

function changeRangeContribution(e) {
    const percent = Math.round((+e.target.value * 100) / +inputPrice.value);
    rangeContribution.value = percent;
    percentBody.textContent = percent + "%";
    changeResultPrice(e.target.value, rangeTerm.value, pricePayment.textContent);
}

function changeRangeTerm(e) {
    rangeTerm.value = e.target.value;
    changeResultPrice(inputContribution.value, rangeTerm.value, pricePayment.textContent);
}

function changeInputTerm(e) {
    inputTerm.value = e.target.value;
    changeResultPrice(inputContribution.value, e.target.value, pricePayment.textContent);
}

function changeResultPrice(contribution, term, payment) {
    const resultPrice = document.querySelector(".price-sum__result").firstChild;
    const price = +contribution + +term * +payment;
    resultPrice.textContent = price.toLocaleString();
}

function changePaymentResult(price, contribution, percent, term) {
    const payment = +price - +contribution * (+percent / (1 + +percent) - +term - 1);
}

function getTreaty() {
    const resultPrice = document.querySelector(".price-sum__result").firstChild;
    const TREAT = [
        {
            carPrice: inputPrice.value.toLocaleString() + "₽",
            anInitialFee: inputContribution.value.toLocaleString() + "₽",
            percent: rangeContribution.value + "%",
            leaseTerm: inputTerm.value + "мес.",
            amountDeal: resultPrice.textContent.toLocaleString() + "₽",
            monthlyPaymeny: pricePayment.textContent + "₽",
        },
    ];
    console.log(TREAT);
}
