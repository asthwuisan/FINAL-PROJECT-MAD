import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseAuth, firebaseFirestore, collections, UserData } from '../config/firebaseConfig';

interface UserContextType {
    user: UserData | null;
    loading: boolean;
    error: string | null;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async (uid: string) => {
        try {
            console.log('[UserContext] Fetching user data for UID:', uid);
            setLoading(true);
            setError(null);

            const userDoc = await firebaseFirestore
                .collection(collections.users)
                .doc(uid)
                .get();

            console.log('[UserContext] User doc exists:', userDoc.exists);

            if (userDoc.exists) {
                const userData = userDoc.data() as UserData;
                console.log('[UserContext] User data fetched:', userData);
                setUser(userData);
            } else {
                console.warn('[UserContext] User document not found in Firestore');
                // Create a minimal user object from auth data
                const authUser = firebaseAuth.currentUser;
                if (authUser) {
                    const minimalUser: UserData = {
                        uid: authUser.uid,
                        email: authUser.email || '',
                        name: authUser.displayName || 'User',
                        phone: authUser.phoneNumber || '',
                        createdAt: new Date(),
                    };
                    console.log('[UserContext] Created minimal user data:', minimalUser);
                    setUser(minimalUser);
                } else {
                    setError('User data not found');
                    setUser(null);
                }
            }
        } catch (err) {
            console.error('[UserContext] Error fetching user data:', err);
            setError('Failed to fetch user data');
            setUser(null);
        } finally {
            setLoading(false);
            console.log('[UserContext] Loading complete');
        }
    };

    const refreshUser = async () => {
        const currentUser = firebaseAuth.currentUser;
        if (currentUser) {
            await fetchUserData(currentUser.uid);
        }
    };

    useEffect(() => {
        console.log('[UserContext] Setting up auth listener');
        // Subscribe to Firebase auth state changes
        const unsubscribe = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
            console.log('[UserContext] Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
            if (firebaseUser) {
                console.log('[UserContext] User UID:', firebaseUser.uid);
                // User is signed in, fetch their data
                await fetchUserData(firebaseUser.uid);
            } else {
                // User is signed out
                console.log('[UserContext] No user authenticated');
                setUser(null);
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            console.log('[UserContext] Cleaning up auth listener');
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
