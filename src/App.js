import {
  Wrap,
  WrapItem,
  VStack,
  IconButton,
  useColorMode,
  TabPanel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
} from '@chakra-ui/react';
import { React } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AddInterview from './components/addinterviews/AddInterview';
import ListInterviews from './components/listinterviews/ListInterviews';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const interviews = useSelector((state) => state.item.interviews);

  return (
    <VStack p={4}>
      <IconButton
        outline="none"
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <AddInterview interviews={interviews} />
      <Tabs variant="soft-rounded" alignSelf="flex-start" pl={6}>
        <TabList spacing={10}>
          <Tab>All</Tab>
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Wrap spacing="30px" justify="center">
              {interviews.map((item, index) => {
                if (item.completed === false || item.completed === true) {
                  return (
                    <WrapItem>
                      <ListInterviews
                        item={item}
                        index={index}
                        interviews={interviews}
                      />
                    </WrapItem>
                  );
                }
                return [];
              })}
            </Wrap>
          </TabPanel>
          <TabPanel>
            <Wrap spacing="30px" justify="center">
              {interviews.map((item, index) => {
                if (item.completed === false) {
                  return (
                    <WrapItem>
                      <ListInterviews item={item} index={index} />
                    </WrapItem>
                  );
                }
                return [];
              })}
            </Wrap>
          </TabPanel>
          <TabPanel>
            <Wrap spacing="30px" justify="center">
              {interviews.map((item, index) => {
                if (item.completed === true) {
                  return (
                    <WrapItem>
                      <ListInterviews item={item} index={index} />
                    </WrapItem>
                  );
                }
                return [];
              })}
            </Wrap>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default App;
