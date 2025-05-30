import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, View, Image, Dimensions, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { BlurView } from 'expo-blur';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ReviewCard from '@/components/ui/ReviewCard';

// Glass effect component
interface GlassBackgroundProps {
  style?: any;
  intensity?: number;
  children: React.ReactNode;
  noRadius?: boolean;
}

function GlassBackground({ style, intensity = 50, children, noRadius = false }: GlassBackgroundProps) {
  const isIOS = Platform.OS === 'ios';
  
  if (isIOS) {
    return (
      <BlurView 
        intensity={intensity} 
        tint="light" 
        style={[
          styles.glassEffect, 
          noRadius ? styles.noRadius : null,
          style
        ]}
      >
        {children}
      </BlurView>
    );
  } else {
    // Fallback for Android (no blur, just semi-transparent bg)
    return (
      <View 
        style={[
          styles.glassEffectAndroid, 
          noRadius ? styles.noRadius : null,
          style
        ]}
      >
        {children}
      </View>
    );
  }
}

export default function HomeScreen() {
  // Navigation handlers
  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };
  
  const handleAboutUs = () => {
    router.push('/about-us');
  };

  const handleWaiver = () => {
    router.push('/waiver');
  };

  const handleAiAssist = () => {
    router.push('/ai-assist');
  };

  const handleBooking = () => {
    router.push('/booking');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section - no rounded borders */}
      <GlassBackground style={styles.header} intensity={80} noRadius={true}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <ThemedText style={styles.signupButtonText}>Sign Up</ThemedText>
        </TouchableOpacity>
      </GlassBackground>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
      >
        <ThemedView style={styles.container}>
          {/* Enhanced About Us Button with Image */}
          <TouchableOpacity style={styles.aboutUsButton} onPress={handleAboutUs}>
            <Image 
              source={require('../../assets/images/about-us-image.webp')}
              style={styles.aboutUsImage}
            />
            <GlassBackground style={styles.aboutUsTextContainer} intensity={40}>
              <ThemedText style={styles.aboutUsButtonText}>About Us</ThemedText>
            </GlassBackground>
          </TouchableOpacity>

          {/* Action Buttons Section - Modern buttons without container */}
          <View style={styles.actionButtonsWrapper}>
            <TouchableOpacity style={styles.actionButton} onPress={handleWaiver}>
              <View style={styles.buttonIconPlaceholder}>
                <ThemedText style={styles.buttonIcon}>🏄</ThemedText>
              </View>
              <ThemedText style={styles.actionButtonText}>Waiver</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleAiAssist}>
              <View style={styles.buttonIconPlaceholder}>
                <ThemedText style={styles.buttonIcon}>🤖</ThemedText>
              </View>
              <ThemedText style={styles.actionButtonText}>AI Assistant</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleBooking}>
              <View style={styles.buttonIconPlaceholder}>
                <ThemedText style={styles.buttonIcon}>📅</ThemedText>
              </View>
              <ThemedText style={styles.actionButtonText}>Book Now</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Reviews Carousel Section - With white background and green text */}
          <ThemedView style={styles.carouselSection}>
            <ThemedText type="title" style={styles.sectionTitle}>Customer Reviews</ThemedText>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.reviewsCarousel}
              contentContainerStyle={styles.reviewsContent}
              snapToInterval={windowWidth * 0.85} // Snap to card width + margin
              decelerationRate="fast"
              pagingEnabled={false}
            >
              <ReviewCard 
                text="Amazing experience with Aqua 360! The jet ski tour was the highlight of our vacation. Highly recommended!" 
                author="Sarah M."
              />
              <ReviewCard 
                text="The staff was extremely helpful and the equipment was top-notch. Will definitely be coming back next summer!" 
                author="John D."
              />
              <ReviewCard 
                text="The Aqua Lounge was perfect for our family gathering. The kids loved the jet skis and the BBQ setup was great!" 
                author="Mike L."
              />
            </ScrollView>
            <View style={styles.paginationDots}>
              {[0, 1, 2].map((_, index) => (
                <View key={index} style={styles.paginationDot} />
              ))}
            </View>
          </ThemedView>
          
          {/* Flexible spacer to push footer to the bottom */}
          <View style={styles.flexSpacer} />
          
          {/* Footer Section - now scrollable with the content but pushed to bottom */}
          <GlassBackground style={styles.footer} intensity={90} noRadius={true}>
            <ThemedText style={styles.footerTitle}>Aqua 360°</ThemedText>
            <ThemedText style={styles.footerText}>
              Pilot Bay (Mount End) Beach, Mount Maunganui
            </ThemedText>
            <ThemedText style={styles.footerText}>
              Email: admin@aqua360.co.nz
            </ThemedText>
            <ThemedText style={styles.footerText}>
              Phone: 021 2782 360
            </ThemedText>
            <ThemedText style={styles.footerCopyright}>
              © 2025 Aqua 360° - All Rights Reserved
            </ThemedText>
          </GlassBackground>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#52D6E2',  // Solid color background throughout the app
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#52D6E2',  // Solid color background throughout the app
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 0, // Remove extra padding at bottom
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#52D6E2',  // Solid color background throughout the app
    paddingBottom: 0, // Remove padding at bottom
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%', // Ensure container fills at least the screen height
  },
  // Glass effect styles
  glassEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    borderRadius: 15, // Default rounded borders for middle elements
  },
  glassEffectAndroid: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15, // Default rounded borders for middle elements
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  noRadius: {
    borderRadius: 0, // Remove border radius for header and footer
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'rgba(33, 101, 90, 1)', // Changed to match buttons' solid color
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomLeftRadius: 20,  // Round the bottom left corner
    borderBottomRightRadius: 20, // Round the bottom right corner
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(29, 154, 150, 0.8)',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  signupButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  signupButtonText: {
    color: '#21655A',
    fontWeight: '700',
    fontSize: 16,
  },
  aboutUsButton: {
    width: '90%',
    height: windowHeight * 0.25, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#21655A', // Add background color in case image doesn't load
  },
  aboutUsImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover', // Move resizeMode here from the style
  },
  aboutUsTextContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  aboutUsButtonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  // New styles for action button layout
  actionButtonsWrapper: {
    width: '100%',
    flexDirection: 'column', // Stack buttons vertically
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: 'transparent', // Ensure wrapper is transparent
  },
  actionButton: {
    width: '100%',
    height: 90,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(33, 101, 90, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderLeftWidth: 6,
    borderLeftColor: '#52D6E2',
  },
  buttonIconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonIcon: {
    fontSize: 26,
    color: '#ffffff',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
    flex: 1,
  },
  // Review carousel styles
  carouselSection: {
    marginTop: 30,
    width: '100%',
    paddingBottom: 30,
    backgroundColor: 'transparent', // Make the background transparent
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#21655A',
  },
  reviewsCarousel: {
    width: '100%',
    maxHeight: 250,
  },
  reviewsContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  reviewCard: {
    width: windowWidth * 0.8,  // 80% of screen width for better fit
    marginRight: 15,
    padding: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#21655A',
    opacity: 0.6,
  },
  flexSpacer: {
    flex: 1, // This will push the footer to the bottom
    minHeight: 10, // Minimum height for some minimal spacing
  },
  footer: {
    width: '100%',
    backgroundColor: 'rgba(33, 101, 90, 1)', // Changed to match the exact same solid color as buttons
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.6)',
    marginTop: 0, // Remove margin at top
    marginBottom: 0, // Remove margin at bottom
    borderTopLeftRadius: 20,  // Round the top left corner
    borderTopRightRadius: 20, // Round the top right corner
  },
  footerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  footerCopyright: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 20,
    opacity: 0.8,
  },
});
