import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { Flex, Box, Text, Avatar, Button, AvatarBadge } from '@chakra-ui/react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const roomId = 'mainRoom';
    const roomRef = doc(db, 'rooms', roomId);

    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        setUsers(doc.data().users || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLeaveRoom = async () => {
    const user = auth.currentUser;
    if (user) {
      const roomId = 'mainRoom';
      const roomRef = doc(db, 'rooms', roomId);

      await updateDoc(roomRef, {
        users: arrayRemove({
          uid: user.uid,
          displayName: user.displayName || user.email,
          avatarURL: user.photoURL || '', // Use photoURL if available
        }),
      });

      await signOut(auth);
    }
  };

  return (
    <Box bg="gray.800" p={6} rounded="lg" shadow="lg" w="full" maxW="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="white">
        Users in the Room
      </Text>
      <Flex direction="column" spacing={4}>
        {users.map((user) => (
          <Flex key={user.uid} align="center" mb={2} p={3} bg="gray.700" rounded="md">
            <Avatar src={user.avatarURL || '/default-avatar.png'} name={user.displayName} mr={3}>
              {/* Green dot indicating active user */}
              <AvatarBadge boxSize="1.25em" bg="green.500" borderColor="gray.700" borderWidth="2px" />
            </Avatar>
            <Text color="white">{user.displayName || user.email}</Text>
          </Flex>
        ))}
      </Flex>
      <Link href="/login" passHref>
        <Button
          onClick={handleLeaveRoom}
          mt={4}
          bg="red.500"
          color="white"
          _hover={{ bg: 'red.600' }}
        >
          Leave Room
        </Button>
      </Link>
    </Box>
  );
};

export default UserList;

