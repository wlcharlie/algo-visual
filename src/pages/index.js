import { Routes, Route } from "react-router-dom"
import LinearSearchPage from "pages/linear-search"
import Header from "components/Header"

import { Box } from "@chakra-ui/react"

export default function Router() {
  return (
    <Box width="100vw" height="100vh">
      <Header />
      <Box width="100%" height="93vh">
        <Routes>
          <Route path="/linear-search" element={<LinearSearchPage />} />
        </Routes>
      </Box>
    </Box>
  )
}
