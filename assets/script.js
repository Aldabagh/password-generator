// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  if (!password) {
    return;
  }
  passwordText.value = password;
}
// the function that generate the password
function generatePassword() {
  //prompt the user to get the password length
  var passLength = prompt("Enter password length?");
  passLength = Number(passLength);

  // func that make sure password length within the valid range
  function maxLength() {
    while (passLength > 128 || passLength < 8) {
      
      passLength = prompt("Password length must be 8 - 128");
      
    }
  }

  
if (!passLength) {
    return;
  }
  maxLength();
  // minLength();

  

  //prompt the user with questions
  var upperCase = passOptions(
    "upperCase",
    confirm("Do you like your password include uppercase?"),
  );
  var lowerCase = passOptions(
    "lowerCase",
    confirm("Do you like your password include lowercase?"),
  );

  var symbols = passOptions(
    "symbols",
    confirm("Do you like your password include symbols?"),
  );

  var numeric = passOptions(
    "numeric",
    confirm("Do you like your password include numeric?"),
  );



  var letters = "abcdefghijklmnopqrstuvwxyz";
  //user responds/answers array
  let allAnswers = [upperCase, lowerCase, symbols, numeric];
    //fliter the array to get the true answers
  var allTrueAnswers = allAnswers.filter((answer) => {
    return answer.value === true;
  });

  if (allTrueAnswers.length == 0) {
    alert("Please select at least one answer?")
    return generatePassword();
  }

  //data pool

  
  let pool = {
    upperCase: letters.toUpperCase(),
    lowerCase: letters,
    numeric: "0123456789",
    symbols: "!@#$%^&*()?~",
  };
  var trueOptionValues = allTrueAnswers.map((item) => pool[item.name]);

  // generate the password
  let generatedPassword = [];
  for (i = 1; i <= Number(passLength); i++) {
    let wholeString = trueOptionValues.join("");  //use join() to merge all the pool key values
    let char = wholeString[Math.floor(Math.random() * wholeString.length)]; //get random char from wholeString 
    generatedPassword.push(char);
  }

  return generatedPassword.join("");
}

function passOptions(name, value) {
  return { name, value };
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
