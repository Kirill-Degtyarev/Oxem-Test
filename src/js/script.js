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
    const value = +e.target.value;
    const contribution = Math.round((value * +10) / 100);
    inputPrice.value = Math.round(value);

    if (rangeContribution.value === 0) {
        percentBody.textContent = "10%";
        rangeContribution.value = 10;
    }
    inputContribution.value = contribution;
    changePaymentResult(
        inputPrice.value,
        inputContribution.value,
        rangeContribution.value,
        inputTerm.value
    );
    changeResultPrice(inputContribution.value, rangeTerm.value, pricePayment.textContent);
}

function changeRangePrice(e) {
    const value = +e.target.value;
    const contribution = Math.round((value * +10) / 100);
    rangePrice.value = value;
    if (rangeContribution.value === 0) {
        percentBody.textContent = "10%";
        rangeContribution.value = 10;
    }
    inputContribution.value = contribution;
    changePaymentResult(
        inputPrice.value,
        inputContribution.value,
        rangeContribution.value,
        inputTerm.value
    );
    changeResultPrice(inputContribution.value, rangeTerm.value, pricePayment.textContent);
}

function changeInputContribution(e) {
    const contribution = Math.round((+inputPrice.value * +e.target.value) / 100);
    percentBody.textContent = e.target.value + "%";
    inputContribution.value = contribution;

    changePaymentResult(
        inputPrice.value,
        inputContribution.value,
        rangeContribution.value,
        inputTerm.value
    );
    changeResultPrice(inputContribution.value, rangeTerm.value, pricePayment.textContent);
}

function changeRangeContribution(e) {
    const percent = Math.round((+e.target.value * 100) / +inputPrice.value);
    rangeContribution.value = percent;
    percentBody.textContent = percent + "%";
    changePaymentResult(
        inputPrice.value,
        inputContribution.value,
        rangeContribution.value,
        inputTerm.value
    );
    changeResultPrice(inputContribution.value, rangeTerm.value, pricePayment.textContent);
}

function changeRangeTerm(e) {
    rangeTerm.value = e.target.value;
    changePaymentResult(
        inputPrice.value,
        inputContribution.value,
        rangeContribution.value,
        inputTerm.value
    );
    changeResultPrice(inputContribution.value, rangeTerm.value, pricePayment.textContent);
}

function changeInputTerm(e) {
    inputTerm.value = e.target.value;
    changePaymentResult(
        inputPrice.value,
        inputContribution.value,
        rangeContribution.value,
        inputTerm.value
    );
    changeResultPrice(inputContribution.value, rangeTerm.value, pricePayment.textContent);
}

function changeResultPrice(contribution, term, payment) {
    const resultPrice = document.querySelector(".price-sum__result").firstChild;
    const price = Math.round(+contribution + +term * +payment.replace(/\s/g, ""));
    resultPrice.textContent = price.toLocaleString();
}

function changePaymentResult(price, contribution, percent, term) {
    const payment = Math.round(
        (+price - +contribution) *
            (((+percent / 100) * Math.pow(1 + +percent / 100, +term)) /
                Math.pow(1 + +percent / 100, +term - 1))
    );
    pricePayment.textContent = payment.toLocaleString();
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
