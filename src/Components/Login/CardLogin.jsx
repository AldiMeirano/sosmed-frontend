import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { baseUrl } from "../../utils/Url";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/userSlice";
YupPassword(yup);

const CardLogin = () => {
  const validationSchema = yup.object().shape({
    usernameOrEmail: yup.string().required("Username / Email Cannot be Empty"),
    password: yup.string().required("Password cannot be empty").min(6),
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { usernameOrEmail, password } = values;
        const { data } = await axios.post(baseUrl + "/users/login", {
          usernameOrEmail,
          password,
        });

        localStorage.setItem("rano_tweet", data.token);
        dispatch(loginAction(data.data));
        toast({
          title: "Login suksess",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/");
      } catch (error) {
        toast({
          title: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });
  return (
    <Box w="400px" shadow="dark-lg" p={8}>
      <Text fontSize="28px" color="green.900" fontWeight="bold" mb={1}>
        Login
      </Text>
      <Text mb={8}>
        Tidak Punya akun?
        <Text display="inline" color="blue">
          <Link to="/register">Daftar sekarang!</Link>
        </Text>
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={Boolean(
            formik.errors.usernameOrEmail && formik.touched.usernameOrEmail
          )}
        >
          <FormLabel>Username or Email</FormLabel>
          <Input
            type="text"
            name="usernameOrEmail"
            onChange={formik.handleChange}
            value={formik.values.usernameOrEmail}
            placeholder="Username Or Email"
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.usernameOrEmail}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.errors.password && formik.touched.password)}
        >
          <FormLabel>Password</FormLabel>

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Center mt={3}>
          <Button type="submit" colorScheme="green">
            Login
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default CardLogin;
