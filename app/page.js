import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/react'
import HeroSection from '@/components/HeroSection'
import StatsGridWithImage from '@/components/StatsFeature'
import WithSubnavigation from '@/components/HomeNav'

export default function Home() {
  return (
    <>
      <Head>
        <title>Stream Fiesta</title>
        <meta name="description" content="Welcome to Stream Fiesta" />
      </Head>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        bgGradient="linear(to-r, black, purple.800)"
        color="white"
        textAlign="center"
        overflow="hidden" // Prevents scrolling issues due to overflow
      >
        <Box flex="1" w="full"> {/* Ensure this container takes up the remaining space */}
          <WithSubnavigation/>
          <HeroSection/>
          {/* <StatsGridWithImage/> */}
        </Box>
      </Flex>
    </>
  )
}
