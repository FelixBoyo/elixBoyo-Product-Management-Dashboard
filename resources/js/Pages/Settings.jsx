import AppShellLayout from "@/Layouts/AppshellLayout";

export default function Settings() {
    return <div>Welcome to the settings page</div>;
}

Settings.layout = (page) => <AppShellLayout>{page}</AppShellLayout>;
