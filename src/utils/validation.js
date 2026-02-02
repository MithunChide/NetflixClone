
export const checkvalidData = (email, password,name) => {

    const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    // const trimmedName = name.trim();
    // const isName = /^[a-zA-Z\s]+$/.test(trimmedName);


    if(!isEmailValid) return "Email Id is not valid";
    if(!isPasswordValid) return "Password is not valid, It must be at least 8 characters.";
    // if(!isName) return "Name should contain only alphabets";

    return null;
}