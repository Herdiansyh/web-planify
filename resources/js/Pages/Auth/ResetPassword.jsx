import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/resources/js/components/ui/Button';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout title="Reset Password">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Card>
                        <CardHeader>
                            <Link href="/" className="text-4xl font-black leading-relaxed tracking-tighter">
                                Plannify<span className="text-red-500">.</span>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={submit}>
                                    {/* form */}
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            isfocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            onErrors={
                                                errors.email && <InputError className="mt-2" message={errors.email} />
                                            }
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="password" value="New Password" />
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            isfocused={true}
                                            onChange={(e) => setData('password', e.target.value)}
                                            onErrors={
                                                errors.password && (
                                                    <InputError className="mt-2" message={errors.password} />
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Password Confirmation" />
                                        <TextInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            isfocused={true}
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.password_confirmation)
                                            }
                                            onErrors={
                                                errors.password_confirmation && (
                                                    <InputError
                                                        className="mt-2"
                                                        message={errors.password_confirmation}
                                                    />
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Button type="submit" variant="red" className="w-full" disabled={processing}>
                                            Reset Password
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
