export default class UserModel {
    constructor(name, email, password, type, id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }

    // static method to add new user
    static SingnUp(name,email, password,type) {
        const newUser = new UserModel(
            name,
            email,
            password,
            type
        );
        newUser.id = users.length+1;
        users.push(newUser);
        return newUser;
    }

    static SingnIn(email, password){
        const user = users.find((u)=> u.email==email && u.password==password);
        return user;
    }

}

var users = [
    {
        id: '1',
        name: 'Seller User',
        email: 'admin@ecom.com',
        password: 'password1',
        type: 'seller',
    },
]