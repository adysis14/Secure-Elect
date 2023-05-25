function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

$("#verify_otp_model").hide();
$("#errorbox").hide();

var aadhaar_no_phone_no = {
  "73825370001": "915801xxxx",
  681698110987: "9075339422",
  426472598581: "6307220658",
};

function onSignInSubmit() {
  var phoneNumber = "+91" + aadhaar_no_phone_no[$("#aadhaar_no").val()];
  var appVerifier = window.recaptchaVerifier;

  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign in with the code.
      window.confirmationResult = confirmationResult;
      $("#enter_aadhaarno").hide();
      $("#verify_otp_model").show();
      console.log("OTP sent");
    })
    .catch(function (error) {
      // Error; SMS not sent
      console.error('Error during signInWithPhoneNumber', error);
      window.alert("Error: " + error.message);
      $(".verification-code-form").hide();
    });
}

// Phone auth initialization
firebase.initializeApp({
  apiKey: "AIzaSyCWE6sGJU6CObYhcytNLmtUjYqtsQ2Hg9U",
  authDomain: "elect-9d431.firebaseapp.com",
  projectId: "elect-9d431",
});

var recaptchaVerifier = new firebase.auth.RecaptchaVerifier("getotp", {
  size: "invisible",
});

recaptchaVerifier
  .render()
  .then(function (widgetId) {
    window.recaptchaWidgetId = widgetId;
  })
  .catch(function (error) {
    console.error("Error rendering reCAPTCHA widget", error);
  });

$(document).on("click", "#verifyotp", function () {
  var code = $("#verify_otp").val();
  var confirmationResult = window.confirmationResult;

  confirmationResult
    .confirm(code)
    .then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log("User UID:", user.uid);
      window.location = "/info";
    })
    .catch(function (error) {
      // User couldn't sign in (bad verification code?)
      console.error("Error while checking the verification code", error);
      window.alert(
        "Error while checking the verification code:\n\n" +
          error.code +
          "\n\n" +
          error.message
      );
      $("#errorbox").show();
      $("#error").text("Enter a valid OTP");
    });
});

$(document).on("click", "#getotp", function () {
  if ($("#aadhaar_no").val() == "") {
    $("#errorbox").show();
    $("#error").text("Please enter Aadhaar No");
  } else {
    onSignInSubmit();
    $("#errorbox").hide();
  }
});
