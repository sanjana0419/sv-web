import React, { createContext, useContext, useReducer, useCallback, useMemo, useTransition } from 'react';

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
};

const AuthContext = createContext(null);

const initialState = {
    view: AUTH_VIEWS.SIGNUP,
    prevView: null,
    formData: {
        contact: '',
        password: '',
        confirmPassword: ''
    },
    showPass: false,
    isSubmitting: false,
};

function authReducer(state, action) {
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

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isPending, startTransition] = useTransition();

    const navigate = useCallback((targetView) => {
        dispatch({ type: 'NAVIGATE', payload: targetView });
    }, []);

    const setField = useCallback((field, value) => {
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
