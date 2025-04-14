import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ReviewCardProps {
  text: string;
  author: string;
}

const ReviewCard = ({ text, author }: ReviewCardProps) => {
  const isIOS = Platform.OS === 'ios';
  
  const CardBackground = ({ children }: { children: React.ReactNode }) => {
    if (isIOS) {
      return (
        <BlurView 
          intensity={40} 
          tint="light" 
          style={styles.reviewCard}
        >
          {children}
        </BlurView>
      );
    } else {
      // Fallback for Android (no blur, just semi-transparent bg)
      return (
        <View style={[styles.reviewCard, styles.reviewCardAndroid]}>
          {children}
        </View>
      );
    }
  };

  return (
    <CardBackground>
      <ThemedText style={styles.reviewText}>{text}</ThemedText>
      <ThemedText style={styles.reviewAuthor}>{author}</ThemedText>
    </CardBackground>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  reviewCard: {
    width: windowWidth * 0.8,  // 80% of screen width for better fit
    marginRight: 15,
    padding: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  reviewCardAndroid: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  reviewText: {
    color: '#21655A',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 15,
  },
  reviewAuthor: {
    color: '#21655A',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  }
});

export default ReviewCard;