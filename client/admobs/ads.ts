import { useEffect, useRef, useState } from "react";
import { 
  InterstitialAd, 
  RewardedAd, 
  AdEventType, 
  RewardedAdEventType, 
  TestIds 
} from "react-native-google-mobile-ads";

const INTERSTITIAL_AD_UNIT_ID = __DEV__ ? TestIds.INTERSTITIAL : "YOUR_INTERSTITIAL_AD_UNIT_ID";
const REWARDED_AD_UNIT_ID = __DEV__ ? TestIds.REWARDED : "YOUR_REWARDED_AD_UNIT_ID";

export const useAds = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedLoaded, setRewardedLoaded] = useState(false);
  
  const interstitialAd = useRef(
    InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    })
  ).current;

  const rewardedAd = useRef(
    RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    })
  ).current;

  useEffect(() => {
    // Load Interstitial Ad
    const loadInterstitial = () => {
      console.log("Loading Interstitial Ad...");
      interstitialAd.load();
    };

    interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log("Interstitial Ad Loaded");
      setInterstitialLoaded(true);
    });

    interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log("Interstitial Ad Failed to Load:", error);
      setTimeout(loadInterstitial, 5000); // Retry after 5 seconds
    });

    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("Interstitial Ad Closed, Reloading...");
      setInterstitialLoaded(false);
      loadInterstitial();
    });

    loadInterstitial();

    // Load Rewarded Ad
    const loadRewarded = () => {
      console.log("Loading Rewarded Ad...");
      rewardedAd.load();
    };

    rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log("Rewarded Ad Loaded");
      setRewardedLoaded(true);
    });

    rewardedAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log("Rewarded Ad Failed to Load:", error);
      setTimeout(loadRewarded, 5000); // Retry after 5 seconds
    });

    rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("Rewarded Ad Closed, Reloading...");
      setRewardedLoaded(false);
      loadRewarded();
    });

    loadRewarded();

    return () => {
      interstitialAd.removeAllListeners();
      rewardedAd.removeAllListeners();
    };
  }, []);

  const showAd = (type: "interstitial" | "rewarded", onRewardEarned?: () => void) => {
    if (type === "interstitial") {
      if (interstitialLoaded) {
        interstitialAd.show();
        setInterstitialLoaded(false);
      } else {
        console.log("Interstitial Ad is not loaded yet.");
      }
    } else if (type === "rewarded") {
      if (rewardedLoaded) {
        rewardedAd.show();
        rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
          console.log("User Earned Reward");
          onRewardEarned?.();
        });
        setRewardedLoaded(false);
      } else {
        console.log("Rewarded Ad is not loaded yet.");
      }
    }
  };

  return { showAd, interstitialLoaded, rewardedLoaded };
};
