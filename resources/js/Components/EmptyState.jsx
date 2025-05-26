import { cn } from '@/lib/utils';
import { PiDatabase } from 'react-icons/pi';

export default function EmptyState({ title, url, classname }) {
    return (
        <link
            href={url}
            className={cn(
                'relative block w-full rounded-lg border-2 border-dashed border-muted-foreground p-12 text-center hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                classname,
            )}
        >
            <PiDatabase classname="w-12 h-12 mx-auto text-muted-foreground" />
            <span classname="mt-2 block text-sm font-medium leading-relaxed tracking-tighter "></span>
        </link>
    );
}
