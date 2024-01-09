// Please don't change the pre-written code
// Import the necessary modules here
import nodemailer from 'nodemailer';
import readline from 'readline';



const Solution = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'codingninjas2k16@gmail.com',
        pass:'slwvvlczduktvhdj'
    }
  });
  //2. Configure email content
  rl.question("please enter your mail ",async (input)=>{
  const mailOptions = {
    from: 'codingninjas2k16@gmail.com',
    to: input,
    subject: 'coding Ninjas',
    text: 'The world has enough coders; be a coding ninja!',
  };
  rl.close();

  // 3. Send the email
  try{
    const result = await transporter.sendMail(mailOptions);
    console.log("Success: Email sent to "+input);
  }catch(err){
    console.log('Email send failer with error: '+ err);
  }
  });
}

export default Solution;
