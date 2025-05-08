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
  const {user} = useSelector((state:any)=>state.user)
  const dispatch  = useDispatch()

  console.log(user,"user login")

  const data = [
    { id: '1', title: 'Card 1', imageUrl: 'https://via.placeholder.com/400x250?text=Card+1' },
    { id: '2', title: 'Card 2', imageUrl: 'https://via.placeholder.com/400x250?text=Card+2' },
    { id: '3', title: 'Card 3', imageUrl: 'https://via.placeholder.com/400x250?text=Card+3' },
    { id: '4', title: 'Card 4', imageUrl: 'https://via.placeholder.com/400x250?text=Card+4' }
  ];

  return (
    <View style={{height}}>
      <Header/>
       <BannerAds />
      <Button title="Show Interstitial Ad" onPress={() => showAd("interstitial")} />
      <Button title="Show Rewarded Ad" onPress={() => showAd("rewarded", () => console.log("Reward Earned!"))} />
      <Button title="logout" onPress={() => dispatch(logout())} /> 
    </View>
  )
}

export default home