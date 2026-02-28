export type ValidatorFn = (val: string, formData: Record<string, any>) => string | null;

export const VALIDATORS: Record<string, ValidatorFn> = {
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
