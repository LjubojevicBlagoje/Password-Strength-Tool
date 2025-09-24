const form = document.getElementById('parse');
const pwInput = document.getElementById('password');
const out = document.getElementById('output-message');

let passwordString = "";
let len = 0;
let score = 0;

form.addEventListener('submit', (e) => { 
  e.preventDefault();

  passwordString = String(pwInput.value);
  len = passwordString.length;
  score = 0;

  scoreByLen(len);

  scoreByVariety(len, passwordString);

  displayStrength(score);
});

function scoreByLen(len) {
    if (len < 1) {
        out.textContent = `INVALID INPUT - Please enter at least 1 character!`;
    } else if (len <= 3) {
        score = score + 1;
    } else if (len >= 4 && len <= 6) {
        score = score + 2;
    } else if (len >= 7 && len <= 9) {
        score = score + 3;
    } else if (len >= 10 && len <= 13) {
        score = score + 5;
    } else {
        score = score + 8;
    };

    return { score };
}

function scoreByVariety(len, str) {
    if (/[A-Z]/.test(str)) {
        score = score + 1;
    }

    if (/[a-z]/.test(str)) {
        score = score + 1;
    }

    if (/[^A-Za-z0-9\s]/.test(str)) {
        score = score + 1;
    }

    if (/\d/.test(str)) {
        score = score + 1;
    }

    return { score };
}

function displayStrength(score) {
    if (score <= 2 && score > 0) {
        out.textContent = `Strength: VERY WEAK\n\nYour password is too short
        and/or uses a single character type. Consider making your password longer 
        (aim for at least 10 characters), and introduce symbols, digits and both uppercase 
        and lowercase letters.`;
    } else if (score >= 3 && score <= 4) {
        out.textContent = `Strength: WEAK\n\nThis is a short-to-medium length password and lacks variety.
        You should aim to lengthen it to at least 10 characters and include symbols, digits and both uppercase 
        and lowercase letters.`;
    } else if (score >= 5 && score <= 7) {
        out.textContent = `Strength: FAIR\n\nEither length or variety is acceptable, but not both.
        If your password lacks symbols, digits, or both uppercase and lowercase letters. Otherwise consider
        lengthening it to at least 10 characters.`;
    } else if (score >= 8 && score <= 10) {
        out.textContent = `Strength: STRONG\n\nYour password is clearly strong but you could
        make it stronger by adding any missing character types, or extending it beyond 14 chacters.`;
    } else if (score >= 11) {
        out.textContent = `Strength: VERY STRONG\n\nYour password is very strong. Ensure there are no predictable patterns
        or common sequences.`;
    }
}