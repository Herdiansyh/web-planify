import { Button } from '@/resources/js/components/ui/Button';
import { PiSquaresFour } from 'react-icons/pi';

export default function TaskListCard({ tasks }) {
  return (
    <div className="space-y-4 py-6">
      <ul className="divide-y divide-gray-100 rounded-md border border-gray-200" role="list">
        {tasks
          .filter((task) => task.parent_id === null)
          .map((tasks, index) => (
            <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-4">
              <div className="flex w-0 flex-1 items-center">
                <PiSquaresFour className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div className="ml-4 flex min-w-0 flex-col">{tasks.title}</div>
              </div>
              <div className="ml-4 flex shrink-0">
                <Button
                  variant="link"
                  className="font-medium text-red-500 hover:text-red-600 hover:no-underline"
                  onClick={() =>
                    //   router.delete(
                    //     route('attachments.destroy', {
                    //       card: attachment.card_id,
                    //       attachment: attachment.id,
                    //     }),
                    //     {
                    //       preserveScroll: true,
                    //       preserveState: true,
                    //       onSuccess: (success) => {
                    //         const flash = flashMessage(success);
                    //         if (flash) toast[flash.type](flash.message);
                    //       },
                    //     },
                    //   )
                    console.log('delete')
                  }
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
