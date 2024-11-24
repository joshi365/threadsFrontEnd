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
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { setAuthState } from '../redux/authSlice'

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  return (
    <Flex
      align={'center'}
      justify={'center'}
  >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Log In
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
          w={{
            base:"full",
            sm:"400px"
          }}
>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
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
                bg={useColorModeValue("gray.600","gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700","gray.800")
                }}>
                Login
              </Button>
              <Stack pt={6}>
              <Text align={'center'}>
                Don't have an acoount? <Link onClick={()=> {dispatch(setAuthState("signup"))}} color={'blue.400'}>Sign Up</Link>
              </Text>
            </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}