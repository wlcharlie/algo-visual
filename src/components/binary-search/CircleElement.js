import { useCallback } from "react"
import { useSpring, animated } from "react-spring"
import { Circle, Tag, useTheme, VStack } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

const ELE_AREA_ARGUS = 12

const AnimatedCircle = animated(Circle)

export default function CircleElement({ element }) {
  const { colors } = useTheme()

  const colorControl = useCallback(
    ele => (ele.isAlive ? (ele.isActive ? colors.red[400] : colors.green[500]) : colors.gray[200]),
    // eslint-disable-next-line
    []
  )

  const scaleSpring = useSpring({
    transform: `scale(${element.isActive ? 1.2 : 1})`,
  })
  const bgSpring = useSpring({
    backgroundColor: colorControl(element),
  })

  return (
    <VStack position="relative" ref={element.ref}>
      <AnimatedCircle
        style={{ ...scaleSpring, ...bgSpring }}
        width={ELE_AREA_ARGUS}
        height={ELE_AREA_ARGUS}
        color="white"
        fontWeight="bolder"
      >
        {element.value}
      </AnimatedCircle>

      <VStack position="absolute" bottom={-(ELE_AREA_ARGUS / 2) - 4 - 2} spacing={1}>
        {element.isTarget && (
          <Tag colorScheme="red">
            <StarIcon />
          </Tag>
        )}
        {element.isMiddle && <Tag colorScheme="cyan">MID</Tag>}

        {!element.isMiddle && !element.isTarget && (
          <>
            {element.isHead && <Tag colorScheme="orange">L</Tag>}
            {element.isTail && <Tag colorScheme="orange">R</Tag>}
          </>
        )}
      </VStack>
    </VStack>
  )
}
