'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type User = {
    id: string;
    email: string;
    name?: string;
    image?: string;
};

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    logout: () => Promise<void>;
};

type UserProviderProps = {
    children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = async () => {
        setUser(null);
    };

    const value = {
        user,
        setUser,
        isLoading,
        logout,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    
    return context;
} 