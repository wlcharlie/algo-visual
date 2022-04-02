import { Routes, Route } from "react-router-dom"
import LinearSearchPage from "pages/linear-search"
import BinarySearchPage from "pages/binary-search"
import Header from "components/Header"

import { Box, Tag, Tooltip } from "@chakra-ui/react"

export default function Router() {
  return (
    <Box width="100vw" height="100vh" position="relative">
      <Header />
      <Box width="100%" height="93vh">
        <Routes>
          <Route path="/linear-search" element={<LinearSearchPage />} />
          <Route path="/binary-search" element={<BinarySearchPage />} />
        </Routes>
      </Box>
      <Tooltip label="Submit a issue for me!">
        <Tag
          position="fixed"
          left={5}
          bottom={5}
          size="md"
          as="a"
          href="https://github.com/wlcharlie/algo-visual"
          target="_blank"
          rel="noopener noreferrer"
        >
          Found Bug?
        </Tag>
      </Tooltip>
    </Box>
  )
}
