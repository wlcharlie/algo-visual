import { useState, useImperativeHandle, forwardRef } from "react"
import { Flex, NumberInput, NumberInputField, Tag, VStack } from "@chakra-ui/react"

const DEFAULT_LENGTH = 7
const DEFAULT_TARGET = 5
const DEFAULT_SPEED = 1

function VariableSection(props, ref) {
  const [length, setLength] = useState(DEFAULT_LENGTH)
  const [target, setTarget] = useState(DEFAULT_TARGET)
  const [speedRate, setSpeedRate] = useState(DEFAULT_SPEED)

  useImperativeHandle(ref, () => ({
    getLength: () => length,
    getTarget: () => target,
    getSpeedRate: () => speedRate,
  }))

  return (
    <Flex width="100%" justifyContent="center" gap={2}>
      <VStack>
        <Tag>Length</Tag>
        <NumberInput variant="filled" value={length} onChange={value => setLength(+value)}>
          <NumberInputField placeholder="Length" />
        </NumberInput>
      </VStack>
      <VStack>
        <Tag>Target Element</Tag>
        <NumberInput variant="filled" value={target} onChange={value => setTarget(+value)}>
          <NumberInputField placeholder="Target Elements" />
        </NumberInput>
      </VStack>
      <VStack>
        <Tag>Speed Rate</Tag>
        <NumberInput
          variant="filled"
          value={speedRate}
          onChange={value => setSpeedRate(value)}
          step={0.01}
          precision={2}
        >
          <NumberInputField placeholder="Speed Rate" />
        </NumberInput>
      </VStack>
    </Flex>
  )
}

export default forwardRef(VariableSection)
