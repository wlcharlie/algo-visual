import { Routes, Route } from "react-router-dom"
import LinearSearchPage from "pages/linear-search"
import BinarySearchPage from "pages/binary-search"
import Header from "components/Header"

import { Box } from "@chakra-ui/react"

export default function Router() {
  return (
    <Box width="100vw" height="100vh">
      <Header />
      <Box width="100%" height="93vh">
        <Routes>
          <Route path="/linear-search" element={<LinearSearchPage />} />
          <Route path="/binary-search" element={<BinarySearchPage />} />
        </Routes>
      </Box>
    </Box>
  )
}
