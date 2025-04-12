export const generateOtp = () =>{
   const otp = Math.round((Math.random()*999999)+1) 
   return otp
}


