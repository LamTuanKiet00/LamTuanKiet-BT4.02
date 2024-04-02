let { check } = require('express-validator');
let util = require('node:util')
let option = {
    password: {
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    },
    username: {
        max: 42,
        min: 6
    }
}
module.exports = {
    checkChain: function () {
        return [
            check("password", util.format("password phai dai it nhat %d ki tu, %d chu in hoa, %d chu thuong,%d so", option.password.minLength, option.password.minSymbols, option.password.minUppercase, option.password.minLowercase, option.password.minNumbers)).isStrongPassword(option.password),
            check('email', "email dung dinh dang").isEmail(),
            check('username', "user phai dai tu %d den %d ki tu").isLength(option.username),
            check('role', "role khong hop le").isIn(["user", "admin", "publisher"])
        ]
    },
    forgotPasswordValidator: [
        check('email', 'Email không hợp lệ').isEmail()
    ],
    resetPasswordValidator: [
        check("password", util.format("Mật khẩu phải có ít nhất %d ký tự, bao gồm %d chữ số, %d chữ thường, %d chữ in hoa, và %d ký tự đặc biệt", option.password.minLength, option.password.minNumbers, option.password.minLowercase, option.password.minUppercase, option.password.minSymbols))
            .isStrongPassword(option.password)
    ],
}