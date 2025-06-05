import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import tw from "twrnc";
// Replace with proper React Native SVG imports
import { CheckCircle, AlertCircle } from "lucide-react-native";

type FeedbackBannerProps = {
  type: "success" | "error" | "info";
  message: string;
  onClose?: () => void;
  autoHide?: boolean;
  duration?: number;
  visible: boolean;
};

const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  type,
  message,
  onClose,
  autoHide = true,
  duration = 5000,
  visible,
}) => {
  const slideAnim = React.useRef(new Animated.Value(-100)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Slide down and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide timer
      let timer: NodeJS.Timeout;
      if (autoHide && onClose) {
        timer = setTimeout(() => {
          handleClose();
        }, duration);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    } else if (shouldRender) {
      // Slide up and fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, autoHide, duration, onClose, shouldRender]);

  const handleClose = () => {
    // Animate out first, then call onClose
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShouldRender(false);
      if (onClose) onClose();
    });
  };

  const getBannerStyles = () => {
    switch (type) {
      case "success":
        return {
          container: tw`bg-green-50 border-l-4 border-green-500`,
          text: tw`text-green-700`,
          icon: <CheckCircle size={22} color="#10B981" />,
        };
      case "error":
        return {
          container: tw`bg-red-50 border-l-4 border-red-500`,
          text: tw`text-red-700`,
          icon: <AlertCircle size={22} color="#EF4444" />,
        };
      case "info":
        return {
          container: tw`bg-blue-50 border-l-4 border-blue-500`,
          text: tw`text-blue-700`,
          icon: <AlertCircle size={22} color="#3B82F6" />,
        };
      default:
        return {
          container: tw`bg-gray-50 border-l-4 border-gray-500`,
          text: tw`text-gray-700`,
          icon: <AlertCircle size={22} color="#6B7280" />,
        };
    }
  };

  const styles = getBannerStyles();

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        tw`absolute top-0 left-0 right-0 z-50`,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View
        style={[
          tw`p-4 rounded-b flex-row items-center shadow-lg`,
          styles.container,
        ]}
      >
        <View style={tw`mr-3`}>{styles.icon}</View>
        <View style={tw`flex-1`}>
          <Text style={[tw`font-medium`, styles.text]}>{message}</Text>
        </View>
        {onClose && (
          <TouchableOpacity onPress={handleClose} style={tw`ml-2`}>
            <Text style={[styles.text, tw`text-xl font-bold`]}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default FeedbackBanner;
