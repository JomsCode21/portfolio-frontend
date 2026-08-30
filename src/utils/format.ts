export const monthYear = (value) =>
  value
    ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value))
    : 'Present';
export const dateLabel = (value) =>
  value
    ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(value))
    : '';
export const arrivalDate = (value) =>
  value
    ? new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(value))
    : '';
export const arrivalTime = (value) =>
  value
    ? new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date(value))
    : '';
