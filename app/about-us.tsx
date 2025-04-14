import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

// Service Card component for the carousel
interface ServiceCardProps {
  title: string;
  image: any;
  onPress?: () => void;
}

function ServiceCard({ title, image, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
      <Image source={image} style={styles.serviceImage} />
      <View style={styles.serviceOverlay}>
        <ThemedText style={styles.serviceTitle}>{title}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

export default function AboutUsScreen() {
  // Services data for the carousel
  const services = [
    {
      id: 1,
      title: "Biscuit Hire",
      image: require('../assets/images/biscuir.jpg'),
    },
    {
      id: 2,
      title: "Jetski",
      image: require('../assets/images/Review.png'),
    },
    {
      id: 3,
      title: "Tours",
      image: require('../assets/images/aqua.webp'),
    },
    {
      id: 4,
      title: "Wakeboard & Water Skis",
      image: require('../assets/images/skis.jpg'),
    },
    {
      id: 5,
      title: "Fishing",
      image: require('../assets/images/fishing.jpg'),
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.mainTitle}>About Us</ThemedText>
          </View>

          {/* About Us Content Section with white background */}
          <View style={styles.contentSection}>
            <ThemedText style={styles.contentText}>
              We take great pride in being a family-owned business dedicated to offering thrilling jet ski hire in the stunning Bay of Plenty, where adventure meets breathtaking scenery. We genuinely value your feedback and insights on our social media platforms as they help us enhance your next experience.
            </ThemedText>
          </View>

          {/* Services Carousel Section - Removed the header */}
          <View style={styles.carouselSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.servicesCarousel}
              contentContainerStyle={styles.servicesContent}
            >
              {services.map(service => (
                <ServiceCard 
                  key={service.id}
                  title={service.title}
                  image={service.image}
                />
              ))}
            </ScrollView>
          </View>

          {/* Operating Hours Section */}
          <View style={styles.hoursSection}>
            <ThemedText style={styles.sectionTitle}>Operating Hours</ThemedText>
            <View style={styles.hoursContainer}>
              <View style={styles.hourRow}>
                <ThemedText style={styles.dayText}>Monday - Friday</ThemedText>
                <ThemedText style={styles.timeText}>9:00 AM - 5:00 PM</ThemedText>
              </View>
              <View style={styles.hourRow}>
                <ThemedText style={styles.dayText}>Saturday & Sunday</ThemedText>
                <ThemedText style={styles.timeText}>10:00 AM - 6:00 PM</ThemedText>
              </View>
              <View style={styles.hourRow}>
                <ThemedText style={styles.dayText}>Public Holidays</ThemedText>
                <ThemedText style={styles.timeText}>10:00 AM - 4:00 PM</ThemedText>
              </View>
            </View>
          </View>

          {/* Contact Info Section */}
          <View style={styles.contactSection}>
            <ThemedText style={styles.sectionTitle}>Contact Us</ThemedText>
            <View style={styles.contactContent}>
              <ThemedText style={styles.contactText}>
                📍 Pilot Bay (Mount End) Beach, Mount Maunganui
              </ThemedText>
              <ThemedText style={styles.contactText}>
                📧 Email: admin@aqua360.co.nz
              </ThemedText>
              <ThemedText style={styles.contactText}>
                📱 Phone: 021 2782 360
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#52D6E2',  // Updated to match the home page background color
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#52D6E2',  // Updated to match the home page background color
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#52D6E2',  // Updated to match the home page background color
  },
  // Glass effect styles
  glassEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    borderRadius: 15,
  },
  glassEffectAndroid: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  noRadius: {
    borderRadius: 0,
  },
  titleSection: {
    width: '90%',
    marginTop: 30,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#21655A',
    textAlign: 'center',
  },
  contentSection: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  carouselSection: {
    width: '100%',
    marginTop: 30,
  },
  servicesCarousel: {
    width: '100%',
  },
  servicesContent: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  serviceCard: {
    width: windowWidth * 0.8,  // Increased from typical 0.6 or 0.7
    height: 220, // Increased from typical 180 or 200
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  serviceOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(33, 101, 90, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  serviceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#21655A',
    marginBottom: 15,
    textAlign: 'center',
  },
  hoursSection: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hoursContainer: {
    width: '100%',
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 16,
    color: '#21655A',
    fontWeight: '600',
  },
  contactSection: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactContent: {
    alignItems: 'flex-start',
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
});