import AppLayout from '@/Layouts/AppLayout';

export default function Testing() {
    return (
        <div>
            This is a testing page.
            <p>Feel free to modify this page as needed.</p>
        </div>
    );
}
Testing.layout = (page) => <AppLayout children={page} title="Testing" />;
