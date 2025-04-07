import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTable from '@/Components/OrderTable';
import { Tabs, Loader } from '@mantine/core';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend using axios
  useEffect(() => {
    axios
      .get('/orders') // Adjust this to your actual route for orders
      .then((response) => {
        setOrders(response.data.orders); // Set fetched orders to state
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setError('There was an error fetching the orders. Please try again later.');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request is done
      });
  }, []); // Empty array to run the effect only once on mount

  // Filter orders by status
  const filterOrders = (status) => {
    return status === 'All' ? orders : orders.filter((o) => o.status === status);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {error && <Alert color="red">{error}</Alert>}
      <Tabs defaultValue="All">
        <Tabs.List>
          <Tabs.Tab value="All">All Orders</Tabs.Tab>
          <Tabs.Tab value="Pending">Pending</Tabs.Tab>
          <Tabs.Tab value="Completed">Completed</Tabs.Tab>
          <Tabs.Tab value="Dispatch">Dispatch</Tabs.Tab>

        </Tabs.List>

        <Tabs.Panel value="All" pt="md">
          <OrderTable orders={filterOrders('All')} />
        </Tabs.Panel>
        <Tabs.Panel value="Pending" pt="md">
          <OrderTable orders={filterOrders('Pending')} />
        </Tabs.Panel>
        <Tabs.Panel value="Completed" pt="md">
          <OrderTable orders={filterOrders('Completed')} />
        </Tabs.Panel>
        <Tabs.Panel value="Dispatch" pt="md">
          <OrderTable orders={filterOrders('Dispatch')} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
OrderHistory.layout = (page) => <AppShellLayout>{page}</AppShellLayout>;