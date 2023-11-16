import { Spinner } from '@chakra-ui/react'

const Loader = ({isLoading} : {isLoading: string}) => {
  return (
      <>
      {isLoading &&  <Spinner size='lg' /> }
      </>
  )
}

export default Loader