import { View, Text, Button } from 'react-native'
import React from 'react'
import BannerAds from '@/admobs/BannerAds'
import { useAds } from '@/admobs/ads';
import {useSelector,useDispatch} from 'react-redux'
import { logout } from "@/store/userSlice";

const home = () => {
  const { showAd } = useAds();
  // const {user} = useSelector((state)=>state.user)
  const dispatch  = useDispatch()

  // console.log(user,"user login")
  return (
    <View>
      <Text>home</Text>
      <BannerAds />
      <Button title="Show Interstitial Ad" onPress={() => showAd("interstitial")} />
      <Button title="Show Rewarded Ad" onPress={() => showAd("rewarded", () => console.log("Reward Earned!"))} />
      <Button title="logout" onPress={() => dispatch(logout())} />
    </View>
  )
}

export default home