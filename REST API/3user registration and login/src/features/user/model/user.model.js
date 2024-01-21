// Please don't change the pre-written code
// Import the necessary modules here

const users = [];
let id = 0;
class UserSchema {
  constructor(name, email, password) {
    this.id = ++id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
export const addUser = (data) => {
  const { name, email, password } = data;
  const newUser = new UserSchema(name, email, password);
  users.push(newUser);
  return newUser;
  
  // Write your code here
  // data.id=users.length+1;
  // users.push(data);
  // return users
};
addUser({ name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" });

export const confirmLogin = (data) => {
  // Write your code here
  const {email, password} = data;
  let isValid=false;
  users.forEach((user)=>{
    if (user.email===email && user.password === password ) isValid = true;
  });
  return isValid;
  
  // const user = users.find((u)=> u.email==data.email && u.password==data.password);
  //   return user;
};

export const getAllUsers = () => {
  return users;
};
