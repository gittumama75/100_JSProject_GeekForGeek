let generatedOTP;

//  Function for the tackle OTP boxes
function tackleOTPBoxes() {
    const otpContainer = document.getElementById("otp-box-list-id");
    otpContainer.addEventListener("input", (e) => {
        // Only allow numbers
        if (isNaN(e.target.value)) {
            e.target.value = "";
            return;
        }
        // Move to next box automatically
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.focus();
        }
        validateOTP();
    });
    //allow backspace to go to the previous box.
    otpContainer.addEventListener("keydown", (e) => {
        // Handle backspace
        if (e.key === "Backspace" && e.target.value === "" && e.target.previousElementSibling) {
            e.target.previousElementSibling.value = "";
            e.target.previousElementSibling.focus();
        }
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

    // সব ঘরের সংখ্যা জোড়া লাগানো হচ্ছে
    [...otpBoxes].forEach((element) => {
        // typedNumber = typedNumber + element.value;
        typedNumber += element.value;

        const result = generatedOTP === parseInt(typedNumber, 10);
        const resultElem = document.getElementById("result-id");
        // যদি সব ঘর পূর্ণ না হয়, তাহলে কিছুই দেখাবে না
        if (typedNumber.length < otpBoxes.length) {
            resultElem.innerText = "";
            resultElem.classList.remove("success", "fail");
            return;
        }
        if (result) {
            document.getElementById("result-id").innerText = `✅ OTP has been validated successfully`;
            resultElem.classList.remove("fail");
            resultElem.classList.add("success");
        } else {
            document.getElementById("result-id").innerText = `❌ OTP is not valid`;
            resultElem.classList.remove("success");
            resultElem.classList.add("fail");
        }
    });
}

//  Function for the checking OTP expiration
function expireOTP() {
    const totalTime = 15000; // 15 seconds
    const interval = 1000;
    let slice = totalTime / interval;
    const otpExpiresElem = document.getElementById("otp-expires-id");

    const intvId = setInterval(function () {
        otpExpiresElem.innerText = `OTP will expire in ${slice} seconds.`;
        slice--;
    }, interval);

    setTimeout(function () {
        otpExpiresElem.innerText = "⏳ OTP Expired";

        // 1️⃣ টাইমার বন্ধ
        clearInterval(intvId);

        // 2️⃣ সব ইনপুট বক্স disable করে দেওয়া
        const otpBoxes = document.querySelectorAll(".otp-box");
        otpBoxes.forEach((box) => {
            box.disabled = true;
            box.classList.add("disabled-box"); // Optional: styling for disabled
        });

        // 3️⃣ মেসেজও দেখানো যেতে পারে
        const resultElem = document.getElementById("result-id");
        resultElem.innerText = "⚠️ OTP time has expired. Please resend.";
        resultElem.classList.remove("success");
        resultElem.classList.add("fail");
    }, totalTime);
}

//  Function for the initialization
function init() {
    console.log("Javascript initialization done!!");
    tackleOTPBoxes();
    setTimeout(generateOTP, 2000);
}
init();
