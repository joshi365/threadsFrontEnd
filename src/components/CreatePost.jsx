import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, Textarea, Text, Input, Image, CloseButton } from '@chakra-ui/react'
import useCreatePost from './useCreatePost'
import { BsFillImageFill } from 'react-icons/bs';
import useUploadImage from '../helpers/useUploadImage';
import { useParams } from 'react-router-dom';

const CreatePost = () => {

    const { isOpen, onOpen, onClose, handleTextChange, postText, imageRef, handleCreatePost, remainingChar, MAX_CHAR, loading, loggedInUserDetails } = useCreatePost()
    const { handleImageChange, imageUrl, setImageUrl } = useUploadImage()


    const { username } = useParams()

    return (
        <>{
            loggedInUserDetails.username === username && (
                <Button
                    position={"fixed"}
                    bottom={10}
                    right={10}
                    leftIcon={<AddIcon />}
                    onClick={onOpen}
                >
                    Post
                </Button>
            )
        }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea placeholder='Text goes here' onChange={(e) => handleTextChange(e)} value={postText} />
                            <Text fontSize="xs" fontWeight="bold" textAlign="right" m="1" color={"gray.800"}>
                                {remainingChar}/{MAX_CHAR}
                            </Text>
                            <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />
                            <BsFillImageFill style={{ marginLeft: "5px", cursor: "pointer" }} size={16} onClick={() => imageRef?.current?.click()} />
                        </FormControl>
                        {imageUrl && (
                            <Flex mt={5} w={"full"} position={"relative"}>
                                <Image src={imageUrl} alt='selected-img' />
                                <CloseButton onClick={() => {
                                    setImageUrl("")
                                }} />
                            </Flex>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={loading} onClick={() => handleCreatePost(imageUrl)} variant='ghost'>Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost