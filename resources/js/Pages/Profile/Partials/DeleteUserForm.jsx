import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { Button } from '@/resources/js/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/resources/js/components/ui/Card';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    clearErrors();
    reset();
  };

  return (
    <Card className={`space-y-4 ${className}`}>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>

        <CardDescription>Akun akan dihapus permanen dan data akan ikut terhapus </CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="red" onClick={confirmUserDeletion}>
          Delete Account
        </Button>
        <Modal show={confirmingUserDeletion} onClose={closeModal}>
          <form onSubmit={deleteUser} className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Are you sure you want to delete your account?</h2>

            <p className="mt-1 text-sm text-gray-600">Akun akan dihapus permanen dan data akan ikut terhapus </p>

            <div className="mt-6">
              <InputLabel htmlFor="password" value="Password" className="sr-only" />

              <TextInput
                id="password"
                type="password"
                name="password"
                ref={passwordInput}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="mt-1 block w-3/4"
                isFocused
                placeholder="Password"
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>

              <Button variant="red" className="ms-3" disabled={processing}>
                Delete Account
              </Button>
            </div>
          </form>
        </Modal>
      </CardContent>
    </Card>
  );
}
