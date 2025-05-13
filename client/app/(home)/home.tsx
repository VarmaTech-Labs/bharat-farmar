import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import BannerAds from '@/admobs/BannerAds'
import { useAds } from '@/admobs/ads';
import {useSelector,useDispatch} from 'react-redux'
import { logout } from "@/store/userSlice";
import Header from '@/components/Header';
import BannerCarousel from '@/components/BannerCarousel';
 
import Schemes from '@/components/Schemes';
import MarketPrices from '@/components/MarketPrices';
import { useRouter } from 'expo-router';
import AgriculturalServicesGrid from '@/components/AgriculturalServicesGrid ';
import { Button } from 'react-native';

const { width, height } = Dimensions.get("window");

const Home = () => {
  const { showAd } = useAds();
  const {user} = useSelector((state:any)=>state.user)
  const dispatch  = useDispatch()
  const router = useRouter()

  console.log(user,"user login")

  const data = [
    { id: '1', title: 'Card 1', imageUrl: 'https://via.placeholder.com/400x250?text=Card+1' },
    { id: '2', title: 'Card 2', imageUrl: 'https://via.placeholder.com/400x250?text=Card+2' },
    { id: '3', title: 'Card 3', imageUrl: 'https://via.placeholder.com/400x250?text=Card+3' },
    { id: '4', title: 'Card 4', imageUrl: 'https://via.placeholder.com/400x250?text=Card+4' }
  ];

  return (
    <View style={styles.container}>
      <Header/>
        <BannerAds />

         <Button title="logout" onPress={() => dispatch(logout())} /> 
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        
        >
        <BannerCarousel/>
   
        <AgriculturalServicesGrid/>
        {/* <BannerAds /> */}
        <Schemes/>
        <MarketPrices/>
      </ScrollView>
        <BannerAds />
        </View>
)}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginBottom:70
  },
  scrollContent: {
    paddingBottom: 20, // Add some padding at the bottom
  },
});

export default Home;


  {/* <Button title="Show Interstitial Ad" onPress={() => showAd("interstitial")} />
      <Button title="Show Rewarded Ad" onPress={() => showAd("rewarded", () => console.log("Reward Earned!"))} />
      <Button title="logout" onPress={() => dispatch(logout())} />   */}
      {/* <Button title='navite' onPress={()=>router.replace("/market/777")}/> */}