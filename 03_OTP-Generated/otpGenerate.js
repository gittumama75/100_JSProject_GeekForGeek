let generatedOTP;

//  Basic Function for the initialization
function init() {
    // console.log("Javascript initialization done!!");
    tackleOTPBoxes();
    setTimeout(generateOTP, 1000);
}
init();

//  Function for the generated OTP
function generateOTP() {
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("generated-otp-id").innerText = `Your OTP is : ${generatedOTP}`;
    console.log(generatedOTP);
}

//  Function for the tackle OTP Boxes
function tackleOTPBoxes() {
    document.getElementById("otp-box-list-id").addEventListener("input", (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
            return;
        }
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.focus();
        }
    });
    validateOTP();
}
