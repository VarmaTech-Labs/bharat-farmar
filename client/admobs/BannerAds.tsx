import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const { width } = Dimensions.get("window");

const BANNER_AD_UNIT_ID: string = __DEV__ ? TestIds.BANNER : "YOUR_BANNER_AD_UNIT_ID";

const BannerAds: React.FC = ({position}:any) => {
  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={BANNER_AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    width: width,
    alignItems: "center",
    backgroundColor: "#f9f9f9", 
 
  },
});

export default BannerAds;
