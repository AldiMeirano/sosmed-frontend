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
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/Url";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const validationSchema = yup.object().shape({
  username: yup.string().required("Username cannot be empty"),
  email: yup.string().required("Invalid Email"),
  password: yup.string().required("Password cannot be empty").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Password cannot be empty"),
});

const CardRegister = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios.post(baseUrl + "/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      }),
        navigate("/login");
    },
  });
  return (
    <Box w="400px" shadow="dark-lg" p={8}>
      <Text fontSize="28px" color="green.900" fontWeight="bold" mb={1}>
        Register
      </Text>
      <Text mb={8}>
        Sudah punya akun?
        <Text display="inline" color="blue">
          <Link to="/login">Masuk sekarang!</Link>
        </Text>
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={Boolean(formik.errors.username && formik.touched.username)}
        >
          <FormLabel>Username </FormLabel>
          <Input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Username"
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.errors.email && formik.touched.email)}
        >
          <FormLabel>Email </FormLabel>
          <Input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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

        <FormControl
          isInvalid={Boolean(
            formik.errors.confirmPassword && formik.touched.confirmPassword
          )}
        >
          <FormLabel>Confirm Password</FormLabel>

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showConfirm ? "text" : "password"}
              placeholder="Enter password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
        </FormControl>
        <Center mt={3}>
          <Button type="submit" colorScheme="green">
            Register
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default CardRegister;
