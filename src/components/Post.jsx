import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { formatDistanceToNow } from "date-fns"
import usePost from "./usePost";
import { DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from "react-redux";

const Post = ({ post, userName, navigateTOProfile }) => {

    const currentUser = useSelector((state) => state?.authDetails?.userDetails)

    const { user, handleDeletePost } = usePost(userName)

    return (
        <Link to={`/${userName}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar onClick={(e) => navigateTOProfile(e)} size='md' src={user?.profilepic} />
                    <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text onClick={(e) => navigateTOProfile(e)} fontSize={"sm"} fontWeight={"bold"}>
                                {post.postedBy.username}
                            </Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                                {formatDistanceToNow(new Date(post.createdAt))} ago
                            </Text>
                            {currentUser?._id === user?._id && (<DeleteIcon onClick={(e) => handleDeletePost(e, post)} size={20} />)}
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>
                    {
                        post.img && (
                            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                                <Image src={post.img} w={"full"} />
                            </Box>
                        )
                    }

                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>

                </Flex>
            </Flex>
        </Link>
    );
};

export default Post;
