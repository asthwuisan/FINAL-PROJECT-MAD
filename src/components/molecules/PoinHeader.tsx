import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { firebaseAuth } from '../../config/firebaseConfig';
import { getUserPoints, getUserPointTransactions } from '../../utils/pointsService';

interface PointHeaderProps {
  refreshTrigger?: number;
}

const PointHeader: React.FC<PointHeaderProps> = ({ refreshTrigger }) => {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [expiringPoints, setExpiringPoints] = useState<{ points: number; date: string } | null>(null);

  useEffect(() => {
    loadPointsData();
  }, [refreshTrigger]);

  const loadPointsData = async () => {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const points = await getUserPoints(currentUser.uid);
      setTotalPoints(points);

      // Get transactions to find expiring points
      const transactions = await getUserPointTransactions(currentUser.uid);
      const now = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      // Find points expiring in the next month
      const expiring = transactions
        .filter(t => t.type === 'earned' && t.expiryDate)
        .filter(t => {
          const expiry = t.expiryDate instanceof Date ? t.expiryDate : new Date(t.expiryDate);
          return expiry >= now && expiry <= nextMonth;
        })
        .reduce((sum, t) => sum + t.points, 0);

      if (expiring > 0) {
        const earliestExpiry = transactions
          .filter(t => t.type === 'earned' && t.expiryDate)
          .map(t => t.expiryDate instanceof Date ? t.expiryDate : new Date(t.expiryDate))
          .filter(d => d >= now && d <= nextMonth)
          .sort((a, b) => a.getTime() - b.getTime())[0];

        if (earliestExpiry) {
          setExpiringPoints({
            points: expiring,
            date: earliestExpiry.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
          });
        }
      } else {
        setExpiringPoints(null);
      }
    } catch (error) {
      console.error('Error loading points:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#A8E063', '#56AB2F']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>HelpYu Points</Text>

          <View style={styles.pointRow}>
            <Image
              source={require('../../assets/koin.png')}
              style={styles.icon}
            />
            {loading ? (
              <ActivityIndicator color="#FFF" size="large" />
            ) : (
              <Text style={styles.points}>{totalPoints}</Text>
            )}
          </View>

          <Text style={styles.subtitle}>1 HelpYu Points = Rp1</Text>

          {expiringPoints && (
            <Text style={styles.expiryText}>
              {expiringPoints.points} Points-mu kadaluarsa pada {expiringPoints.date}
            </Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 20,
  },
  points: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 15,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  expiryText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PointHeader;
