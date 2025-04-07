import { Table, Badge, Menu, ActionIcon } from '@mantine/core';
import axios from 'axios';
import { IoSettingsSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

export default function OrderTable({ orders }) {
  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/orders/${orderId}/cancel`) // your backend route
          .then(() => {
            Swal.fire("Deleted!", "Your order has been deleted.", "success").then(() => {
              window.location.reload(); // or refetch orders instead of reload
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };
  return (
    <Table striped highlightOnHover withBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Customer</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Address</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {orders.map((order) => (
          <Table.Tr key={order.id}>
            <Table.Td>{order.id}</Table.Td>
            <Table.Td>{order.user ? order.user.name : 'N/A'}</Table.Td>  
            <Table.Td>
              <Badge color={order.status === 'Completed' ? 'green' : 'yellow'}>
                {order.status}
              </Badge>
            </Table.Td>
            <Table.Td>{order.total}</Table.Td>
            <Table.Td>{order.created_at}</Table.Td>
            <Table.Td>{order.delivery_address}</Table.Td>  
            <Table.Td>
              <Menu width={200} position="bottom-end">
                <Menu.Target>
                  <ActionIcon>
                    <IoSettingsSharp size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => handleCancel(order.id)}>Cancel Order</Menu.Item>
                  <Menu.Item>Track Delivery</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
