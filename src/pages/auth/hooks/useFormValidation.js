import { useMemo, useCallback, useState } from 'react';

const VALIDATORS = {
    phone: (val) => {
        if (!val) return 'Phone number is required';
        if (!/^\d{10}$/.test(val.replace(/\D/g, ''))) return 'Enter a valid 10-digit phone number';
        return null;
    },
    password: (val) => {
        if (!val) return 'Password is required';
        if (val.length < 6) return 'Password must be at least 6 characters';
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
