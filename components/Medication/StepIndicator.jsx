import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const StepIndicator = ({step}) => {
  const steps = [1, 2, 3, 4, 5]; // Define the number of steps
  const animationRefs = steps.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    steps.forEach((s, index) => {
      if (step === s) {
        Animated.timing(animationRefs[index], {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(animationRefs[index], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    });
  }, [step, animationRefs]);

  return (
    <View style={styles.container}>
      {steps.map((s, index) => {
        const widthInterpolation = animationRefs[index].interpolate({
          inputRange: [0, 1],
          outputRange: [20, 30], // Adjusted to keep it more rounded
        });
        const borderRadiusInterpolation = animationRefs[index].interpolate({
          inputRange: [0, 1],
          outputRange: [10, 15], // Adjusted to keep it more rounded
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.step,
              step >= s ? styles.activeStep : styles.inactiveStep,
              {
                width: widthInterpolation,
                borderRadius: borderRadiusInterpolation,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the steps within the container
    marginBottom: 20,
  },
  step: {
    height: 10,
    marginHorizontal: 5, // Minimal margin between steps
  },
  activeStep: {
    backgroundColor: '#469496', // Active step color
  },
  inactiveStep: {
    backgroundColor: '#cccccc', // Inactive step color
  },
});

export default StepIndicator;
