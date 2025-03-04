import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface VisibilityToggleIconProps {
  visible: boolean;
  onToggle: () => void;
}

const VisibilityToggleIcon: React.FC<VisibilityToggleIconProps> = ({
  visible,
  onToggle,
}) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.iconContainer}>
      <Icon
        name={visible ? "eye-outline" : "eye-off-outline"}
        size={22}
        color="#787A8D"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 7,
    alignSelf: "center",
  },
});

export default VisibilityToggleIcon;
