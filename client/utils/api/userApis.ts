import axiosClient from "../axiosClient";

export const userSignup = async(userData:any)=>{
  try{
      const res = await axiosClient(`/api/user/signup`,userData);
      if(res.data.status){
        return res?.data
      }
  }catch(err:any){
    console.log(err.response?.data?.message)
  }
}

