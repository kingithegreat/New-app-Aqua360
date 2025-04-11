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
      {/* Header */}
      <GlassBackground style={styles.header} intensity={80} noRadius={true}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backButtonText}>← Back</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>About Us</ThemedText>
          <View style={styles.placeholderRight} />
        </View>
      </GlassBackground>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.container}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.mainTitle}>About Us</ThemedText>
          </View>
          
          {/* About Us Content Section with white background */}
          <View style={styles.contentSection}>
            <ThemedText style={styles.contentText}>
              At AQUA 360°, we take great pride in being a family-owned business dedicated to offering thrilling jet ski hire in the stunning Bay of Plenty, where adventure meets breathtaking scenery. We genuinely value your feedback and insights on our social media platforms as they help us enhance your next experience.
            </ThemedText>
          </View>

          {/* Services Carousel Section */}
          <View style={styles.carouselSection}>
            <ThemedText style={styles.sectionTitle}>Our Services</ThemedText>
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
            <View style={styles.hourItem}>
              <ThemedText style={styles.hourTitle}>April to August</ThemedText>
              <ThemedText style={styles.hourText}>Bookings only</ThemedText>
            </View>
            <View style={styles.hourItem}>
              <ThemedText style={styles.hourTitle}>September to December</ThemedText>
              <ThemedText style={styles.hourText}>Tuesday to Friday: Bookings only</ThemedText>
              <ThemedText style={styles.hourText}>Saturday and Sunday: Open on-site at Pilot Bay Beach</ThemedText>
            </View>
            <View style={styles.hourItem}>
              <ThemedText style={styles.hourTitle}>January to March</ThemedText>
              <ThemedText style={styles.hourText}>Tuesday to Thursday: Bookings only</ThemedText>
              <ThemedText style={styles.hourText}>Friday to Sunday: Open on-site at Pilot Bay Beach</ThemedText>
            </View>
            <View style={styles.hourItem}>
              <ThemedText style={styles.hourTitle}>Christmas Period</ThemedText>
              <ThemedText style={styles.hourText}>December 19th to January 29th: Open every day on-site at Pilot Bay Beach 10 am till late</ThemedText>
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.locationSection}>
            <ThemedText style={styles.sectionTitle}>Find Us</ThemedText>
            <View style={styles.contactItem}>
              <ThemedText style={styles.contactLabel}>Address:</ThemedText>
              <ThemedText style={styles.contactText}>Pilot Bay (Mount End) Beach, Mount Maunganui</ThemedText>
            </View>
            <View style={styles.contactItem}>
              <ThemedText style={styles.contactLabel}>Email:</ThemedText>
              <ThemedText style={styles.contactText}>admin@aqua360.co.nz</ThemedText>
            </View>
            <View style={styles.contactItem}>
              <ThemedText style={styles.contactLabel}>Phone:</ThemedText>
              <ThemedText style={styles.contactText}>021 2782 360</ThemedText>
            </View>
          </View>

          {/* Safety Information */}
          <View style={styles.safetySection}>
            <ThemedText style={styles.sectionTitle}>Safety First</ThemedText>
            <ThemedText style={styles.safetyText}>
              Always plan water activities with safety in mind. At AQUA 360°, we focus on your safety 
              so you can focus on the fun!
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#52D6E2',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#52D6E2',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
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
  header: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'rgba(33, 101, 90, 1)', // Solid color matching buttons
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomLeftRadius: 20,  // Round the bottom corners
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  placeholderRight: {
    width: 50, // To balance the header layout
  },
  titleSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#21655A',
    textAlign: 'center',
  },
  contentSection: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333333',
  },
  carouselSection: {
    width: '100%',
    marginBottom: 20,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 15,
    color: '#21655A',
    paddingHorizontal: 10,
  },
  servicesCarousel: {
    width: '100%',
  },
  servicesContent: {
    paddingRight: 20,
  },
  serviceCard: {
    width: 200,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(33, 101, 90, 0.7)',
    padding: 10,
  },
  serviceTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  hoursSection: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hourItem: {
    marginBottom: 15,
  },
  hourTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#21655A',
    marginBottom: 5,
  },
  hourText: {
    fontSize: 15,
    color: '#555555',
    marginLeft: 10,
  },
  locationSection: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#21655A',
    width: 70,
  },
  contactText: {
    fontSize: 16,
    color: '#555555',
    flex: 1,
  },
  safetySection: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  safetyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
  },
});