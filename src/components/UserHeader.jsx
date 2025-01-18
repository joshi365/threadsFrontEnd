import { VStack, Box, Flex, Avatar, Text, Link, Menu, MenuButton, Portal, MenuList, MenuItem, useToast, Button } from "@chakra-ui/react"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { useSelector } from "react-redux"
import { Link as RouterLink} from 'react-router-dom';

const UserHeader = ({ user }) => {

    const toast = useToast()
    const currentUser = useSelector((state) => state?.authDetails?.user)

    const copyUrl = () => {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({
                title: 'Done',
                description: "Profile link copied.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user?.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user?.username}</Text>
                        <Text
                            fontSize={"xs"} bg={"gray.dark"} borderRadius={"full"} color={"gray.light"} p={1}>threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="Mark Chutiya Lund" src={user?.profilepic} size={{ base: "md", md: "xl" }}
                    />
                </Box>
            </Flex>
            <Text>{user?.bio}</Text>
            {
                currentUser?.username == user?.username && (
                    <RouterLink to="/update">
                        <Button size={"sm"}>Update Profile</Button>
                    </RouterLink>
                )
            }
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user?.following?.length} followers</Text>
                    <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"} >instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid fray"} justifyContent={"center"} pb="3" color={"gray.light"} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader