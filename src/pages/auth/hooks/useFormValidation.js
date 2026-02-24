import { useMemo, useCallback, useState } from 'react';

const VALIDATORS = {
    contact: (val) => {
        if (!val) return 'Email / Phone Number is required';
        if (val.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) return 'Enter a valid email address';
        } else {
            if (!/^\d+$/.test(val)) {
                return 'Only numbers allowed in phone number';
            }
            if (val.length !== 10) {
                return 'Enter a valid 10-digit phone number';
            }
        }
        return null;
    },
    fullName: (val) => {
        if (!val) return 'Full name is required';
        if (val.trim().length < 3) return 'Name must be at least 3 characters';
        return null;
    },
    password: (val) => {
        if (!val) return 'Password is required';
        if (val.length < 8) return 'Password must be at least 8 characters';
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongRegex.test(val)) {
            return 'Must include uppercase, lowercase, number, and special character';
        }
        return null;
    },
    confirmPassword: (val, formData) => {
        if (!val) return 'Please confirm your password';
        if (val !== formData.password) return 'Passwords do not match';
        return null;
    },
};

/**
 * Custom hook for form validation with useMemo-computed errors.
 * 
 * @param {Object} formData - Current form field values
 * @param {string[]} fields - Array of field names to validate
 * @returns {{ errors, isValid, touched, touchField, validateAll }}
 */
export function useFormValidation(formData, fields) {
    const [touched, setTouched] = useState({});

    const errors = useMemo(() => {
        const result = {};
        fields.forEach((field) => {
            const validator = VALIDATORS[field];
            if (validator) {
                result[field] = validator(formData[field], formData);
            }
        });
        return result;
    }, [formData, fields]);

    const visibleErrors = useMemo(() => {
        const result = {};
        Object.keys(errors).forEach((field) => {
            if (touched[field] && errors[field]) {
                result[field] = errors[field];
            }
        });
        return result;
    }, [errors, touched]);

    const isValid = useMemo(
        () => fields.every((field) => !errors[field]),
        [errors, fields]
    );

    const touchField = useCallback((field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    }, []);

    const validateAll = useCallback(() => {
        const allTouched = {};
        fields.forEach((f) => { allTouched[f] = true; });
        setTouched(allTouched);
        return fields.every((field) => !errors[field]);
    }, [fields, errors]);

    return { errors: visibleErrors, isValid, touched, touchField, validateAll };
}
