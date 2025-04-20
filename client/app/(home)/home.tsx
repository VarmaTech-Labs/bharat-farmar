import { View, Text, Button, Dimensions } from 'react-native'
import React from 'react'
import BannerAds from '@/admobs/BannerAds'
import { useAds } from '@/admobs/ads';
import {useSelector,useDispatch} from 'react-redux'
import { logout } from "@/store/userSlice";
import Header from '@/components/Header';
const { width, height } = Dimensions.get("window");

const home = () => {
  const { showAd } = useAds();
  // const {user} = useSelector((state)=>state.user)
  const dispatch  = useDispatch()

  // console.log(user,"user login")
  return (
    <View style={{backgroundColor:"red",height}}>
      <Header/>
      {/* <BannerAds />
      <Button title="Show Interstitial Ad" onPress={() => showAd("interstitial")} />
      <Button title="Show Rewarded Ad" onPress={() => showAd("rewarded", () => console.log("Reward Earned!"))} />
      <Button title="logout" onPress={() => dispatch(logout())} /> */}
    </View>
  )
}

export default home