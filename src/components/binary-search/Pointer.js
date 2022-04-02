import { forwardRef } from "react"

import { Circle, Icon } from "@chakra-ui/react"
import { ArrowDownIcon } from "@chakra-ui/icons"

const ELE_AREA_ARGUS = 12

const Pointer = ({ position }, ref) => {
  return (
    <Circle
      ref={ref}
      w={ELE_AREA_ARGUS}
      h={ELE_AREA_ARGUS}
      position="absolute"
      left={position.x}
      top={position.y}
      transition="all 0.5s"
    >
      <Icon as={ArrowDownIcon} sx={{ width: "100%", height: "100%" }} />
    </Circle>
  )
}

export default forwardRef(Pointer)
