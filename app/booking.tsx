import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
  Platform,
  Alert,
  Text
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Colors } from '../constants/Colors';

export default function BookingScreen() {
  const router = useRouter();
  
  // State for date and time
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Service selection state
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Jet ski count (1-4)
  const [jetSkiCount, setJetSkiCount] = useState(1);
  
  // Add-ons selection
  const [addOns, setAddOns] = useState([
    { id: 1, name: 'Biscuit Ride', price: 60, selected: false, image: require('../assets/images/biscuir.jpg') },
    { id: 2, name: 'Wakeboard', price: 50, selected: false, image: require('../assets/images/skis.jpg') },
    { id: 3, name: 'Water Skis', price: 50, selected: false, image: require('../assets/images/skis.jpg') },
    { id: 4, name: 'Fishing Package', price: 60, selected: false, image: require('../assets/images/fishing.jpg') },
  ]);
  
  // Modal visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Booking details
  const [bookingReference, setBookingReference] = useState('');
  
  // Helper functions
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handlers
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowCalendar(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(Platform.OS === 'ios');
    setSelectedTime(currentTime);
  };
  
  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };
  
  const handleAddOnToggle = (id: number) => {
    setAddOns(addOns.map(addon => 
      addon.id === id 
        ? { ...addon, selected: !addon.selected } 
        : addon
    ));
  };
  
  const incrementJetSkis = () => {
    if (jetSkiCount < 4) {
      setJetSkiCount(jetSkiCount + 1);
    }
  };
  
  const decrementJetSkis = () => {
    if (jetSkiCount > 1) {
      setJetSkiCount(jetSkiCount - 1);
    }
  };
  
  const calculateTotal = () => {
    let total = 0;
    
    // Base price based on service
    if (selectedService === 'jetski') {
      total += 110 * jetSkiCount; // $110 per jet ski for 30 minutes
    } else if (selectedService === 'aqualounge') {
      total += 250; // $250 for 2-hour Aqua Lounge package
    } else if (selectedService === 'tours') {
      total += 195; // $195 per hour for guided tours
    }
    
    // Add-on costs
    addOns.forEach(addon => {
      if (addon.selected) {
        total += addon.price;
      }
    });
    
    return total;
  };
  
  const handleConfirmBooking = () => {
    if (!selectedService) {
      Alert.alert('Selection Required', 'Please select a service type.');
      return;
    }
    
    // Generate booking reference
    const ref = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingReference(ref);
    setShowConfirmation(true);
  };
  
  // Service card component
  const ServiceCard = ({ title, image, onPress, selected }: any) => (
    <TouchableOpacity
      style={[styles.serviceCard, selected && styles.selectedServiceCard]}
      onPress={onPress}
    >
      <Image source={image} style={styles.serviceImage} />
      <ThemedText style={styles.serviceTitle}>{title}</ThemedText>
    </TouchableOpacity>
  );
  
  // Add-on option component
  const AddOnOption = ({ item, selected, onToggle }: any) => (
    <TouchableOpacity
      style={[styles.addOnOption, selected && styles.selectedAddOn]}
      onPress={onToggle}
    >
      <View style={styles.addOnContent}>
        <Image source={item.image} style={styles.addOnImage} />
        <View style={styles.addOnInfo}>
          <ThemedText style={styles.addOnName}>{item.name}</ThemedText>
          <ThemedText style={styles.addOnPrice}>${item.price}</ThemedText>
        </View>
      </View>
      <View style={[styles.checkboxContainer, selected && styles.selectedCheckbox]}>
        {selected && <Ionicons name="checkmark" size={20} color="#fff" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ 
        title: 'Book Your Adventure',
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Date Selection */}
        <View style={styles.section}>
          <ThemedText type="heading2" style={styles.sectionTitle}>Select Date</ThemedText>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowCalendar(true)}
          >
            <ThemedText style={styles.dateText}>{formatDate(selectedDate)}</ThemedText>
            <Ionicons name="calendar" size={24} color={Colors.light.palette.secondary.main} />
          </TouchableOpacity>
        </View>
        
        {/* Time Selection */}
        <View style={styles.section}>
          <ThemedText type="heading2" style={styles.sectionTitle}>Select Time</ThemedText>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowTimePicker(true)}
          >
            <ThemedText style={styles.dateText}>{formatTime(selectedTime)}</ThemedText>
            <Ionicons name="time-outline" size={24} color={Colors.light.palette.secondary.main} />
          </TouchableOpacity>
        </View>
        
        {/* Service Selection */}
        <View style={styles.section}>
          <ThemedText type="heading2" style={styles.sectionTitle}>Select Service</ThemedText>
          <View style={styles.serviceContainer}>
            <ServiceCard
              title="Jet Skis"
              image={require('../assets/images/aqua.webp')}
              onPress={() => handleServiceSelect('jetski')}
              selected={selectedService === 'jetski'}
            />
            <ServiceCard
              title="Aqua Lounge"
              image={require('../assets/images/about-us-image.webp')}
              onPress={() => handleServiceSelect('aqualounge')}
              selected={selectedService === 'aqualounge'}
            />
            <ServiceCard
              title="Guided Tours"
              image={require('../assets/images/aqua.webp')}
              onPress={() => handleServiceSelect('tours')}
              selected={selectedService === 'tours'}
            />
          </View>
        </View>
        
        {/* Jet Ski Quantity (if jet ski is selected) */}
        {selectedService === 'jetski' && (
          <View style={styles.section}>
            <ThemedText type="heading2" style={styles.sectionTitle}>Number of Jet Skis</ThemedText>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={decrementJetSkis}
                disabled={jetSkiCount <= 1}
              >
                <Ionicons 
                  name="remove" 
                  size={24} 
                  color={jetSkiCount <= 1 ? '#ccc' : Colors.light.palette.secondary.main} 
                />
              </TouchableOpacity>
              <ThemedText type="heading2" style={styles.quantityText}>{jetSkiCount}</ThemedText>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={incrementJetSkis}
                disabled={jetSkiCount >= 4}
              >
                <Ionicons 
                  name="add" 
                  size={24} 
                  color={jetSkiCount >= 4 ? '#ccc' : Colors.light.palette.secondary.main} 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Add-ons Section */}
        {selectedService && (
          <View style={styles.section}>
            <ThemedText type="heading2" style={styles.sectionTitle}>Add-ons</ThemedText>
            <View style={styles.addOnContainer}>
              {addOns.map((addOn) => (
                <AddOnOption
                  key={addOn.id}
                  item={addOn}
                  selected={addOn.selected}
                  onToggle={() => handleAddOnToggle(addOn.id)}
                />
              ))}
            </View>
          </View>
        )}
        
        {/* Booking Summary */}
        {selectedService && (
          <View style={styles.section}>
            <ThemedText type="heading2" style={styles.sectionTitle}>Booking Summary</ThemedText>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Date:</ThemedText>
                <ThemedText style={styles.summaryValue}>{formatDate(selectedDate)}</ThemedText>
              </View>
              
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Time:</ThemedText>
                <ThemedText style={styles.summaryValue}>{formatTime(selectedTime)}</ThemedText>
              </View>
              
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Service:</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {selectedService === 'jetski' ? `Jet Skis (${jetSkiCount})` : 
                   selectedService === 'aqualounge' ? 'Aqua Lounge' : 'Guided Tour'}
                </ThemedText>
              </View>
              
              {addOns.some(addon => addon.selected) && (
                <>
                  <ThemedText style={styles.summaryLabel}>Add-ons:</ThemedText>
                  {addOns.filter(addon => addon.selected).map(addon => (
                    <View key={addon.id} style={styles.summaryAddon}>
                      <ThemedText style={styles.summaryAddonName}>- {addon.name}</ThemedText>
                      <ThemedText style={styles.summaryAddonPrice}>${addon.price}</ThemedText>
                    </View>
                  ))}
                </>
              )}
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <ThemedText type="heading3" style={styles.totalLabel}>Total:</ThemedText>
                <ThemedText type="heading3" style={styles.totalValue}>${calculateTotal()}</ThemedText>
              </View>
            </View>
          </View>
        )}
        
        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
          disabled={!selectedService}
        >
          <ThemedText style={styles.confirmButtonText}>Confirm Booking</ThemedText>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Date Picker */}
      {Platform.OS === 'ios' && showCalendar && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showCalendar}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText type="heading3">Select Date</ThemedText>
                <TouchableOpacity onPress={() => setShowCalendar(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                minimumDate={new Date()}
                maximumDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 days from now
              />
              <TouchableOpacity
                style={styles.confirmDateButton}
                onPress={() => setShowCalendar(false)}
              >
                <Text style={styles.confirmDateButtonText}>Confirm Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      
      {/* Time Picker */}
      {Platform.OS === 'ios' && showTimePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showTimePicker}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText type="heading3">Select Time</ThemedText>
                <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
                minuteInterval={15}
              />
              <TouchableOpacity
                style={styles.confirmDateButton}
                onPress={() => setShowTimePicker(false)}
              >
                <Text style={styles.confirmDateButtonText}>Confirm Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      
      {/* Android date picker */}
      {Platform.OS === 'android' && showCalendar && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
          maximumDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 days from now
        />
      )}
      
      {/* Android time picker */}
      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
          minuteInterval={15}
        />
      )}
      
      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showConfirmation}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <Image
              source={require('../assets/images/splash-icon.png')}
              style={styles.confirmationImage}
              resizeMode="contain"
            />
            
            <ThemedText type="heading2" style={styles.confirmationTitle}>
              Booking Confirmed!
            </ThemedText>
            
            <ThemedText style={styles.confirmationMessage}>
              Thank you for booking with Aqua 360°. Your adventure awaits!
            </ThemedText>
            
            <View style={styles.referenceContainer}>
              <ThemedText style={styles.referenceLabel}>Booking Reference:</ThemedText>
              <ThemedText type="heading3" style={styles.referenceNumber}>{bookingReference}</ThemedText>
            </View>
            
            <View style={styles.confirmationDetails}>
              <ThemedText style={styles.confirmationDetail}>
                <Ionicons name="calendar" size={16} color={Colors.light.palette.secondary.main} /> {formatDate(selectedDate)}
              </ThemedText>
              <ThemedText style={styles.confirmationDetail}>
                <Ionicons name="time" size={16} color={Colors.light.palette.secondary.main} /> {formatTime(selectedTime)}
              </ThemedText>
              <ThemedText style={styles.confirmationDetail}>
                <Ionicons name="cash" size={16} color={Colors.light.palette.secondary.main} /> Total: ${calculateTotal()}
              </ThemedText>
            </View>
            
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setShowConfirmation(false);
                router.replace('/');
              }}
            >
              <ThemedText style={styles.doneButtonText}>Done</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.palette.primary.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    color: Colors.light.palette.secondary.main,
    marginBottom: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.surfaceVariant,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600', // Increased from 500 to 600 for better readability
    color: Colors.light.palette.neutral[900],
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  serviceCard: {
    width: '30%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: Colors.light.surfaceVariant,
  },
  selectedServiceCard: {
    borderColor: Colors.light.palette.primary.main,
  },
  serviceImage: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  serviceTitle: {
    padding: 8,
    textAlign: 'center',
    fontWeight: '700', // Increased from 600 to 700 for better visibility
    fontSize: 16,
    color: Colors.light.palette.neutral[900],
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 24,
  },
  addOnContainer: {
    gap: 12,
  },
  addOnOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.surfaceVariant,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAddOn: {
    borderColor: Colors.light.palette.primary.main,
  },
  addOnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOnImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  addOnInfo: {
    flex: 1,
  },
  addOnName: {
    fontWeight: '700', // Changed from '500' to '700' for bolder text
    fontSize: 18, // Increased from 16 to 18
    color: Colors.light.palette.neutral[900], // Added explicit color with high contrast
  },
  addOnPrice: {
    color: Colors.light.palette.secondary.main,
    marginTop: 4,
    fontWeight: '600', // Changed from '500' to '600'
    fontSize: 16, // Added explicit font size
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.palette.neutral[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckbox: {
    backgroundColor: Colors.light.palette.primary.main,
    borderColor: Colors.light.palette.primary.main,
  },
  summaryCard: {
    backgroundColor: Colors.light.surfaceVariant,
    padding: 16,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontWeight: '600', // Increased from 500 to 600
    fontSize: 16,
    color: Colors.light.palette.neutral[900],
  },
  summaryValue: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '600', // Increased from 500 to 600
    color: Colors.light.palette.neutral[800],
  },
  summaryAddon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginBottom: 4,
  },
  summaryAddonName: {
    color: Colors.light.palette.neutral[800],
    fontSize: 15,
    fontWeight: '500', // Added font weight
  },
  summaryAddonPrice: {
    color: Colors.light.palette.neutral[800],
    fontWeight: '600', // Increased from 500 to 600
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.palette.neutral[400],
    marginVertical: 12,
  },
  totalLabel: {
    fontWeight: '700', // Increased from 600 to 700
    color: Colors.light.palette.neutral[900], // Added explicit dark color for better contrast
  },
  totalValue: {
    color: Colors.light.palette.secondary.main,
    fontWeight: '700', // Increased from 600 to 700
    fontSize: 18, // Increased from default to 18
  },
  confirmButton: {
    backgroundColor: Colors.light.palette.secondary.main,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  confirmButtonText: {
    color: Colors.light.palette.secondary.contrast,
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  confirmDateButton: {
    backgroundColor: Colors.light.palette.secondary.main,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  confirmDateButtonText: {
    color: Colors.light.palette.secondary.contrast,
    fontWeight: '600',
    fontSize: 16,
  },
  confirmationModal: {
    width: '90%',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  confirmationImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  confirmationTitle: {
    color: Colors.light.palette.secondary.main,
    marginBottom: 8,
  },
  confirmationMessage: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    fontWeight: '500', // Added font weight
    color: Colors.light.palette.neutral[800],
  },
  referenceContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  referenceLabel: {
    fontSize: 14,
    fontWeight: '500', // Added font weight
    color: Colors.light.palette.neutral[800],
    marginBottom: 4,
  },
  referenceNumber: {
    color: Colors.light.palette.secondary.main,
    fontWeight: '700', // Increased font weight
    fontSize: 18, // Increased font size
  },
  confirmationDetails: {
    width: '100%',
    gap: 8,
    marginBottom: 24,
  },
  confirmationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 16, // Increased from 15 to 16
    fontWeight: '500', // Added font weight
    color: Colors.light.palette.neutral[800],
  },
  doneButton: {
    backgroundColor: Colors.light.palette.primary.main,
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 8,
  },
  doneButtonText: {
    color: Colors.light.palette.primary.contrast,
    fontWeight: '600',
    fontSize: 16,
  },
});