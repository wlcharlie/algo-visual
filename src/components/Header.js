import { useNavigate, useLocation } from "react-router-dom"
import { Select, Stack, HStack } from "@chakra-ui/react"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <HStack width="100%" height="7vh" bg="teal.900" align="center" justify="flex-end" p={1}>
      <Stack width={40}>
        <Select
          bg="cyan.700"
          borderColor="cyan.700"
          color="white"
          sx={{ "& > option": { color: "black" } }}
          value={location.pathname}
          onChange={evt => navigate(evt.target.value)}
        >
          <option value="/linear-search">Linear Search</option>
          <option value="/binary-search">Binary Search</option>
        </Select>
      </Stack>
    </HStack>
  )
}
