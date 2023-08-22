import React from "react"
import { TextInput as RNTextInput, TextInputProps } from "react-native"
import useTheme from "../../theme"
import typogrphy from "../../theme/font"
import colors from "../../theme/colors"


interface props extends TextInputProps {
    isFouced?: boolean
}


const TextInput = (props: props) => {
    const { colorText, colorBackground, colorScheme } = useTheme()
    const background = colorScheme === "light" ? "#FFFFFF" : ""
    return (
        <RNTextInput
            cursorColor={colorText}
            placeholderTextColor="#aaaaaa"
            {...props}
            style={[{
                borderBottomColor: colors.primary,
                borderBottomWidth: props.isFouced ? 2 : 1,
                color: colorText,
                fontFamily: typogrphy.fontFamily,
                fontSize: typogrphy.fontSize.m,
                paddingTop: 0,
                paddingBottom: 5,
                paddingHorizontal: 10,
            }, props.style]}
        />
    )
}

export default TextInput