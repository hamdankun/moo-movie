import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const formatDate = (
    stringDate: string,
    formatDate: string = 'MMM dd, yyyy'
): string => {
    const parsed = parseISO(stringDate);
    return format(parsed, formatDate);
};
