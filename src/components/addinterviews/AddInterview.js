import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Input,
  Box,
  Button,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import {
  addInterview,
  updateInterview,
  updateIndex,
} from '../../redux/action/actions';

function AddInterview({ interviews }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.item.currentIndex);
  const editInterview = useSelector((state) => state.item.interviews);
  const popup = useToast();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [update, setUpdate] = useState('');

  const datetime = new Date(`${date} ${time}`);

  useEffect(() => {
    if (currentIndex !== -1) {
      setName(editInterview[currentIndex].name);
      setDate(editInterview[currentIndex].date);
      setTime(editInterview[currentIndex].time);
      setEmail(editInterview[currentIndex].email);
      setContact(editInterview[currentIndex].contact);
      setUpdate(true);
      onOpen();
    }
  }, [currentIndex]);

  function closeDrawer() {
    onClose();
    dispatch(updateIndex(-1));
    setName('');
    setDate('');
    setTime('');
    setEmail('');
    setContact('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !date || !time || !email || !contact) {
      popup({
        title: 'No Content',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!validator.isEmail(email)) {
      popup({
        title: 'Invalid Email',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (datetime < Date.now()) {
      popup({
        title: 'Invalid Date',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    interviews.forEach((item) => {
      if (item.email === email) {
        popup({
          title: 'You have used the same email multiple times',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    });

    const interview = {
      name,
      date,
      time,
      email,
      contact,
      completed: false,
    };

    if (currentIndex === -1) {
      dispatch(addInterview(interview));
    } else {
      dispatch(updateInterview(interview));
    }

    setName('');
    setDate('');
    setTime('');
    setEmail('');
    setContact('');
    onClose();
  }

  // const yesterday = moment().subtract(1, 'day');
  // const disablePastDt = current => current.isAfter(yesterday);

  return (
    <div>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
        mb={10}
        outline="none"
      >
        Schedule Interview
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {update ? 'Update Interview' : 'Schedule Interview'}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  id="name"
                  placeholder="Candidate Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  type="date"
                  id="date"
                  placeholder="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="time">Time</FormLabel>
                <Input
                  type="time"
                  id="time"
                  placeholder="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="contact">Contact</FormLabel>
                <Input
                  type="tel"
                  id="contact"
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              outline="none"
              variant="outline"
              mr={3}
              onClick={closeDrawer}
            >
              Cancel
            </Button>
            <Button outline="none" colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default AddInterview;
