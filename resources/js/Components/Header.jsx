import { AppShell, Burger, Group, Autocomplete } from '@mantine/core';
import { IconSearch, IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderSearch.module.css';
import { FaCircle } from "react-icons/fa";
import { VscBellDot } from "react-icons/vsc";
import { Avatar, Menu, Text, UnstyledButton } from '@mantine/core';
import { Link, usePage } from '@inertiajs/react';

const links = [
  { link: '/about', label: 'Open for order', icon: <FaCircle size={12} color="green" /> },
];

export default function Header({ toggle, opened, onSearch, products }) {
  const user = usePage().props.auth.user;

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {link.icon}
        {link.label}
      </span>
    </a>
  ));

  return (
    <AppShell.Header>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
            <Text style={{ color: '#C2185B', fontWeight: 600 }}>bringover</Text>
          </Group>
          <Group>
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              leftSection={<IconSearch size={16} stroke={1.5} />}
              data={products.map((p) => p.title)} // show real product names as suggestions
              onChange={onSearch} // use the event handler here
              visibleFrom="xs"
            />
          </Group>
          <Group>
            <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
              {items}
              <Menu width={200} shadow="md">
                <Menu.Target>
                  <UnstyledButton>
                    <Group spacing="xs">
                      <VscBellDot size={16} />
                      <Avatar radius="xl" size="sm" src="https://placehold.co/32x32" />
                      <Text size="sm">{user.name}</Text>
                      <IconChevronDown size={16} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Link href={route('profile.edit')}>Profile</Link>
                  </Menu.Item>
                  <Menu.Item color="red">
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                    >
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </div>
      </header>
    </AppShell.Header>
  );
}
