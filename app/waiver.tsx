import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
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

export default function WaiverScreen() {
  const [agreed, setAgreed] = React.useState(false);

  const toggleAgreed = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = () => {
    // In a real app, this would submit the waiver agreement
    if (agreed) {
      alert('Waiver submitted successfully!');
    } else {
      alert('Please agree to the waiver terms before submitting.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Waiver Form',
        headerStyle: {
          backgroundColor: '#52D6E2',
        },
        headerTintColor: '#21655A'
      }} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.container}>
            {/* Title Section */}
            <View style={styles.titleSection}>
              <ThemedText style={styles.mainTitle}>Water Sports Waiver</ThemedText>
            </View>

            {/* Image Banner */}
            <View style={styles.imageBanner}>
              <Image 
                source={require('../assets/images/wavier image.jpg')}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
            
            {/* Waiver Content Section with white background */}
            <View style={styles.contentSection}>
              <ThemedText style={styles.sectionTitle}>Release of Liability</ThemedText>
              
              <ThemedText style={styles.contentText}>
                I, the undersigned, acknowledge that water sports activities including but not limited to jet skiing,
                wakeboarding, water skiing, and tubing involve inherent risks. By participating in activities offered by Aqua 360°,
                I voluntarily agree to assume all risks of personal injury, death, and property damage.
              </ThemedText>
              
              <ThemedText style={styles.contentText}>
                I hereby release, discharge, and covenant not to sue Aqua 360°, its owners, officers, employees,
                and agents from all liability, claims, demands, losses, or damages caused or alleged to be caused
                by the negligence of Aqua 360° or otherwise.
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>Medical Certification</ThemedText>
              
              <ThemedText style={styles.contentText}>
                I certify that I am in good health with no physical defects that might interfere with my ability
                to participate safely in water sports activities. I agree to abide by all rules and instructions
                given by Aqua 360° staff.
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>Assumption of Risk</ThemedText>
              
              <ThemedText style={styles.contentText}>
                I acknowledge that water sports are physically demanding and potentially dangerous.
                I understand that injuries may occur due to collisions, weather conditions, equipment failures,
                or my own actions. I am participating at my own risk and responsibility.
              </ThemedText>
              
              <View style={styles.agreementSection}>
                <TouchableOpacity 
                  style={styles.checkboxContainer} 
                  onPress={toggleAgreed}
                >
                  <View style={[styles.checkbox, agreed ? styles.checkboxChecked : null]}>
                    {agreed && <View style={styles.checkmark} />}
                  </View>
                  <ThemedText style={styles.checkboxLabel}>
                    I have read, understand, and agree to the terms above
                  </ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.submitButton, !agreed && styles.submitButtonDisabled]}
                  onPress={handleSubmit}
                  disabled={!agreed}
                >
                  <ThemedText style={styles.submitButtonText}>Submit Waiver</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Additional Information */}
            <View style={styles.additionalInfo}>
              <ThemedText style={styles.footnoteText}>
                This digital waiver has the same legal validity as a physical signed document.
                For questions, please contact our staff at admin@aqua360.co.nz or call 021 2782 360.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
  imageBanner: {
    width: '90%',
    height: 180,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#21655A',
    marginTop: 15,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 15,
  },
  agreementSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#21655A',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#21655A',
  },
  checkmark: {
    width: 12,
    height: 7,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    transform: [{ rotate: '-45deg' }],
    marginTop: -2,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#21655A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  additionalInfo: {
    width: '90%',
    marginTop: 10,
    marginBottom: 30,
  },
  footnoteText: {
    fontSize: 14,
    color: '#21655A',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});