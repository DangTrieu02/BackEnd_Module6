export const checkRegister = (req, res, next) => {
  try {
    let data = req.body;
    let { username, password, phoneNumber, fullName, confirmPassword } = data;
    if(!username || !password || !fullName || !phoneNumber || !confirmPassword) {
        res.status(209).json({message:"không được để trống trường dữ liệu"});
    }
    else if(confirmPassword!==password) {
        res.status(209).json({message:"mật khẩu và mật khẩu xác nhận không trùng khớp"});
    }
    else if(checkSpecialCharacterOrNumber(username)){
        res.status(209).json({message:"tên đăng nhập không được chứa ký tự đặc biệt"});
    }
    else if(!checkIfNumber(phoneNumber)){
        res.status(209).json({message:"số điện thoại phải là số"});
    }
    else if(checkSpecialCharacterOrNumber(fullName)){
        res.status(209).json({message:"họ và tên không được chứa ký tự đặc biệt !"});
    }
    else if(!checkLength(username)){
        res.status(209).json({message:"tên đăng nhập phải dài từ 6 đến 32 ký tự !"});
    }
    else if(!checkLength(fullName)){
        res.status(209).json({message:"họ và tên phải dài từ 6 đến 32 ký tự !"});
    }
    else if(!checkLength(password)){
        res.status(209).json({message:"mật khẩu phải dài từ 6 đến 32 ký tự !"});
    }
    else if(checkLengthPhoneNumber(phoneNumber)){
        res.status(209).json({message:"số điện thoại phải dài từ 9 đến 12 số !"});
    }
    else{
        next()
    }
  } catch (e) {
    console.log(e);
  }

};
function checkSpecialCharacter(str: string): boolean {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return regex.test(str);
}

function checkSpecialCharacterOrNumber(str) {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/]/;
    return regex.test(str);
}
function checkIfNumber(input) {
    return !isNaN(input);
}
function checkLength(input) {
    const minLength = 5;
    const maxLength = 32;  
    return input.length > minLength && input.length < maxLength;
}
function checkLengthPhoneNumber(input) {
    const minLength = 9;
    const maxLength = 12;  
    return input.length > minLength && input.length < maxLength;
}
