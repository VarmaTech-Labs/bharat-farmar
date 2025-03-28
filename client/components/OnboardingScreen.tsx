import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Pressable,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onboardingData } from "@/constants/onboarding";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [active, setActive] = useState<number>(0);
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (active < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: active + 1 });
    } else {
      AsyncStorage.setItem("onboardingCompleted", "true");
      router.push("/login");
    }
  };

  const handlePrevious = () => {
    if (active > 0) {
      flatListRef.current?.scrollToIndex({ index: active - 1 });
    }
  };

  const skipHandler = () => {
    AsyncStorage.setItem("onboardingCompleted", "true");
    router.push("/login");
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActive(index);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.content}>
      <Image source={item.img} style={styles.image} resizeMode="contain" />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.skipBtn} onPress={skipHandler}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      />

      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <Pressable
            key={index}
            style={[styles.dot, active === index && styles.activeDot]}
            onPress={() => {
              flatListRef.current?.scrollToIndex({ index });
            }}
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
      
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {active === onboardingData.length - 1
              ? "Get Started"
              : onboardingData[active].buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: "#FDFDFD",
    paddingBottom: 50,
  },
  skipBtn: {
    top: 18,
    right: 20,
    zIndex: 10,
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 4,
    backgroundColor: "#00B86B",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  skipText: {
    color: "white",
    fontSize: 11,
    fontWeight: "400",
  },
  content: {
    width,
    height,
    alignItems: "center",
    backgroundColor: "#FDFDFD",
  },
  image: {
    width,
    height: width,
  },
  textWrapper: {
    paddingHorizontal: 10,
    margin: 22,
    marginTop: 35,
    alignItems: "center",

  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#6C6C6C",
    lineHeight: 22,

  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 8,

  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
  },
  activeDot: {
    backgroundColor: "#00B86B",
    width: 22,
    height: 7,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#00B86B",
    paddingVertical: 14,
    borderRadius: 30,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
