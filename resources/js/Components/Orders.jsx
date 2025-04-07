import {
  Grid,
  Table,
  Text,
  Button,
  Image,
  Group,
  Stack,
  Paper,
} from "@mantine/core";

export default function Orders({ order }) {
  const items = order.products; // Assuming 'products' is an array in the order object
  const user = order.user; // This is the related user data from the users table

  const itemRows = items.map((item, i) => (
    <Table.Tr key={i}>
      <Table.Td>
        <Group>
          <Image
            src={`https://picsum.photos/40?random=${i}`}
            alt={item.name}
            width={40}
            height={40}
          />
          <Text>{item.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{item.qty}</Table.Td>
      <Table.Td>${item.price}</Table.Td>
      <Table.Td>${item.total}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Grid>
      {/* LEFT SIDE - Wider */}
      <Grid.Col span={8}>
        <Stack>
          {/* Items Summary Table */}
          <Paper withBorder radius="md" p="md" shadow="sm">
            <Table >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item Summary</Table.Th>
                  <Table.Th>Qty</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Total Price</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{itemRows}</Table.Tbody>
            </Table>
          </Paper>

          {/* Customer & Order Details Table */}
          <Paper withBorder radius="md" p="md" shadow="sm">
            <Table  >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Customer Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Bag Option</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Note</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>{user.name}</Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>Eco Bag</Table.Td> {/* Prefilled value */}
                  <Table.Td>Delivery</Table.Td> {/* Prefilled value */}
                  <Table.Td>N/A</Table.Td> {/* Prefilled value */}
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Paper>
        </Stack>
      </Grid.Col>

      {/* RIGHT SIDE - Narrower */}
      <Grid.Col span={4}>
        <Stack>
          {/* Rider Details */}
          <Paper withBorder radius="md" p="md" shadow="sm">
            <Table >
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>
                    <Group justify="space-between">
                      <Text>Rider: {order.rider || 'N/A'}</Text>
                      <Button color="yellow" variant="filled">Track Rider</Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Paper>

          {/* Order Summary */}
          <Paper withBorder radius="md" p="md" shadow="sm">
            <Table >
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Created</Table.Td>
                  <Table.Td>{order.created_at}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Time</Table.Td>
                  <Table.Td>{order.time || 'N/A'}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Subtotal</Table.Td>
                  <Table.Td>${order.price}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Delivery Fee</Table.Td>
                  <Table.Td>${order.delivery_fee}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><b>Total</b></Table.Td>
                  <Table.Td><b>${order.total}</b></Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Paper>

          {/* Delivery Address */}
          <Paper withBorder radius="md" p="md" shadow="sm">
            <Table>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Address Line</Table.Td>
                  <Table.Td>{order.delivery_address}</Table.Td>
                </Table.Tr>
                {/* Add more address fields as needed */}
              </Table.Tbody>
            </Table>
          </Paper>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
