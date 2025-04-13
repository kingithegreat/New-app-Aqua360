import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  Dimensions
} from 'react-native';
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
  tint?: 'light' | 'dark' | 'default';
}

function GlassBackground({ style, intensity = 50, children, noRadius = false, tint = 'light' }: GlassBackgroundProps) {
  const isIOS = Platform.OS === 'ios';
  
  if (isIOS) {
    return (
      <BlurView 
        intensity={intensity} 
        tint={tint}
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
          tint === 'dark' ? styles.darkGlassAndroid : null,
          style
        ]}
      >
        {children}
      </View>
    );
  }
}

// Chat message component
interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

function ChatMessage({ text, isUser }: ChatMessageProps) {
  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.aiMessageContainer]}>
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <ThemedText style={[styles.messageText, isUser ? styles.userMessageText : styles.aiMessageText]}>
          {text}
        </ThemedText>
      </View>
    </View>
  );
}

// Quick action button component
interface QuickActionProps {
  label: string;
  onPress: () => void;
}

function QuickActionButton({ label, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
      <ThemedText style={styles.quickActionText}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

export default function AIAssistScreen() {
  const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>([
    { text: "Hello! I'm Aqua AI, your virtual assistant. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Function to add a new message
  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prevMessages => [...prevMessages, { text, isUser }]);
    
    // If it's a user message, simulate AI response
    if (isUser) {
      setTimeout(() => {
        const responses = [
          "I can help you with information about our jet ski rentals and water activities.",
          "Our Aqua Lounge is available for bookings. Would you like more information?",
          "The weather forecast shows perfect conditions for water sports today!",
          "You can book online or through our mobile app. Would you like me to guide you through the process?",
          "Our most popular package includes a 2-hour jet ski rental with all necessary safety equipment."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prevMessages => [...prevMessages, { text: randomResponse, isUser: false }]);
        
        // Scroll to the bottom again after AI response
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 1000);
    }
    
    // Clear input and scroll to bottom
    setInputText('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Quick action responses
  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'bookings':
        addMessage("I'd like to check availability for jet ski rentals", true);
        break;
      case 'pricing':
        addMessage("What are your pricing options?", true);
        break;
      case 'location':
        addMessage("Where are you located?", true);
        break;
      case 'waiver':
        addMessage("Can you help me with the waiver process?", true);
        break;
    }
  };

  // Handle user message submission
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    addMessage(inputText.trim(), true);
    Keyboard.dismiss();
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: 'AI Assistant',
        headerStyle: {
          backgroundColor: '#3E85C7', // Changed from #52D6E2 to a deeper blue
        },
        headerTintColor: '#FFFFFF' // Changed from #21655A to white for better contrast
      }} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.innerContainer}>
            {/* Title Section */}
            <View style={styles.titleSection}>
              <ThemedText style={styles.assistantTitle}>Aqua 360° Virtual Assistant</ThemedText>
              <ThemedText style={styles.assistantSubtitle}>
                Ask me anything about bookings, activities, or information about our services!
              </ThemedText>
            </View>

            {/* Chat Section */}
            <GlassBackground style={styles.chatContainer} intensity={50} tint="dark">
              <ScrollView
                ref={scrollViewRef}
                style={styles.chatScrollView}
                contentContainerStyle={styles.chatContent}
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    text={message.text} 
                    isUser={message.isUser} 
                  />
                ))}
              </ScrollView>
            </GlassBackground>
            
            {/* Quick Actions */}
            <View style={styles.quickActionsContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickActionsContent}
              >
                <QuickActionButton 
                  label="Check Bookings" 
                  onPress={() => handleQuickAction('bookings')} 
                />
                <QuickActionButton 
                  label="Pricing" 
                  onPress={() => handleQuickAction('pricing')} 
                />
                <QuickActionButton 
                  label="Location" 
                  onPress={() => handleQuickAction('location')} 
                />
                <QuickActionButton 
                  label="Waiver Help" 
                  onPress={() => handleQuickAction('waiver')} 
                />
              </ScrollView>
            </View>
            
            {/* Input Section */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type your message here..."
                placeholderTextColor="#9DB2D6"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity 
                style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]} 
                onPress={handleSendMessage}
                disabled={inputText.trim() === ''}
              >
                <ThemedText style={styles.sendButtonText}>Send</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Disclaimer */}
            <View style={styles.disclaimerContainer}>
              <ThemedText style={styles.disclaimerText}>
                AI responses are simulated for demonstration purposes.
              </ThemedText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3E85C7', // Changed from #52D6E2 to a deeper blue
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
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
  darkGlassAndroid: {
    backgroundColor: 'rgba(15, 40, 70, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  noRadius: {
    borderRadius: 0,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  assistantTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Changed from #21655A to white
    marginBottom: 6,
  },
  assistantSubtitle: {
    fontSize: 14,
    color: '#E3F1FF', // Changed from #21655A to a light blue
    textAlign: 'center',
    opacity: 0.9,
  },
  chatContainer: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: 'rgba(15, 40, 70, 0.4)', // Darker background for chat area
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  chatScrollView: {
    flex: 1,
  },
  chatContent: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userBubble: {
    backgroundColor: '#1E5C9B', // Changed from #21655A to a darker blue
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: '#3E85C7',
  },
  aiBubble: {
    backgroundColor: '#F5F9FF', // Changed from white to very light blue
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#D0E1F9',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#0F2846',  // Changed from #333333 to a darker blue
  },
  quickActionsContainer: {
    marginBottom: 15,
  },
  quickActionsContent: {
    paddingHorizontal: 5,
  },
  quickActionButton: {
    backgroundColor: 'rgba(15, 40, 70, 0.75)', // Changed from #21655A to dark blue
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(98, 163, 219, 0.5)',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F9FF', // Changed from white to very light blue
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#D0E1F9',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    color: '#0F2846', // Changed from #333333 to a darker blue
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#1E5C9B', // Changed from #21655A to a darker blue
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#9DB2D6', // Changed from #a0a0a0 to a blueish gray
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  disclaimerContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#E3F1FF', // Changed from #21655A to light blue
    opacity: 0.8,
    fontStyle: 'italic',
  },
});