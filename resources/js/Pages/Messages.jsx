import AppShellLayout from "@/Layouts/AppshellLayout";

export default function Messages() {
    return <div>Welcome to the messages page</div>;
}

Messages.layout = (page) => <AppShellLayout>{page}</AppShellLayout>;
