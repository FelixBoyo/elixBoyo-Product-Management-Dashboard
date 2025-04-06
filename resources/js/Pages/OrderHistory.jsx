import AppShellLayout from "@/Layouts/AppshellLayout";

export default function Products() {
    return <div>Welcome to the products page</div>;
}

Products.layout = (page) => <AppShellLayout>{page}</AppShellLayout>;
