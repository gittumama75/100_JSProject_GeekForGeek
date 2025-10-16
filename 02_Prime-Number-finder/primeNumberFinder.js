function checkPrimeNumber(number) {
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i < Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}
document.getElementById("sub-id").addEventListener("click", () => {
    let inputValue = document.getElementById("input-id").value;
    let result = checkPrimeNumber(inputValue);
    if (result) {
        document.getElementById("dom-msg").innerHTML = `Your given number ${inputValue} is prime value`;
    } else {
        document.getElementById("dom-msg").innerHTML = `Your given number ${inputValue} is not prime value`;
    }
});

document.getElementById("id-clear").addEventListener("click", () => {
    document.getElementById("input-id").value = "";
    document.getElementById("dom-msg").innerHTML = "Please enter another number";
});
