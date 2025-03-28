import {
  Box,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Button,
  StackDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import React from 'react';
import {
  FaTrash,
  FaEdit,
  FaInfoCircle,
  FaCheckDouble,
  FaCheckCircle,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteInterview,
  updateIndex,
  completeInterview,
} from '../../redux/action/actions';

function ListInterviews({ item, index }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = React.useRef();

  function updateMode() {
    dispatch(updateIndex(index));
    dispatch(completeInterview(!item.completed));
    dispatch(updateIndex(-1));
  }

  return (
    <div>
      <Box
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        p={2}
        bgColor="blue.100"
        key={item.id}
      >
        <Text fontSize="xl" fontWeight="bold" color="blackAlpha.700">
          {item.name}
        </Text>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="s"
          textTransform="uppercase"
          pt={2}
          pb={7}
          pr={6}
        >
          {item.date} &bull; {item.time}
        </Box>
        <IconButton
          colorScheme={!item.completed ? 'green' : 'blue'}
          rounded="full"
          onClick={updateMode}
          cursor="pointer"
          margin={2}
          icon={!item.completed ? <FaCheckCircle /> : <FaCheckDouble />}
        />
        <Popover
          initialFocusRef={initialFocusRef}
          placement="bottom"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton
              icon={<FaTrash />}
              outline="none"
              margin={2}
              colorScheme="blackAlpha"
              isRound="true"
            />
          </PopoverTrigger>
          <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
            <PopoverHeader pt={4} fontWeight="bold" border="0">
              Confirmation
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              Are you sure you want to continue with your action?
            </PopoverBody>
            <PopoverFooter
              border="0"
              d="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
            >
              <Button colorScheme="blue" onClick={onOpen} size="sm">
                Review Details
              </Button>
              <Button
                colorScheme="blue"
                ref={initialFocusRef}
                onClick={() => dispatch(deleteInterview(index))}
                size="sm"
              >
                Delete
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
        <IconButton
          icon={<FaEdit />}
          outline="none"
          margin={2}
          colorScheme="blackAlpha"
          isRound="true"
          onClick={() => dispatch(updateIndex(index))}
        />
        <IconButton
          icon={<FaInfoCircle />}
          outline="none"
          margin={2}
          colorScheme="blackAlpha"
          isRound="true"
          onClick={onOpen}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Candidate Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <Box h="20px" fontSize="lg" fontWeight="bold">
                {item.name}
              </Box>
              <Box h="20px" fontSize="lg" fontWeight="bold">
                {item.date}
              </Box>
              <Box h="20px" fontSize="lg" fontWeight="bold">
                {item.time}
              </Box>
              <Box h="20px" fontSize="lg" fontWeight="bold">
                {item.email}
              </Box>
              <Box h="20px" fontSize="lg" fontWeight="bold">
                {item.contact}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

ListInterviews.propTypes = {
  item: PropTypes.instanceOf(Array).isRequired,
  index: PropTypes.number.isRequired,
};

export default ListInterviews;
