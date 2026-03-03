import React, { createContext, useContext, useReducer, useCallback, useMemo, useTransition, ReactNode } from 'react';

// Auth view states
export const AUTH_VIEWS = {
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    OTP_LOGIN: 'OTP_LOGIN',
    OTP_SIGNUP: 'OTP_SIGNUP',
    OTP_FORGOT: 'OTP_FORGOT',
    RESET_PASSWORD: 'RESET_PASSWORD',
    CREATE_PASSWORD: 'CREATE_PASSWORD',
    HOME: 'HOME',
} as const;

export type AuthView = keyof typeof AUTH_VIEWS;

interface AuthState {
    view: AuthView;
    prevView: AuthView | null;
    formData: {
        contact: string;
        password?: string;
        confirmPassword?: string;
    };
    showPass: boolean;
    isSubmitting: boolean;
}

type AuthAction =
    | { type: 'NAVIGATE'; payload: AuthView }
    | { type: 'SET_FIELD'; field: string; value: string }
    | { type: 'TOGGLE_PASS' }
    | { type: 'SET_SUBMITTING'; payload: boolean };

export interface AuthContextType extends AuthState {
    isTransitioning: boolean;
    navigate: (targetView: AuthView) => void;
    setField: (field: string, value: string) => void;
    togglePass: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AuthState = {
    view: 'LOGIN',
    prevView: null,
    formData: {
        contact: '',
        password: '',
        confirmPassword: ''
    },
    showPass: false,
    isSubmitting: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'NAVIGATE':
            return {
                ...state,
                view: action.payload,
                prevView: state.view
            };
        case 'SET_FIELD':
            return {
                ...state,
                formData: { ...state.formData, [action.field]: action.value }
            };
        case 'TOGGLE_PASS':
            return {
                ...state,
                showPass: !state.showPass
            };
        case 'SET_SUBMITTING':
            return {
                ...state,
                isSubmitting: action.payload
            };
        default:
            return state;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isPending, startTransition] = useTransition();

    const navigate = useCallback((targetView: AuthView) => {
        dispatch({ type: 'NAVIGATE', payload: targetView });
    }, []);

    const setField = useCallback((field: string, value: string) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }, []);

    const togglePass = useCallback(() => {
        dispatch({ type: 'TOGGLE_PASS' });
    }, []);

    // Optimized context value
    const value = useMemo(() => ({
        ...state,
        isTransitioning: isPending,
        navigate,
        setField,
        togglePass
    }), [state, isPending, navigate, setField, togglePass]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

