'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { setAuthState } from '../redux/authSlice'
import axiosInstance from '../assets/axiosConfig'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  let toast = useToast()

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  const handleSignUp = async () => {
    axiosInstance.post("/api/users/signup", inputs).then((res) => {
      console.log(res, "resss")
    }).catch((err) => {
      console.log(err,"errr")
      toast({
        title:"Error",
        description:err.response.data.message,
        status:"error",
        duration:3000,
        isClosable:true
      })
    })
  }


  return (
    <Flex
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input onChange={(e) => setInputs({ ...inputs, name: e.target.value })} value={inputs.name} type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input onChange={(e) => setInputs({ ...inputs, username: e.target.value })} value={inputs.username} type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input onChange={(e) => setInputs({ ...inputs, email: e.target.value })} value={inputs.email} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input onChange={(e) => setInputs({ ...inputs, password: e.target.value })} value={inputs.password} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                onClick={handleSignUp}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800")
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={() => dispatch(setAuthState("login"))} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}