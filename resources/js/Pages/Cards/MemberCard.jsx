import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { flashMessage } from '@/lib/utils';
import { Button } from '@/resources/js/components/ui/Button';
import { Card, CardContent } from '@/resources/js/components/ui/Card';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function MemberCard({ action }) {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    email: '',
  });
  const onHandleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    post(action, {
      preserveScroll: true,
      preserveState: true,

      onSuccess: (success) => {
        console.log('FLASH:', flashMessage(success));

        const flash = flashMessage(success);
        if (flash) toast[flash.type](flash.message);
      },
    });
  };

  return (
    <Card className="md:col-span-2">
      <CardContent>
        <form onSubmit={onHandleSubmit} className="space-y-6">
          <div className="py-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="col-span-full">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  type="email"
                  name="email"
                  id="email"
                  isFocused={true}
                  value={data.email}
                  onChange={onHandleChange}
                  onErrors={errors.email && <InputError message={errors.email} />}
                />
              </div>
            </div>
          </div>
          <div className="fles items-center justify-end gap-x-2 py-6">
            <Button type="button" variant="ghost" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit" className="red" disabled={processing}>
              invite
            </Button>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-100"
            >
              <p className="text-sm text-muted-foreground">Invited.</p>
            </Transition>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
