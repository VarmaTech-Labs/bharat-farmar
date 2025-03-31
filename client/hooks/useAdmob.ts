// import { useEffect, useState } from "react";
// import {
//   BannerAd,
//   BannerAdSize,
//   InterstitialAd,
//   AdEventType,
//   RewardedAd,
//   RewardedAdEventType,
//   AdRequest,
//   TestIds,
// } from "react-native-google-mobile-ads";


// const BANNER_AD_UNIT_ID = TestIds.BANNER;
// const INTERSTITIAL_AD_UNIT_ID = TestIds.INTERSTITIAL;
// const REWARDED_AD_UNIT_ID = TestIds.REWARDED;

// const adRequest = new AdRequest({
//   keywords: [
//     "loan", "insurance", "credit card", "AI software", "web hosting", "cloud computing",
//     "organic farming", "tractor", "fertilizer", "Myntra fashion", "Udemy courses",
//     "mutual funds", "stock market", "B2B software", "business automation"
//   ],
//   requestNonPersonalizedAdsOnly: true, 
// });

// export const useBannerAd = () => {
//   const TopBanner = () => (
//     <BannerAd unitId={BANNER_AD_UNIT_ID} size={BannerAdSize.BANNER} requestOptions={adRequest} />
//   );

//   const BottomBanner = () => (
//     <BannerAd unitId={BANNER_AD_UNIT_ID} size={BannerAdSize.BANNER} requestOptions={adRequest} />
//   );

//   return { TopBanner, BottomBanner };
// };

// export const useInterstitialAd = () => {
//   const [adLoaded, setAdLoaded] = useState(false);
//   const interstitialAd = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, { requestOptions: adRequest });

//   useEffect(() => {
//     const loadAd = () => interstitialAd.load();

//     const adListener = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
//       setAdLoaded(true);
//     });

//     loadAd();
//     return () => adListener();
//   }, []);

//   const showAd = () => {
//     if (adLoaded) {
//       interstitialAd.show();
//       setAdLoaded(false);
//     }
//   };

//   return { showAd };
// };

// export const useRewardedAd = () => {
//   const [adLoaded, setAdLoaded] = useState(false);
//   const rewardedAd = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID, { requestOptions: adRequest });

//   useEffect(() => {
//     const loadAd = () => rewardedAd.load();

//     const adListener = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
//       setAdLoaded(true);
//     });

//     loadAd();
//     return () => adListener();
//   }, []);

//   const showAd = () => {
//     if (adLoaded) {
//       rewardedAd.show();
//       setAdLoaded(false);
//     }
//   };

//   return { showAd };
// };
