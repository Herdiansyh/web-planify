import { STATUS } from '@/lib/utils';
import { Badge } from '@/resources/js/components/ui/Badge';

export default function GetPriorityBadge({ status }) {
  const { TODO, INPROGRESS, ONREVIEW, DONE, UNKNOWN } = STATUS;
  let badge, text;

  switch (status) {
    case TODO:
      badge = 'bg-red-500 hover:bg-red-600';
      text = 'Urgent';
      break;
    case INPROGRESS:
      badge = 'bg-yellow-500 hover:bg-yellow-600';
      text = 'High';
      break;
    case ONREVIEW:
      badge = 'bg-blue-500 hover:bg-blue-600';
      text = 'Medium';
      break;
    case DONE:
      badge = 'bg-green-500 hover:bg-green-600';
      text = 'Low';
      break;
    default:
      badge = '';
      text = UNKNOWN;
  }
  return <Badge className={badge}>{text}</Badge>;
}
