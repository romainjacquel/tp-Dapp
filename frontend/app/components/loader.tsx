import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex p='2rem' justifyContent='center' alignItems='center'>
      <Spinner size='xl' />
    </Flex>
  );
};
export default Loader;
