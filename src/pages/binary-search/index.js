import { useState, useRef, createRef, useLayoutEffect } from "react"
import VariableSection from "components/binary-search/VariableSection"
import CircleElement from "components/binary-search/CircleElement"
import { Flex, Button, HStack, useDisclosure } from "@chakra-ui/react"
import LogSetSection from "components/binary-search/LogSetSection"

function initElementsArray(length = 10, target = 7) {
  return Array.from({ length }).map((_, i) => ({
    isAlive: true, // to control ele is in range or not
    isTarget: i + 1 === target, // to control ele is target or not
    isHead: i === 0, // to control ele is head or not
    isTail: i === length - 1, // to control ele is tail or not
    isMiddle: i + 1 === Math.floor(length / 2),
    value: i + 1,
    ref: createRef(),
  }))
}

export default function BinarySearchPage() {
  const { isOpen, onToggle } = useDisclosure()
  const variabelRef = useRef()
  const [isReady, setIsReady] = useState(false)
  const [elements, setElements] = useState(() => initElementsArray())
  const [logSet, setLogSet] = useState([])

  const SettingView = () => {
    const { getLength, getTarget } = variabelRef.current
    const length = getLength()
    const target = getTarget()

    setElements(initElementsArray(length, target))
    setLogSet([{ left: 1, right: length, middle: Math.floor((length + 1) / 2), value: target }])
  }

  const RunningProcess = async () => {
    const { getTarget, getSpeedRate } = variabelRef.current
    const target = getTarget()
    const speedRate = getSpeedRate()

    const set = []
    let left = 1
    let right = elements.length
    let middle = Math.floor((right + left) / 2)

    for (let i = 0; left <= right; i++) {
      console.log(left, middle, right, "target:", target)

      if (target < middle) {
        right = middle - 1
      }

      if (target > middle) {
        left = middle + 1
      }

      middle = Math.floor((right + left) / 2)
      set.push({ left, middle, right, target })

      setTimeout(() => {
        setElements(prev =>
          prev.map(item => ({
            ...item,
            isHead: item.value === set[i].left,
            isMiddle: item.value === set[i].middle,
            isTail: item.value === set[i].right,
            isAlive: item.value >= set[i].left && item.value <= set[i].right,
          }))
        )
        if (i === set.length - 1) {
          setIsReady(false)
        }
      }, (i === 0 ? 1000 : 1000 * (i + 1)) / speedRate)

      if (target === middle) {
        setLogSet(prev => [...prev, ...set])
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
      <HStack>
        <Button colorScheme="green" disabled={logSet.length === 0} onClick={onToggle}>
          SHOW LOG
        </Button>
        <Button colorScheme="blue" onClick={handleRun} disabled={isReady} flexGrow="1">
          RUN
        </Button>
      </HStack>
      <LogSetSection data={logSet} isOpen={isOpen} />
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        height="600px"
        gap={3}
        position="relative"
        flexWrap="wrap"
      >
        {elements.map(ele => (
          <CircleElement key={ele.value} element={ele} />
        ))}
      </Flex>
    </Flex>
  )
}
