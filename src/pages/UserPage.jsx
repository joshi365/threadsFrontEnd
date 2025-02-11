import UserHeader from "../components/UserHeader";
import useUserPage from "./useUserPage";
import { Spinner } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import Post from '../components/Post';
import { useSelector } from "react-redux";

const UserPage = () => {

  const { user, currentUser, copyUrl, following, followUnFollowUser, updating, loading } = useUserPage()

  const allPost = useSelector((state) => state?.profile?.posts)

  return (
    <>
      {
        !user && loading ?
          <Flex justifyContent={"center"}>
            <Spinner size="xl" />
          </Flex>
          :
          !user && !loading
            ? <h1>User not found</h1>
            :
            <>
              <UserHeader
                user={user}
                currentUser={currentUser}
                copyUrl={copyUrl}
                following={following}
                followUnFollowUser={followUnFollowUser}
                updating={updating}
              />
              {
                allPost?.map((post) => (
                  <Post key={post?._id} post={post} userName={post?.postedBy?.username} />
                ))
              }
            </>
      }
    </>
  )

}

export default UserPage