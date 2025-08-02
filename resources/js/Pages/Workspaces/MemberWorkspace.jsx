import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { flashMessage } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/resources/js/components/ui/Avatar';
import { Button } from '@/resources/js/components/ui/Button';
import { Card, CardContent } from '@/resources/js/components/ui/Card';
import { Transition } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function MemberWorkspace({ action, members }) {
  const { data, setData, processing, reset, post, errors, recentlySuccessful } = useForm({
    email: '',
  });

  const onHandleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    post(action, {
      onSuccess: (success) => {
        console.log('Success data:', success); // 👈 Lihat apa yang kamu terima

        const flash = flashMessage(success);
        if (flash) toast[flash.type](flash.message);
      },
      preserveScroll: true,
      preserveState: true,
    });
  };
  return (
    <Card className="md:col-span-2">
      <CardContent>
        <form onSubmit={onHandleSubmit}>
          <div className="py-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <InputLabel htmlFor="email" value="email" />
                <TextInput
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={onHandleChange}
                  onErrors={errors.email && <InputError message={errors.email} />}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2 py-6">
            <Button type="button" variant="ghost" onClick={() => reset()}>
              Reset
            </Button>
            <Button variant="red" type="submit" disabled={processing}>
              Invite
            </Button>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveFrom="opacity-0"
            >
              <p className="text-sm text-muted-foreground">Invited.</p>
            </Transition>
          </div>
        </form>
        <div className="space-y-4 py-6">
          <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
            {members.map((member, index) => (
              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-relaxed" key={index}>
                <div className="flex w-0 flex-1 items-center">
                  <Avatar>
                    <AvatarImage src={member.user.avatar} />
                    <AvatarFallback>{member.user.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex min-w-0 flex-col">
                    <span className="truncate font-medium">{member.user.name}</span>
                    <span className="hidden text-muted-foreground sm:block">{member.user.email}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {member.role != 'owner' ? (
                    <Button
                      variant="link"
                      className="font-medium text-red-500 hover:text-red-600 hover:no-underline"
                      onClick={() =>
                        router.delete(
                          route('workspaces.member_destroy', {
                            workspace: member.memberable_id,
                            member: member.id,
                          }),
                          {
                            preserveScroll: true,
                            preserveState: true,
                            onSuccess: (success) => {
                              const flash = flashMessage(success);
                              if (flash) toast[flash.type](flash.message);
                            },
                          },
                        )
                      }
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button variant="ghost">{member.role}</Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
