import { Collapse, Stack, Tag } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

export default function LogSetSection({ data, isOpen }) {
  return (
    <Collapse in={isOpen}>
      <Stack px={2}>
        {data.map((item, index) => (
          <Stack spacing={3} direction="row" justify="flex-start">
            <Tag>{index}</Tag>
            <Tag colorScheme="red">
              <StarIcon mr={1} /> Target: {item.target}
            </Tag>
            <Tag colorScheme="orange">Left : {item.left}</Tag>

            <Tag colorScheme="cyan">MID : {item.middle}</Tag>
            <Tag colorScheme="orange">Right: {item.right}</Tag>
          </Stack>
        ))}
      </Stack>
    </Collapse>
  )
}
