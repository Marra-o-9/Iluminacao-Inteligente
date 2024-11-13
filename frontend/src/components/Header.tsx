// frontend/src/components/Header.tsx
import React from 'react';
import { Box, Text } from 'native-base';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box bg="primary.500" p={4} alignItems="center">
      <Text color="white" fontSize="xl" fontWeight="bold">
        {title}
      </Text>
    </Box>
  );
};

export default Header;