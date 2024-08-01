"use client"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
  Avatar,
  AvatarBadge,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

const UserProfileEdit = () => {
  const [displayName, setDisplayName] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || '');
          setAvatarURL(data.avatarURL || '');
        }
      }
    };

    fetchProfileData();
  }, [auth.currentUser, db]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarURL(reader.result); // Preview image
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    }
    return avatarURL;
  };

  const handleSave = async () => {
    setLoading(true); // Start loading
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const avatarUrl = await handleUpload(); // Upload avatar and get URL

      // Update user profile
      await setDoc(userRef, {
        displayName,
        avatarURL: avatarUrl, // Update with the avatar URL
      });

      // Add user to the mainRoom document
      const roomRef = doc(db, 'rooms', 'mainRoom');
      await updateDoc(roomRef, {
        users: arrayUnion({
          uid: auth.currentUser.uid,
          displayName,
          avatarURL: avatarUrl,
        }),
      });

      setLoading(false); // End loading
      router.push('/dashboard'); // Redirect to the main room or wherever you need
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.900', 'gray.900')} // Dark background for theme
    >
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.700"
          size="xl"
          color="purple.400"
        />
      ) : (
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('gray.800', 'gray.800')} // Darker card background
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} color="white">
            User Profile Edit
          </Heading>
          <FormControl id="userIcon">
            <FormLabel color="gray.400">User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={avatarURL || '/default-avatar.png'}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  display="none"
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload">
                  <Button
                    w="full"
                    colorScheme="purple"
                    variant="outline"
                    as="span" // Ensures label click triggers file input
                  >
                    Change Icon
                  </Button>
                </label>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="displayName" isRequired>
            <FormLabel color="gray.400">Display Name</FormLabel>
            <Input
              placeholder="Display Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              color="white"
              borderColor="gray.600"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'purple.400'}
              color={'white'}
              w="full"
              _hover={{ bg: 'purple.500' }}
              onClick={() => router.push('/login')}
            >
              Go Back
            </Button>
            <Button
              bg={'purple.600'}
              color={'white'}
              w="full"
              _hover={{ bg: 'purple.700' }}
              onClick={handleSave}
            >
              Join Room
            </Button>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
};

export default UserProfileEdit;
