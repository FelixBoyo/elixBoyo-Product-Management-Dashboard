import { useEffect, useState } from 'react';
import Orders from "@/Components/Orders";
import AppShellLayout from "@/Layouts/AppshellLayout";
import { Group, Text } from "@mantine/core";
import { TiMessages } from "react-icons/ti";
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function LiveOrders() {
    const [order, setOrder] = useState(null); // Store the most recent order
    const [orderId, setOrderId] = useState(null); // Store the order id of the most recent order

    useEffect(() => {
        axios.get('/orders')
            .then((response) => {
                const recentOrder = response.data.orders[0];
                setOrderId(recentOrder.id);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);
    
useEffect(() => {
  if (orderId) {
    axios.get(`/orders/${orderId}`)
      .then((response) => {
        setOrder(response.data.order);
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
        console.log('Full error response:', error.response);
      });
  }
}, [orderId]);
return (
    <>
      {orderId ? (
        <>
          <Group gap="xl">
            <Text size="xl" weight={800}>
              Order Number <span style={{ color: '#C2185B' }}>#{order ? order.id : 'Loading...'}</span>
            </Text>
  
            <Text size="sm" style={{
              backgroundColor: '#1d1b40',
              color: 'white',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '4px 4px'
            }}>
              <TiMessages size={18} />
              Message Customer
            </Text>
          </Group>
  
          {order ? (
            <Orders order={order} />
          ) : (
            <Text>Loading order details...</Text>
          )}
        </>
      ) : (
        <Text size="lg" color="dimmed" mt="md">
          You have no active orders. Click on <strong>Products</strong> to place an order.
        </Text>
      )}
    </>
  );
  
}

LiveOrders.layout = (page) => <AppShellLayout>{page}</AppShellLayout>;
