import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/resources/js/components/ui/Button';
import { Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout title="Verify Email">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Card>
                        <CardHeader>
                            <Link href="/" className="text-4xl font-black leading-relaxed tracking-tighter">
                                Plannify<span className="text-red-500">.</span>
                            </Link>
                            <h2 className="text-left text-lg font-medium leading-9 tracking-tight text-muted-foreground">
                                Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email
                                Anda dengan mengklik tautan yang baru saja kami kirimkan melalui email? Jika Anda belum
                                menerima email tersebut, kami akan dengan senang hati mengirimkan email lain.
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                {status === 'verification-link-sent' && (
                                    <div className="mb-4 text-sm font-medium text-green-600">
                                        Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat
                                        pendaftaran.
                                    </div>
                                )}
                                <form className="space-y-6" onSubmit={submit}>
                                    {/* form */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <Button disabled={processing}>Resend Verification Email</Button>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="rounded-md text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Log Out
                                        </Link>
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
