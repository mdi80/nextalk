import React from "react"
import { SafeAreaView, ViewStyle } from "react-native"
import useTheme from "../../theme"


type ContainerProps = {
    style?: ViewStyle
    children?: React.ReactNode
}


const Container: React.FC<ContainerProps> = ({ style, children }) => {
    const { colorBackground } = useTheme()

    return (
        <SafeAreaView
            style={{
                backgroundColor: colorBackground,
                ...style
            }}>
            {children}
        </SafeAreaView>
    )
}

export default Container