import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Image, Dimensions, TouchableOpacity, Platform, Modal, Pressable } from 'react-native';
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

// Service Detail Modal component
interface ServiceModalProps {
  visible: boolean;
  service: any;
  onClose: () => void;
}

function ServiceModal({ visible, service, onClose }: ServiceModalProps) {
  if (!service) return null;
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image source={service.image} style={styles.modalImage} />
          <ThemedText style={styles.modalTitle}>{service.title}</ThemedText>
          <ThemedText style={styles.modalDescription}>{service.description}</ThemedText>
          <ThemedText style={styles.modalPrice}>{service.price}</ThemedText>
          
          <Pressable style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>Close</ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function AboutUsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Services data for the carousel
  const services = [
    {
      id: 1,
      title: "Biscuit Hire",
      image: require('../assets/images/biscuir.jpg'),
      description: "Experience the thrill of riding our biscuit tubes! Perfect for groups and families looking for a fun water activity. Hold on tight as you're pulled behind one of our boats for an exciting ride across the water.",
      price: "Starting from $50 per 30 minutes",
    },
    {
      id: 2,
      title: "Jetski",
      image: require('../assets/images/Review.png'),
      description: "Explore the Bay of Plenty on one of our powerful jetskis. Freedom to create your own adventure with our well-maintained and reliable watercrafts. All safety equipment provided.",
      price: "Starting from $120 per hour",
    },
    {
      id: 3,
      title: "Tours",
      image: require('../assets/images/aqua.webp'),
      description: "Join our guided tours to discover hidden gems around the Bay of Plenty. Visit secluded beaches, see marine wildlife, and learn about the local history and ecosystem from our experienced guides.",
      price: "Starting from $180 per person",
    },
    {
      id: 4,
      title: "Wakeboard & Water Skis",
      image: require('../assets/images/skis.jpg'),
      description: "Whether you're a beginner or an experienced rider, our wakeboarding and water skiing equipment caters to all skill levels. Our instructors are available to help you learn or improve your technique.",
      price: "Starting from $60 per hour",
    },
    {
      id: 5,
      title: "Fishing",
      image: require('../assets/images/fishing.jpg'),
      description: "Join us for an unforgettable fishing experience in some of the best spots in the Bay of Plenty. All fishing gear provided. Our knowledgeable guides know exactly where to find the best catch.",
      price: "Starting from $150 per person",
    }
  ];

  const handleServicePress = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

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
                  onPress={() => handleServicePress(service)}
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

      {/* Service Detail Modal */}
      <ServiceModal 
        visible={modalVisible}
        service={selectedService}
        onClose={() => setModalVisible(false)}
      />
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
    width: 250,
    height: 180,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  serviceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  serviceTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066cc',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});