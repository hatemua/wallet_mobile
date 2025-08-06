import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, ArrowDownLeft, QrCode, Send, Eye, TrendingUp, Sparkles, Zap, Gift, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WalletHome() {
  const balance = 2847.50;
  const usdValue = 4271.25;
  const weeklyGain = 127.85;
  const recentTransactions = [
    { id: 1, type: 'payment', merchant: 'Coffee Central', amount: -5.50, time: '2 hours ago', category: 'coffee', color: '#8B4513' },
    { id: 2, type: 'purchase', merchant: 'Token Purchase', amount: +100.00, time: '1 day ago', category: 'purchase', color: '#6366F1' },
    { id: 3, type: 'payment', merchant: 'Pizza Palace', amount: -12.75, time: '2 days ago', category: 'food', color: '#DC2626' },
    { id: 4, type: 'reward', merchant: 'Cashback Bonus', amount: +2.15, time: '3 days ago', category: 'reward', color: '#10B981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning! ☀️</Text>
              <Text style={styles.subtitle}>Your DinLar Wallet</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <View style={styles.notificationDot} />
              <Sparkles size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCardContainer}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <TouchableOpacity style={styles.eyeButton}>
                <Eye size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>{balance.toLocaleString()} DLR</Text>
            <View style={styles.usdContainer}>
              <Text style={styles.usdValue}>≈ ${usdValue.toLocaleString()}</Text>
              <View style={styles.changeContainer}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={styles.changeText}>+2.4%</Text>
              </View>
            </View>
            
            {/* Weekly Gain */}
            <View style={styles.weeklyGainContainer}>
              <Zap size={16} color="#F59E0B" />
              <Text style={styles.weeklyGainText}>+${weeklyGain} this week</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#3B82F6' }]}>
              <Star size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#10B981' }]}>
              <Gift size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.sendButton]}>
            <View style={styles.actionIcon}>
              <Send size={24} color="#3B82F6" />
            </View>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.receiveButton]}>
            <View style={styles.actionIcon}>
              <ArrowDownLeft size={24} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.scanButton]}>
            <View style={styles.actionIcon}>
              <QrCode size={24} color="#EF4444" />
            </View>
            <Text style={styles.actionText}>Scan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.buyButton]}>
            <View style={styles.actionIcon}>
              <ArrowUpRight size={24} color="#F59E0B" />
            </View>
            <Text style={styles.actionText}>Buy</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Activity</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: `${transaction.color}20` }]}>
                {transaction.type === 'payment' ? (
                  <ArrowUpRight size={18} color={transaction.color} />
                ) : transaction.type === 'reward' ? (
                  <Gift size={18} color={transaction.color} />
                ) : (
                  <ArrowDownLeft size={18} color={transaction.color} />
                )}
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#10B981' : '#1F2937' }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount)} DLR
                </Text>
                {transaction.amount > 0 && (
                  <View style={styles.gainBadge}>
                    <Text style={styles.gainBadgeText}>+</Text>
                  </View>
                )}
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
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#6366F1',
    padding: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    opacity: 0.9,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
  balanceCardContainer: {
    marginTop: -16,
    marginHorizontal: 24,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  eyeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  usdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usdValue: {
    fontSize: 17,
    color: '#64748B',
    fontWeight: '500',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '700',
    marginLeft: 4,
  },
  weeklyGainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  weeklyGainText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 28,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButton: {
    backgroundColor: '#6366F1',
  },
  receiveButton: {
    backgroundColor: '#10B981',
  },
  scanButton: {
    backgroundColor: '#EF4444',
  },
  buyButton: {
    backgroundColor: '#F59E0B',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  transactionsContainer: {
    marginHorizontal: 24,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  seeAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
  },
  seeAllText: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '700',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  transactionTime: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  gainBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  gainBadgeText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '700',
  },
});