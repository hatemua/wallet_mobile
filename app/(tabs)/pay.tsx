import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QrCode, Scan, MapPin, Coffee, Utensils, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react-native';

export default function PayMerchants() {
  const [amount, setAmount] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  
  const nearbyMerchants = [
    { 
      id: 1, 
      name: 'Coffee Central', 
      type: 'Coffee Shop',
      distance: '0.2 miles',
      icon: Coffee,
      rating: 4.8,
      color: '#8B4513'
    },
    { 
      id: 2, 
      name: 'Pizza Palace', 
      type: 'Restaurant',
      distance: '0.5 miles',
      icon: Utensils,
      rating: 4.6,
      color: '#DC2626'
    },
    { 
      id: 3, 
      name: 'Fresh Market', 
      type: 'Grocery',
      distance: '0.3 miles',
      icon: ShoppingBag,
      rating: 4.7,
      color: '#059669'
    },
  ];

  const customAmounts = [5, 10, 20, 50];

  const adjustAmount = (increment) => {
    const currentAmount = parseFloat(amount) || 0;
    const newAmount = Math.max(0, currentAmount + increment);
    setAmount(newAmount.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pay with DinLar</Text>
          <Text style={styles.subtitle}>Scan QR code or select a nearby merchant</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#EFF6FF' }]}>
              <QrCode size={28} color="#3B82F6" />
            </View>
            <Text style={styles.quickActionText}>Scan QR Code</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#F0FDF4' }]}>
              <Scan size={28} color="#10B981" />
            </View>
            <Text style={styles.quickActionText}>Show My QR</Text>
          </TouchableOpacity>
        </View>

        {/* Amount Selection */}
        <View style={styles.amountContainer}>
          <Text style={styles.sectionTitle}>Payment Amount</Text>
          <View style={styles.amountInputContainer}>
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={() => adjustAmount(-1)}
            >
              <Minus size={20} color="#6B7280" />
            </TouchableOpacity>
            <View style={styles.amountDisplay}>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                textAlign="center"
              />
              <Text style={styles.currencyText}>DLR</Text>
            </View>
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={() => adjustAmount(1)}
            >
              <Plus size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.customAmounts}>
            {customAmounts.map((customAmount) => (
              <TouchableOpacity
                key={customAmount}
                style={styles.customAmountButton}
                onPress={() => setAmount(customAmount.toString())}
              >
                <Text style={styles.customAmountText}>{customAmount} DLR</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby Merchants */}
        <View style={styles.merchantsContainer}>
          <View style={styles.merchantsHeader}>
            <Text style={styles.sectionTitle}>Nearby Merchants</Text>
            <TouchableOpacity style={styles.locationButton}>
              <MapPin size={16} color="#3B82F6" />
              <Text style={styles.locationText}>Near you</Text>
            </TouchableOpacity>
          </View>
          
          {nearbyMerchants.map((merchant) => (
            <TouchableOpacity
              key={merchant.id}
              style={[
                styles.merchantItem,
                selectedMerchant === merchant.id && styles.selectedMerchantItem
              ]}
              onPress={() => setSelectedMerchant(merchant.id)}
            >
              <View style={[styles.merchantIcon, { backgroundColor: `${merchant.color}20` }]}>
                <merchant.icon size={24} color={merchant.color} />
              </View>
              <View style={styles.merchantDetails}>
                <Text style={styles.merchantName}>{merchant.name}</Text>
                <Text style={styles.merchantType}>{merchant.type} • {merchant.distance}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>★ {merchant.rating}</Text>
                </View>
              </View>
              <ArrowRight size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Pay Button */}
        <TouchableOpacity 
          style={[
            styles.payButton,
            (!amount || !selectedMerchant) && styles.payButtonDisabled
          ]}
          disabled={!amount || !selectedMerchant}
        >
          <Text style={styles.payButtonText}>
            {amount && selectedMerchant 
              ? `Pay ${amount} DLR` 
              : 'Select merchant and amount'
            }
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  quickActions: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  amountContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  amountButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountInput: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    minWidth: 100,
  },
  currencyText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 4,
  },
  customAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customAmountButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
    marginHorizontal: 4,
  },
  customAmountText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  merchantsContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  merchantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 4,
  },
  merchantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedMerchantItem: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  merchantIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  merchantDetails: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  merchantType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  payButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});