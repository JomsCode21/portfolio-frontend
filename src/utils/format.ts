export const monthYear = (value) =>
  value
    ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value))
    : 'Present';
export const dateLabel = (value) =>
  value
    ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(value))
    : '';
