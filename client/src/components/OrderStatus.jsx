import { statusColors } from '../constants';

export default function ({ status }) {
  return (
    <td style={{ color: statusColors[status], fontWeight: 'bolder' }}>
      {status.toUpperCase()}
    </td>
  );
}
