/**
 * Checks if a given date is expired by comparing it to the current date.
 *
 * @param {string|number|Date} date - The date to check for expiration.
 * @return {boolean} Returns true if the date is in the past, false otherwise.
 */
export const isExpired = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Returns the corresponding French translation for a given status.
 *
 * @param {string} status - The status to translate.
 * @return {string} The French translation of the status.
 */
export function getStatus(status) {
  if (!status) return '';

  switch (status) {
    case 'ACTIVE':
      return 'Validé';
    case 'INACTIVE':
      return 'Inactif';
    case 'DELETED':
      return 'Supprimé';
    case 'REJECTED':
      return 'Rejeté';
    case 'PENDING':
      return 'En attente';
    case 'BLOCKED':
      return 'Bloqué';
    default:
      return 'Statut inconnu';
  }
}

export function getStatusColor(status) {
  if (!status) return 'error';

  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'warning';
    case 'DELETED':
      return 'error';
    case 'REJECTED':
      return 'error';
    case 'PENDING':
      return 'warning';
    case 'BLOCKED':
      return 'error';
    default:
      return 'error';
  }
}
