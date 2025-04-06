import Header from '@/Components/Header';
import { Navbar } from '@/Components/Navbar';
import { createTheme } from '@mantine/core';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import LiveOrders from '@/Pages/LiveOrders';
import OrderHistory from '@/Pages/OrderHistory';
import Offers from '@/Pages/Offers';
import Stock from '@/Pages/Stock';
import Messages from '@/Pages/Messages';
import Settings from '@/Pages/Settings';
import Products from '@/Pages/Products';
import Welcome from '@/Pages/Welcome';
import { useState } from 'react';

const ComponentsMap = {
  'Live Orders': LiveOrders,
  'Order History': OrderHistory,
  'Offers': Offers,
  'Products': Products,
  'Stock': Stock,
  'Message': Messages,
  'Settings': Settings,
};

const theme = createTheme({
  /** Your theme override here */
});

function AppShellLayout() {
  const [activePage, setActivePage] = useState('Live Orders');
  const ActiveComponent = ComponentsMap[activePage];
    const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 300,
      breakpoint: 'sm',
      collapsed: { mobile: !opened },
    }}
    padding="md"
  >
    <Header toggle={toggle} opened={opened}/>

    <Navbar active={activePage} setActive={setActivePage}/>
    <AppShell.Main>
    {ActiveComponent ? <ActiveComponent /> : <div>Select a page</div>}
    </AppShell.Main>
  </AppShell>
  );
}

export default AppShellLayout;