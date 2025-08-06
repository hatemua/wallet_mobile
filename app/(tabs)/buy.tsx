import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, DollarSign, ArrowRight, Shield, Zap } from 'lucide-react-native';

export default function BuyTokens() {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  
  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, description: 'Instant purchase' },
    { id: 'bank', name: 'Bank Transfer', icon: DollarSign, description: '1-2 business days' },
  ];

  const quickAmounts = [25, 50, 100, 500];
  const dinlarRate = 1.5; // 1 USD = 1.5 DLR

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Buy DinLar Tokens</Text>
          <Text style={styles.subtitle}>Purchase tokens to use at participating merchants</Text>
        </View>

        {/* Current Rate */}
        <View style={styles.rateCard}>
          <View style={styles.rateHeader}>
            <Text style={styles.rateTitle}>Current Exchange Rate</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>
          <Text style={styles.rateValue}>1 USD = {dinlarRate} DLR</Text>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.sectionTitle}>Amount to Purchase</Text>
          <View style={styles.inputContainer}>
            <DollarSign size={20} color="#6B7280" style={styles.currencyIcon} />
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.currencyLabel}>USD</Text>
          </View>
          
          {amount ? (
            <View style={styles.conversionContainer}>
              <Text style={styles.conversionText}>
                You'll receive: {(parseFloat(amount) * dinlarRate).toFixed(2)} DLR
              </Text>
            </View>
          ) : null}

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmounts}>
            {quickAmounts.map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                style={styles.quickAmountButton}
                onPress={() => setAmount(quickAmount.toString())}
              >
                <Text style={styles.quickAmountText}>${quickAmount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedMethod === method.id && styles.selectedPaymentMethod
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.paymentMethodLeft}>
                <View style={[
                  styles.paymentMethodIcon,
                  selectedMethod === method.id && styles.selectedPaymentMethodIcon
                ]}>
                  <method.icon size={20} color={selectedMethod === method.id ? '#FFFFFF' : '#6B7280'} />
                </View>
                <View>
                  <Text style={[
                    styles.paymentMethodName,
                    selectedMethod === method.id && styles.selectedPaymentMethodName
                  ]}>
                    {method.name}
                  </Text>
                  <Text style={styles.paymentMethodDescription}>{method.description}</Text>
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedMethod === method.id && styles.selectedRadioButton
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Security Features */}
        <View style={styles.securityContainer}>
          <Text style={styles.sectionTitle}>Security Features</Text>
          <View style={styles.securityFeatures}>
            <View style={styles.securityFeature}>
              <Shield size={16} color="#10B981" />
              <Text style={styles.securityText}>256-bit SSL encryption</Text>
            </View>
            <View style={styles.securityFeature}>
              <Zap size={16} color="#10B981" />
              <Text style={styles.securityText}>Instant token delivery</Text>
            </View>
          </View>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity 
          style={[
            styles.purchaseButton,
            !amount && styles.purchaseButtonDisabled
          ]}
          disabled={!amount}
        >
          <Text style={styles.purchaseButtonText}>
            Purchase {amount ? `$${amount}` : ''} DinLar Tokens
          </Text>
          <ArrowRight size={20} color="#FFFFFF" />
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
  rateCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#6366F1',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  rateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34D399',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    color: '#34D399',
    fontWeight: '600',
  },
  rateValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 12,
  },
  currencyIcon: {
    marginRight: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  currencyLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  conversionContainer: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  conversionText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    textAlign: 'center',
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
    marginHorizontal: 4,
  },
  quickAmountText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  paymentContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedPaymentMethod: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedPaymentMethodIcon: {
    backgroundColor: '#3B82F6',
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  selectedPaymentMethodName: {
    color: '#3B82F6',
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  selectedRadioButton: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
  },
  securityContainer: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  securityFeatures: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '500',
  },
  purchaseButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
});