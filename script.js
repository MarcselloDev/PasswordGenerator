let includeSymbols = true
let includeNumbers = true
let includeUppercase = true
let includeLowercase = true

let symbols = ["@","%","+","/","'","!","#","$","^","?",":",".","(",")","{","}","~","&"]
let numbers = ["0","1","2","3","4","5","6","7","8","9"]
let uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

let passwordContains = [symbols, numbers, uppercase, lowercase]
let passwordArray = []
let password


document.getElementById('include-symbols').addEventListener('click', () => {
  if (includeSymbols === false) {
    passwordContains.push(symbols)
    includeSymbols = true
    generatePassword()
  } else if (includeSymbols === true) {
    passwordContains = passwordContains.filter(item => item !== symbols);
    includeSymbols = false
    generatePassword()
  } else {
    console.log('ERROR');
  }
})

document.getElementById('include-numbers').addEventListener('click', () => {
  if (includeNumbers === false) {
    passwordContains.push(numbers)
    includeNumbers = true
    generatePassword()
  } else if (includeNumbers === true) {
    passwordContains = passwordContains.filter(item => item !== numbers);
    includeNumbers = false
    generatePassword()
  } else {
    console.log('ERROR');
  }
})

document.getElementById('include-uppercase').addEventListener('click', () => {
  if (includeUppercase === false) {
    passwordContains.push(uppercase)
    includeUppercase = true
    generatePassword()
  } else if (includeUppercase === true) {
    passwordContains = passwordContains.filter(item => item !== uppercase);
    includeUppercase = false
    generatePassword()
  } else {
    console.log('ERROR');
  }
})

document.getElementById('include-lowercase').addEventListener('click', () => {
  if (includeLowercase === false) {
    passwordContains.push(lowercase)
    includeLowercase = true
    generatePassword()
  } else if (includeLowercase === true) {
    passwordContains = passwordContains.filter(item => item !== lowercase);
    includeLowercase = false
    generatePassword()
  } else {
    console.log('ERROR');
  }
})

document.getElementById('length').addEventListener('change', () => {
  generatePassword()
})

function generatePassword() {
  passwordArray = []
  if (document.getElementById('length').value > 20) {
    document.getElementById('length').value = 20
  } else if (document.getElementById('length').value < 4) {
    document.getElementById('length').value = 4
  }

  if (passwordContains.length === 0) {
    document.getElementById('password').value = 'Select something'
    document.getElementById('password').removeEventListener('click', copyPassword)
    document.getElementById('security').textContent = ''
    return;
  }

  let length = parseInt(document.getElementById('length').value);
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * passwordContains.length);
    let charArray = passwordContains[index];
    let randomChar = charArray[Math.floor(Math.random() * charArray.length)];
    passwordArray.push(randomChar);
  }

  let multiplier = 1
  if (includeSymbols) {
    multiplier += 0.5
  }
  if (includeNumbers) {
    multiplier += 0.5
  }
  if (includeUppercase) {
    multiplier += 0.5
  }
  if (includeLowercase) {
    multiplier += 0.5
  }

  let security = length*2*multiplier

  if (security <=30) {
    security = 'Very Weak'
    document.getElementById('security').style.color = 'darkred'
  } else if (security <= 40) {
    security = 'Weak'
    document.getElementById('security').style.color = 'red'
  } else if (security <= 50) {
    security = 'Good'
    document.getElementById('security').style.color = 'orange'
  } else if (security <= 70) {
    security = 'Strong'
    document.getElementById('security').style.color = 'lightgreen'
  } else if (security >= 70) {
    security = 'Very Strong'
    document.getElementById('security').style.color = 'Green'
  }

  password = passwordArray.join('');
  document.getElementById('password').value = password
  document.getElementById('security').textContent = security
}
generatePassword()

document.getElementById('password').addEventListener('click',copyPassword)

function copyPassword() {
  const passwordText = document.getElementById('password').value;
  navigator.clipboard.writeText(passwordText)
}