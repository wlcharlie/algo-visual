import { useState, useRef, useEffect, createRef } from "react"
import VariableSection from "components/binary-search/VariableSection"
import { Flex, Circle, VStack, Icon } from "@chakra-ui/react"
import { FaArrowDown } from "react-icons/fa"

const dummyData = [1, 2, 3, 4, 5]

export default function BinarySearchPage() {
  const variabelRef = useRef()
  const arrowRef = useRef()
  const [elementsRefs, setElementsRefs] = useState([])
  const [arrowPosition, setArrowPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    setElementsRefs((prev) =>
      Array.from({ length: dummyData.length }).map(() => createRef())
    )
  }, [])

  return (
    <Flex width="100%" height="100%" p={2} direction="column" gap={5}>
      <VariableSection ref={variabelRef} />
      <button
        onClick={() => {
          console.log(arrowRef)
          const arrowHeight = arrowRef.current.offsetHeight
          const arrowWidth = arrowRef.current.offsetWidth
          console.log(arrowHeight, arrowWidth)
          for (let i = 0; i < dummyData.length; i++) {
            const ref = elementsRefs[i]
            const top = ref.current.offsetTop
            const left = ref.current.offsetLeft
            const height = ref.current.offsetHeight
            const width = ref.current.offsetWidth
            const positionX = left + width / 2
            const positionY = top + height / 2
            setTimeout(
              () => setArrowPosition({ x: positionX, y: positionY }),
              1000 * i
            )
          }
        }}
      >
        test
      </button>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        height="500px"
        gap={3}
        position="relative"
      >
        <Icon
          as={FaArrowDown}
          position="absolute"
          w={4}
          h={4}
          ref={arrowRef}
          left={arrowPosition.x}
          top={arrowPosition.y}
        />
        {dummyData.map((number, index) => (
          <VStack
            key={index}
            ref={elementsRefs[index]}
            onClick={() => console.log(elementsRefs[index])}
          >
            <Circle width="24px" height="24px" bg="gray.400" color="gray.500">
              {number}
            </Circle>
          </VStack>
        ))}
      </Flex>
    </Flex>
  )
}
