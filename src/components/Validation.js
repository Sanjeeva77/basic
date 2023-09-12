
// Validation for ID (assuming it should be a non-empty string)
export function validateId(id) {
    if (id.trim() === "") {
        return "Please enter your ID.";
    }
    return "";
}

// Validation for User Name (assuming it should be a non-empty string)
export function validateUsername(username) {
    if (username.trim() === "") {
        return "Please enter your username.";
    }
    else if(username.length>15){
        return "User Name Must be below 15 characters";
    }
    return "";
}


export function validatePassword(password) {
    const passwordRegex=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/;
    if (!passwordRegex.test(password)) {
        return "Password must conatin atleast one digit,one special char,one lowercase char and length between 8-20";
    }
    return "";
}

// Validation for Email (assuming it should be a valid email format)
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
    }
    return "";
}

