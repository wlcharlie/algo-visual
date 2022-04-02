import { useState, useImperativeHandle, forwardRef } from "react"
import { Flex, NumberInput, NumberInputField } from "@chakra-ui/react"

function VariableSection(props, ref) {
  return (
    <Flex width="100%" justifyContent="center" gap={2}>
      <NumberInput variant="filled">
        <NumberInputField placeholder="元素長度" />
      </NumberInput>
      <NumberInput variant="filled">
        <NumberInputField placeholder="目標元素" />
      </NumberInput>
    </Flex>
  )
}

export default forwardRef(VariableSection)
