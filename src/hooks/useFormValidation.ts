import { useMemo, useCallback, useState } from 'react';
import { VALIDATORS } from '../utils/validators';

export function useFormValidation(formData: Record<string, any>, fields: string[]) {
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const errors = useMemo(() => {
        const result: Record<string, string | null> = {};
        fields.forEach((field) => {
            const validator = VALIDATORS[field];
            if (validator) {
                result[field] = validator(formData[field], formData);
            }
        });
        return result;
    }, [formData, fields]);

    const visibleErrors = useMemo(() => {
        const result: Record<string, string | null> = {};
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

    const touchField = useCallback((field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    }, []);

    const validateAll = useCallback(() => {
        const allTouched: Record<string, boolean> = {};
        fields.forEach((f) => { allTouched[f] = true; });
        setTouched(allTouched);
        return fields.every((field) => !errors[field]);
    }, [fields, errors]);

    return { errors: visibleErrors, isValid, touched, touchField, validateAll };
}
