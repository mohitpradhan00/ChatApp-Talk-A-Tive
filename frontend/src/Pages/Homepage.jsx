import React,{useEffect} from "react";
import { Container, Box, Text, Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import Login from "../Component/Authentication/Login";
import Signup from "../Component/Authentication/Signup";
import { useNavigate } from "react-router-dom";


const Homepage = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (user) navigate("/chats");
    }, [navigate]);

  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans" color="black">
            Talk-a-tive
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px">
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab width="50%">Login</Tab>
              <Tab width="50%" >Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel> <Login/> </TabPanel>
              <TabPanel> <Signup/> </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
