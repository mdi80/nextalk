import React from "react"
import { useColorScheme, Text as RNText, TextStyle, TextProps } from "react-native"
import useTheme from "../../theme"
import typogrphy from "../../theme/font"


interface TextProp extends TextProps {
    style?: TextStyle
    children?: React.ReactNode
}


const Text = (props: TextProp) => {
    const { colorText } = useTheme()

    return (
        <RNText
            {...props}
            style={{
                color: colorText,
                fontFamily: typogrphy.fontFamily,
                fontSize: typogrphy.fontSize.m,
                ...props.style
            }}>
            {props.children}
        </RNText>
    )
}

export default Text