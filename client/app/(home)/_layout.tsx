import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    Animated,
    Pressable,
    GestureResponderEvent,
} from 'react-native';
import React, { useRef } from 'react';

const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
        case 'home':
            return 'home-outline';
        case 'service':
            return 'grid-outline';
        case 'search':
            return 'search-outline';
        case 'camera':
            return 'camera';
        case 'chat':
            return 'chatbubble-ellipses-outline';
        case 'news':
            return 'newspaper-outline';
        case 'profile':
            return 'person-outline';
        default:
            return 'help-circle-outline';
    }
};


type TabBarButtonProps = {
    children: React.ReactNode;
    onPress?: (event: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    accessibilityState?: { selected?: boolean };
};

const AnimatedTabButton: React.FC<TabBarButtonProps> = ({
    children,
    onPress,
}) => {
    const scale = useRef(new Animated.Value(1)).current;

    const animate = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.05,
                duration: 80,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Pressable
            onPress={(event) => {
                animate();
                onPress?.(event);
            }}
            android_ripple={{ color: 'transparent' }}
            style={{ flex: 1, alignItems: "center", paddingVertical: 4 }}
        >
            <Animated.View style={{ transform: [{ scale }] }}>
                {children}
            </Animated.View>
        </Pressable>
    );
};

export default function Layout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#00B86B',
                tabBarInactiveTintColor: '#B3B3B3',
                tabBarLabelStyle: {
                    fontSize: 10,
                    marginBottom: 0,
                },
                tabBarStyle: {
                    backgroundColor: '#fff',
                    height: 70,
                    borderTopWidth: 0,
                    position: 'absolute',
                    paddingTop:6
                    
                   
                },
                headerShown: false,
                tabBarButton: (props) => (
                    <AnimatedTabButton {...props} />
                ),
                tabBarIcon: ({ color }) => {
                    const iconName = getIconName(route.name);
                    const isCamera = route.name === 'camera';

                    if (isCamera) {
                        return (
                            <View style={styles.cameraButton}>
                                <Ionicons name={iconName} size={30} color="#fff" />
                            </View>
                        );
                    }

                    return <Ionicons name={iconName} size={20} color={color} />;
                },
            })}
            >
            <Tabs.Screen name="home" options={{ headerShown: false, title: 'Home' }} />
            <Tabs.Screen name="service" options={{ headerShown: false, title: 'Service' }} />
            <Tabs.Screen name="search" options={{ headerShown: false, title: 'Search' }} />
            <Tabs.Screen name="camera" options={{ headerShown: false, title: '' }} />
            <Tabs.Screen name="news" options={{ headerShown: false, title: 'News' }} />
            <Tabs.Screen name="chat" options={{ headerShown: false, title: 'Chat' }} />
            <Tabs.Screen name="profile" options={{ headerShown: false, title: 'Profile' }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    cameraButton: {
        top: -4,
        backgroundColor: '#00B86B',
        width: 60,
        height: 60,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        borderWidth: 4,
        borderColor: '#fff',
        zIndex: 55
    },
});
