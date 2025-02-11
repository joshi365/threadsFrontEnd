import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useHomePage from "./useHomePage";

const HomePage = () => {

    const { posts, loading } = useHomePage()

    return (
        <>
            {!loading && posts?.length === 0 && <h1>Follow some users to see the feed</h1>}
            {loading && (
                <Flex justify={"center"}>
                    <Spinner size="xl" />
                </Flex>
            )}
            {posts?.map((post) => (
                <Post key={post?._id} post={post} userName={post?.postedBy?.username} />
            ))}
        </>
    )
}

export default HomePage;