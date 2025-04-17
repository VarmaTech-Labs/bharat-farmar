export const generateOtp = () =>{
   const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
   return otp
}


