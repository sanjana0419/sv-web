import React, { useRef, useState, useCallback, MutableRefObject } from 'react';

/**
 * Custom hook for OTP input management.
 * Uses useRef for auto-focus between input boxes.
 * 
 * @param {number} length - Number of OTP digits (default: 6)
 */
export function useOtpInput(length: number = 6) {
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

    const handleChange = useCallback((index: number, value: string) => {
        // Only allow single digit
        const digit = value.replace(/\D/g, '').slice(-1);

        setOtp((prev) => {
            const next = [...prev];
            next[index] = digit;
            return next;
        });

        // Auto-focus next input on valid digit entry
        if (digit && index < length - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    }, [length]);

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Backspace: clear current and focus previous
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                otpRefs.current[index - 1]?.focus();
                setOtp((prev) => {
                    const next = [...prev];
                    next[index - 1] = '';
                    return next;
                });
            }
        }

        // Arrow keys navigation
        if (e.key === 'ArrowLeft' && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    }, [otp, length]);

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        const digits = pasted.split('');

        setOtp((prev) => {
            const next = [...prev];
            digits.forEach((d, i) => { next[i] = d; });
            return next;
        });

        // Focus the input after last pasted digit
        const focusIndex = Math.min(digits.length, length - 1);
        otpRefs.current[focusIndex]?.focus();
    }, [length]);

    const isComplete = otp.every((d) => d !== '');
    const otpValue = otp.join('');

    const reset = useCallback(() => {
        setOtp(Array(length).fill(''));
        otpRefs.current[0]?.focus();
    }, [length]);

    return { otpRefs, otp, otpValue, handleChange, handleKeyDown, handlePaste, isComplete, reset };
}
