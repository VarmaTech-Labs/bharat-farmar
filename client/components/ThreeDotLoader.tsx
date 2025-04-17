import { useEffect, useState } from "react";
import { Animated, View } from "react-native";

// ✅ Loader
const ThreeDotLoader = () => {
  const [dotAnim1] = useState(new Animated.Value(0));
  const [dotAnim2] = useState(new Animated.Value(0));
  const [dotAnim3] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, { toValue: -4, duration: 300, delay, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      ).start();
    };

    animateDot(dotAnim1, 0);
    animateDot(dotAnim2, 100);
    animateDot(dotAnim3, 200);
  }, []);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" ,padding:7,marginTop:2}}>
      {[dotAnim1, dotAnim2, dotAnim3].map((anim, i) => (
        <Animated.View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 3,
            backgroundColor: "#fff",
            marginHorizontal: 3,
            transform: [{ translateY: anim }],
          }}
        />
      ))}
    </View>
  );
};

export default ThreeDotLoader;