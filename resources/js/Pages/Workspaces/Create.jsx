import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Button } from '@/resources/js/components/ui/Button';
import { Card, CardContent } from '@/resources/js/components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/resources/js/components/ui/Select';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create({ page_settings, visibilities }) {
    const coverRef = useRef(null);
    const logoRef = useRef(null);

    const { data, setData, processing, reset, post, errors } = useForm({
        name: '',
        cover: '',
        logo: '',
        visibility: 'Private',
        _method: page_settings.method,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission logic here
        post(page_settings.action, {
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
            preserveScroll: true,
            preserveState: false,
        });
    };
    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3">
                    <HeaderForm className="mb-8" title={page_settings.title} subtitle={page_settings.subtitle} />

                    <Card className="md:col-span-2">
                        <CardContent>
                            <form action="#" onSubmit={onHandleSubmit} className="space-y-8">
                                <div className="py-e6">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="name" value="name" />
                                            <TextInput
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData(e.target.name, e.target.value)}
                                                onErrors={errors.name && <InputError message={errors.name} />}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="cover" value="cover" />
                                            <TextInput
                                                type="file"
                                                name="cover"
                                                id="cover"
                                                ref={coverRef}
                                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                                onErrors={errors.cover && <InputError message={errors.cover} />}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="logo" value="logo" />
                                            <TextInput
                                                type="file"
                                                name="logo"
                                                id="logo"
                                                ref={logoRef}
                                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                                onErrors={errors.logo && <InputError message={errors.logo} />}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="visibility" value="visibility" />
                                            <Select
                                                defaultValue="select a visibility"
                                                onValueChange={(value) => setData('visibility', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {visibilities.find(
                                                            (visibility) => visibility.value === data.visibility,
                                                        )?.label ?? 'Select a Visibility'}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {visibilities.map((visib, index) => {
                                                        return (
                                                            <SelectItem key={index} value={visib.value}>
                                                                {visib.label}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                            {errors.visibility && <InputError message={errors.visibility} />}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-x-2 py-6">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            reset(); // reset state
                                            // kosongkan input file secara manual
                                            if (coverRef.current) coverRef.current.value = '';
                                            if (logoRef.current) logoRef.current.value = '';
                                        }}
                                    >
                                        Reset
                                    </Button>
                                    <Button type="submit" variant="red" disabled={processing}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
// TOMBOL RESET BELUM BERUFNGSI
Create.layout = (page) => <AppLayout children={page} title="Workspace Create" />;
