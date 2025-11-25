import { firebaseAuth, firebaseFirestore, collections, PointTransaction } from '../config/firebaseConfig';

/**
 * Calculate points earned from an order
 * Rule: 1% of order value, minimum 10 points, maximum 500 points per order
 */
export const calculatePointsFromOrder = (orderPrice: string): number => {
  // Extract numeric value from price string (e.g., "Rp 150.000" -> 150000)
  const numericPrice = parseInt(orderPrice.replace(/[^\d]/g, ''), 10);
  if (isNaN(numericPrice) || numericPrice <= 0) return 0;

  // Calculate 1% of order value
  const calculatedPoints = Math.floor(numericPrice * 0.01);
  
  // Apply min/max limits
  const points = Math.max(10, Math.min(calculatedPoints, 500));
  
  return points;
};

/**
 * Award points to user when order is completed
 */
export const awardPointsForOrder = async (
  userId: string,
  orderId: string,
  orderPrice: string,
  technicianName: string,
  technicianRole: string
): Promise<number> => {
  try {
    const points = calculatePointsFromOrder(orderPrice);
    
    if (points <= 0) {
      console.log('No points to award for this order');
      return 0;
    }

    // Calculate expiry date (1 year from now)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    // Create point transaction
    const transactionId = `PT-${Date.now()}`;
    const transaction: Omit<PointTransaction, 'id'> = {
      userId,
      orderId,
      points,
      type: 'earned',
      description: `Transaksi ${technicianRole} - ${technicianName} Berhasil`,
      expiryDate,
      createdAt: new Date(),
    };

    await firebaseFirestore
      .collection(collections.pointTransactions)
      .doc(transactionId)
      .set({
        ...transaction,
        id: transactionId,
      });

    // Update user's total points
    await updateUserPoints(userId, points);

    console.log(`Awarded ${points} points to user ${userId} for order ${orderId}`);
    return points;
  } catch (error) {
    console.error('Error awarding points:', error);
    throw error;
  }
};

/**
 * Update user's total points
 */
export const updateUserPoints = async (userId: string, pointsToAdd: number): Promise<void> => {
  try {
    const pointsRef = firebaseFirestore
      .collection(collections.points)
      .doc(userId);

    const pointsDoc = await pointsRef.get();

    if (pointsDoc.exists) {
      // Update existing points
      const currentPoints = pointsDoc.data()?.totalPoints || 0;
      await pointsRef.update({
        totalPoints: currentPoints + pointsToAdd,
        lastUpdated: new Date(),
      });
    } else {
      // Create new points document
      await pointsRef.set({
        userId,
        totalPoints: pointsToAdd,
        lastUpdated: new Date(),
      });
    }
  } catch (error) {
    console.error('Error updating user points:', error);
    throw error;
  }
};

/**
 * Get user's total points
 */
export const getUserPoints = async (userId: string): Promise<number> => {
  try {
    const pointsDoc = await firebaseFirestore
      .collection(collections.points)
      .doc(userId)
      .get();

    if (pointsDoc.exists) {
      return pointsDoc.data()?.totalPoints || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting user points:', error);
    return 0;
  }
};

/**
 * Get user's point transactions
 */
export const getUserPointTransactions = async (userId: string): Promise<PointTransaction[]> => {
  try {
    // Fetch without orderBy to avoid index requirement, then sort in memory
    const transactionsSnapshot = await firebaseFirestore
      .collection(collections.pointTransactions)
      .where('userId', '==', userId)
      .get();

    const transactions: PointTransaction[] = [];
    transactionsSnapshot.forEach(doc => {
      const data = doc.data();
      transactions.push({
        id: doc.id,
        userId: data.userId,
        orderId: data.orderId,
        points: data.points,
        type: data.type,
        description: data.description,
        expiryDate: data.expiryDate?.toDate ? data.expiryDate.toDate() : data.expiryDate,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      });
    });

    // Sort by createdAt in descending order (newest first) in memory
    transactions.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });

    return transactions;
  } catch (error) {
    console.error('Error getting point transactions:', error);
    return [];
  }
};

