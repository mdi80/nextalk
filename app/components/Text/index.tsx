import React from "react"
import { useColorScheme, Text as RNText, TextStyle } from "react-native"
import useTheme from "../../theme"
import typogrphy from "../../theme/font"


type TextProps = {
    style?: TextStyle
    childern?: React.ReactNode
}


const Text = ({ style, childern }: TextProps) => {
    const { colorText } = useTheme()

    return (
        <RNText
            style={{
                color: colorText,
                fontFamily: typogrphy.fontFamily,
                fontSize: typogrphy.fontSize.m,
                ...style
            }}>
            {childern}
        </RNText>
    )
}

export default Text