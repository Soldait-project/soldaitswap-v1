export async function loginValidate(data) {

    var errors = {};

    var emailid = data.email;
    var password = data.passwordd;

    const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regx.test(String(emailid).toLowerCase());

    if (emailid === "") {
        errors.emailid = "Please enter email id";
    } else if (!validEmail) {
        errors.emailid = "Please enter valid email id";
    }
    if (password === "") {
        errors.password = "Please enter password";
    }
    return errors;
}
