import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { Link } from '@inertiajs/react';

export default function Welcome() {
  return (
    <Container size="md" py="xl" style={{ textAlign: 'center' }}>
      <Stack spacing="xl" align="center">
        <Title order={1} fw={700}>
          Welcome to <span style={{ color: '#C2185B' }}>BringOver</span>
        </Title>

        <Text size="lg" c="dimmed">
          Your smart order management system designed to streamline your workflow.
        </Text>

        <Group mt="md">
          <Button component={Link} href={route('login')} color="pink" size="md" radius="xl">
            Log In
          </Button>
          <Button component={Link} href={route('register')} variant="outline" color="pink" size="md" radius="xl">
            Register
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
