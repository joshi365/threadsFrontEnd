import {
	Flex,
	Box,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	Input,
	ModalFooter,
	Button
} from "@chakra-ui/react";
import useAction from "./useActions";

const Actions = ({ post }) => {
	const { liked, handleLikeAndUnlike, isOpen, onClose, onOpen, setReply, handleReply, isReplying } = useAction(post);
	const LikeSvg = () => {
		return (
			<svg
				aria-label='Like'
				color={liked ? "rgb(237, 73, 86)" : ""}
				fill={liked ? "rgb(237, 73, 86)" : "transparent"}
				height='19'
				role='img'
				viewBox='0 0 24 22'
				width='20'
				onClick={handleLikeAndUnlike}
			>
				<path
					d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
					stroke='currentColor'
					strokeWidth='2'
				></path>
			</svg>
		)
	}

	const CommentSvg = () => {
		return (
			<svg
				aria-label='Comment'
				color=''
				fill=''
				height='20'
				role='img'
				viewBox='0 0 24 24'
				width='20'
				onClick={onOpen}
			>
				<title>Comment</title>
				<path
					d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
					fill='none'
					stroke='currentColor'
					strokeLinejoin='round'
					strokeWidth='2'
				></path>
			</svg>
		)
	}


	const ShareSVG = () => {
		return (
			<svg
				aria-label='Share'
				color=''
				fill='rgb(243, 245, 247)'
				height='20'
				role='img'
				viewBox='0 0 24 24'
				width='20'
			>
				<title>Share</title>
				<line
					fill='none'
					stroke='currentColor'
					strokeLinejoin='round'
					strokeWidth='2'
					x1='22'
					x2='9.218'
					y1='3'
					y2='10.083'
				></line>
				<polygon
					fill='none'
					points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
					stroke='currentColor'
					strokeLinejoin='round'
					strokeWidth='2'
				></polygon>
			</svg>
		);
	};

	const ShowLikesAndCommentNumber = () => {
		return (
			<Flex gap={2} alignItems={"center"}>
				<Text color={"gray.light"} fontSize='sm'>
					{post?.likes?.length} likes
				</Text>
				<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
				<Text color={"gray.light"} fontSize='sm'>
					{post?.replies?.length} replies
				</Text>
			</Flex>)
	}




	return (
		<Flex flexDirection='column'>
			<Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
				<LikeSvg />
				<CommentSvg />
				<ShareSVG />
			</Flex>
			<ShowLikesAndCommentNumber />
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Input onChange={(e) => setReply(e.target.value)} placeholder='Reply goes here....' />
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button isLoading={isReplying} onClick={handleReply} size={"sm"} colorScheme='blue' mr={3}>
							Reply
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default Actions;
