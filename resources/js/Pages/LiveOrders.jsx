import AppShellLayout from "@/Layouts/AppshellLayout";
import { Text } from "@mantine/core";
import { TiMessages } from "react-icons/ti";

export default function LiveOrders() {
    return (
    <Text size="lg"> Order Number <span  style={{ color: '#C2185B' }}>#627624</span>
    <span><TiMessages/>Message Customer</span></Text>
    );
}

LiveOrders.layout = (page) => <AppShellLayout>{page}</AppShellLayout>;
