let generatedOTP;
const otpExpiresElem = document.getElementById("otp-expires-id");

//  Function for the tackle OTP boxes
function tackleOTPBoxes() {
    document.getElementById("otp-box-list-id").addEventListener("input", (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
            return;
        }
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.focus();
        }
        validateOTP();
    });
}

//  Function for the generate OTP
function generateOTP() {
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("generated-otp-id").innerText = `Your OTP is : ${generatedOTP}`;
    expireOTP();
}

//  Function for the OTP validation
function validateOTP() {
    let typedNumber = "";
    const otpBoxes = document.getElementById("otp-box-list-id").children;
    [...otpBoxes].forEach((element) => {
        typedNumber = typedNumber + element.value;

        const result = generatedOTP === parseInt(typedNumber, 10);
        const resultElem = document.getElementById("result-id");

        if (result) {
            document.getElementById("result-id").innerText = `OTP has been validate successfully`;
            resultElem.classList.remove("fail");
            resultElem.classList.add("success");
        } else {
            document.getElementById("result-id").innerText = `OTP has not valid`;
            resultElem.classList.remove("success");
            resultElem.classList.add("fail");
        }
    });
}

//  Function for the checking OTP expiration
function expireOTP() {
    const totalTime = 15000;
    const interval = 1000;
    let slice = totalTime / interval;

    const intvId = setInterval(function () {
        otpExpiresElem.innerText = `OTP will expire in ${slice} seconds.`;
        slice = slice - 1;
    }, interval);

    setTimeout(function () {
        otpExpiresElem.innerText = "OTP Expired";
        clearInterval(intvId);
    }, totalTime);
}

//  Function for the initialization
function init() {
    console.log("Javascript initialization done!!");
    tackleOTPBoxes();
    setTimeout(generateOTP, 2000);
}
init();
