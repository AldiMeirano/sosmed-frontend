import { Container, Heading } from "@chakra-ui/react";
import CardLogin from '../Components/Login/CardLogin'
const Login = () => {
    return( 
       <Container maxW='7xl' mt={5} justifyContent='center' display='flex'>
        <CardLogin />
       </Container>
    )
}

export default Login;