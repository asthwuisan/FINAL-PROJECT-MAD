import React, { useState, useEffect, useCallback } from 'react';
import {View, ScrollView, StyleSheet, SafeAreaView, Text, ActivityIndicator, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import PoinHeader from '../components/molecules/PoinHeader';
import PointHistoryItem from '../components/molecules/PointHistoryItem';
import { firebaseAuth } from '../config/firebaseConfig';
import { getUserPointTransactions } from '../utils/pointsService';
import { PointTransaction } from '../config/firebaseConfig';

const PointsPage = ({navigation}: {navigation: any}) => {
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const currentUser = firebaseAuth.currentUser;

  const loadTransactions = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const userTransactions = await getUserPointTransactions(currentUser.uid);
      setTransactions(userTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [currentUser]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      setRefreshTrigger(prev => prev + 1);
    }, [currentUser])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshTrigger(prev => prev + 1);
    loadTransactions();
  };

  const formatDate = (date: Date | string): string => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Tanggal tidak tersedia';
    }
  };

  const formatExpiryDate = (date: Date | string | undefined): string => {
    if (!date) return '';
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Silakan login untuk melihat poin</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* 1. Header Poin */}
        <PoinHeader refreshTrigger={refreshTrigger} />

        {/* 2. Riwayat Poin */}
        <View style={styles.historySection}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#56AB2F" />
              <Text style={styles.loadingText}>Memuat riwayat poin...</Text>
            </View>
          ) : transactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada riwayat poin</Text>
              <Text style={styles.emptySubtext}>
                Dapatkan poin dengan menyelesaikan transaksi!
              </Text>
            </View>
          ) : (
            transactions.map(item => (
              <PointHistoryItem
                key={item.id}
                date={formatDate(item.createdAt)}
                description={item.description}
                points={item.points}
                expiryDate={formatExpiryDate(item.expiryDate)}
                isCredit={item.type === 'earned'}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  historySection: {
    marginTop: 10,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default PointsPage;
