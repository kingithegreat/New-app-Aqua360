import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Platform, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
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

export default function AIAssistScreen() {
  // State for handling the chat functionality
  const [userPrompt, setUserPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);

  // Function to handle AI response
  const handleAskAI = () => {
    if (!userPrompt.trim()) return;
    
    // Add user message to chat history
    const newUserMessage = { type: 'user' as const, message: userPrompt };
    setChatHistory(prevHistory => [...prevHistory, newUserMessage]);
    
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponseText = `Thank you for your question about "${userPrompt}". I'm here to help with any information about our water activities, bookings, or recommendations for your experience.`;
      setAiResponse(aiResponseText);
      
      // Add AI response to chat history
      const newAiMessage = { type: 'ai' as const, message: aiResponseText };
      setChatHistory(prevHistory => [...prevHistory, newAiMessage]);
      
      setIsLoading(false);
      setUserPrompt(''); // Clear input after sending
    }, 1500);
  };

  // Function to navigate to booking page
  const navigateToBooking = () => {
    router.push('/booking');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.mainTitle}>AI Assistant</ThemedText>
          </View>

          {/* Chat History Display */}
          <View style={styles.chatHistoryContainer}>
            {chatHistory.length === 0 ? (
              <View style={styles.emptyResponseContainer}>
                <ThemedText style={styles.emptyResponseText}>
                  Ask me anything about jet ski rentals, water activities, or booking information.
                </ThemedText>
              </View>
            ) : (
              chatHistory.map((message, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.messageBubble,
                    message.type === 'user' ? styles.userMessage : styles.aiMessage
                  ]}
                >
                  <ThemedText style={styles.messageText}>{message.message}</ThemedText>
                </View>
              ))
            )}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0078d4" />
                <ThemedText style={styles.loadingText}>AI is thinking...</ThemedText>
              </View>
            )}
          </View>
          
          {/* User Prompt Input */}
          <View style={styles.promptInputContainer}>
            <TextInput
              style={styles.promptInput}
              placeholder="Type your question here..."
              value={userPrompt}
              onChangeText={setUserPrompt}
              multiline
              numberOfLines={2}
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !userPrompt.trim() ? styles.sendButtonDisabled : null
              ]}
              onPress={handleAskAI}
              disabled={!userPrompt.trim() || isLoading}
            >
              <ThemedText style={styles.sendButtonText}>Send</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Confirm Button to navigate to booking */}
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={navigateToBooking}
          >
            <ThemedText style={styles.confirmButtonText}>Proceed to Booking</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#52D6E2',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#52D6E2',
  },
  titleSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatHistoryContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },
  emptyResponseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyResponseText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(200, 200, 200, 0.4)',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  promptInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
  },
  promptInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  confirmButton: {
    backgroundColor: '#00A86B',
    borderRadius: 10,
    paddingVertical: 14,
    marginVertical: 10,
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
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Glass effect styles
  glassEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    borderRadius: 15,
  },
  glassEffectAndroid: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
  },
  noRadius: {
    borderRadius: 0,
  },
});