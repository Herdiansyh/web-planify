import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { flashMessage } from '@/lib/utils';
import { Button } from '@/resources/js/components/ui/Button';
import { Card, CardContent } from '@/resources/js/components/ui/Card';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function MemberWorkspace({ action }) {
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
      preserveState: false,
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
      </CardContent>
    </Card>
  );
}
