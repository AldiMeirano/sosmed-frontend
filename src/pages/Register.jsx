import { Container } from "@chakra-ui/react"
import CardRegister from "../Components/Register/CardRegister";

const Register = () => { 
    return ( 
        <Container maxW='7xl' mt={5} justifyContent='center' display='flex'>
        <CardRegister />
       </Container>
    )
}

export default Register;