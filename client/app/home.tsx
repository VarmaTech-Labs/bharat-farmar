import { View, Text, Button } from 'react-native'
import React from 'react'
import BannerAds from '@/admobs/BannerAds'
import { useAds } from '@/admobs/ads';

const home = () => {
  const { showAd } = useAds();
  return (
    <View>
      <Text>home</Text>
      <BannerAds />
      <Button title="Show Interstitial Ad" onPress={() => showAd("interstitial")} />
      <Button title="Show Rewarded Ad" onPress={() => showAd("rewarded", () => console.log("Reward Earned!"))} />
    </View>
  )
}

export default home