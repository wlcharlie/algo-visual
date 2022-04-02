import { useState, useRef, createRef, useLayoutEffect } from "react"
import VariableSection from "components/linear-search/VariableSection"
import CircleElement from "components/linear-search/CircleElement"
import Pointer from "components/linear-search/Pointer"
import { Flex, Button } from "@chakra-ui/react"

function initElementsArray(length = 7, target = 5) {
  return Array.from({ length }).map((_, i) => ({
    isActive: false, // to control ele is :active or not
    isAlive: true, // to control ele is in range or not
    isTarget: i + 1 === target, // to control ele is target or not
    isHead: i === 0, // to control ele is head or not
    isTail: i === length - 1, // to control ele is tail or not
    value: i + 1,
    ref: createRef(),
  }))
}

export default function LinearSearchPage() {
  const variabelRef = useRef()
  const arrowRef = useRef()
  const [isReady, setIsReady] = useState(false)
  const [elements, setElements] = useState(() => initElementsArray())
  const [arrowPosition, setArrowPosition] = useState({ x: 50, y: 50 })

  const SettingView = () => {
    const { getLength, getTarget } = variabelRef.current
    const length = getLength()
    const target = getTarget()

    setElements(initElementsArray(length, target))
  }

  const RunningProcess = () => {
    const { getTarget, getSpeedRate } = variabelRef.current
    const target = getTarget()
    const speedRate = getSpeedRate()

    const arrowHeight = arrowRef.current.offsetHeight

    for (let i = 0; i < elements.length; i++) {
      const ref = elements[i].ref
      const top = ref.current.offsetTop
      const left = ref.current.offsetLeft
      const positionX = left
      const positionY = top - arrowHeight
      setTimeout(() => {
        setElements(prev =>
          prev.map((ele, eleIndex) => {
            if (eleIndex === i && target !== i + 1 && i === elements.length - 1) {
              return { ...ele, isActive: false, isAlive: false }
            }

            if (eleIndex === i) {
              return { ...ele, isActive: true }
            }

            if (eleIndex < i) {
              return { ...ele, isActive: false, isAlive: false }
            }

            return { ...ele, isActive: false }
          })
        )
        setArrowPosition({ x: positionX, y: positionY })

        if (i === elements.length - 1 || i + 1 === target) {
          setIsReady(false)
        }
      }, (1000 * i) / speedRate)

      if (target === i + 1) {
        break
      }
    }
  }

  const handleRun = () => {
    setIsReady(false)
    SettingView()
    setIsReady(true)
  }

  useLayoutEffect(() => {
    if (!isReady) return

    RunningProcess()

    // eslint-disable-next-line
  }, [isReady])

  return (
    <Flex width="100%" height="100%" p={2} direction="column" gap={5}>
      <VariableSection ref={variabelRef} />
      <Button colorScheme="blue" onClick={handleRun} disabled={isReady}>
        RUN
      </Button>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        height="600px"
        gap={3}
        position="relative"
        flexWrap="wrap"
        mt={10}
      >
        <Pointer position={arrowPosition} ref={arrowRef} />

        {elements.map(ele => (
          <CircleElement key={ele.value} element={ele} />
        ))}
      </Flex>
    </Flex>
  )
}
