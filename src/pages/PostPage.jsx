import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Actions from "../components/Actions";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsThreeDots } from "react-icons/bs";
import Comment from "../components/Comment"
import { formatDistanceToNow } from "date-fns";
import usePostPage from "./usePostPage";



const PostPage = () => {

  const { currentPost, loading, currentUser, handleDeletePost, user } = usePostPage()

  if (!user && loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    )
  }

  if (!currentPost) return null;

  return (

    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user?.profilepic} size={"md"} name='Mark Zuckerberg' />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user?.username}
            </Text>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          <BsThreeDots />
          {
            currentUser?._id === user?._id
            &&
            <DeleteIcon onClick={() => handleDeletePost()} size={20} cursor={"pointer"}
            />
          }
        </Flex>
      </Flex>

      <Text my={3}>{currentPost?.text}</Text>

      {currentPost?.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
          <Image src={currentPost?.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      {currentPost?.replies?.map((reply) => (
        <Comment
          reply={reply}
          key={reply._id}
        />
      ))}
    </>
  );
};

export default PostPage;
