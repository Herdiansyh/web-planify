import GetPriorityBadge from '@/Components/GetPriorityBadge';
import GetStatusBage from '@/Components/GetStatusBadge';
import Header from '@/Components/Header';
import AppLayout from '@/Layouts/AppLayout';
import { Card, CardContent } from '@/resources/js/components/ui/Card';

export default function Show({ card, page_settings }) {
  return (
    <>
      <Header title={page_settings.title} subtitle={page_settings.subtitle} />

      <Card>
        <CardContent className="mt-4">
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-foreground">Title</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{card.title}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-foreground">description</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {card.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-foreground">deadline</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {card.deadline.format}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-foreground">status</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  <GetStatusBage status={card.status}></GetStatusBage>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-foreground">priority</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  <GetPriorityBadge priority={card.priority}></GetPriorityBadge>
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
Show.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
