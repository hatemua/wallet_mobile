import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar, TrendingUp } from 'lucide-react-native';

export default function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'payments', name: 'Payments' },
    { id: 'purchases', name: 'Purchases' },
    { id: 'received', name: 'Received' },
  ];

  const transactions = [
    {
      id: 1,
      type: 'payment',
      merchant: 'Coffee Central',
      category: 'Food & Drink',
      amount: -5.50,
      date: '2025-01-27',
      time: '2:30 PM',
      status: 'completed'
    },
    {
      id: 2,
      type: 'purchase',
      merchant: 'Token Purchase',
      category: 'Purchase',
      amount: +100.00,
      date: '2025-01-26',
      time: '10:15 AM',
      status: 'completed'
    },
    {
      id: 3,
      type: 'payment',
      merchant: 'Pizza Palace',
      category: 'Food & Drink',
      amount: -12.75,
      date: '2025-01-25',
      time: '7:45 PM',
      status: 'completed'
    },
    {
      id: 4,
      type: 'payment',
      merchant: 'Fresh Market',
      category: 'Grocery',
      amount: -25.30,
      date: '2025-01-24',
      time: '3:20 PM',
      status: 'completed'
    },
    {
      id: 5,
      type: 'received',
      merchant: 'Cashback Reward',
      category: 'Reward',
      amount: +2.15,
      date: '2025-01-24',
      time: '3:25 PM',
      status: 'completed'
    },
  ];

  const weeklySpent = 43.55;
  const monthlySpent = 187.20;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Transaction History</Text>
          <Text style={styles.subtitle}>Track your DinLar spending and earnings</Text>
        </View>

        {/* Spending Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Calendar size={20} color="#3B82F6" />
            </View>
            <Text style={styles.summaryLabel}>This Week</Text>
            <Text style={styles.summaryAmount}>{weeklySpent.toFixed(2)} DLR</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <TrendingUp size={20} color="#10B981" />
            </View>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryAmount}>{monthlySpent.toFixed(2)} DLR</Text>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search transactions..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
          contentContainerStyle={styles.filterTabsContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterTab,
                selectedFilter === filter.id && styles.selectedFilterTab
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === filter.id && styles.selectedFilterTabText
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          {transactions.map((transaction) => (
            <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                {transaction.type === 'payment' ? (
                  <ArrowUpRight size={20} color="#EF4444" />
                ) : transaction.type === 'purchase' ? (
                  <ArrowDownLeft size={20} color="#3B82F6" />
                ) : (
                  <ArrowDownLeft size={20} color="#10B981" />
                )}
              </View>
              
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                <Text style={styles.transactionDateTime}>
                  {transaction.date} • {transaction.time}
                </Text>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { 
                    color: transaction.amount > 0 ? '#10B981' : 
                          transaction.type === 'purchase' ? '#3B82F6' : '#EF4444' 
                  }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount).toFixed(2)} DLR
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: transaction.status === 'completed' ? '#F0FDF4' : '#FEF3F2' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: transaction.status === 'completed' ? '#10B981' : '#EF4444' }
                  ]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  summaryContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    marginBottom: 16,
  },
  filterTabsContent: {
    paddingHorizontal: 24,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedFilterTab: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedFilterTabText: {
    color: '#FFFFFF',
  },
  transactionsContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  transactionDateTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});