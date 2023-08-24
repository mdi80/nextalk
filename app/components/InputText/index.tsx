import React, { LegacyRef, MutableRefObject, Ref, RefObject, forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { TextInput as RNTextInput, TextInputProps } from "react-native"
import useTheme from "../../theme"
import typogrphy from "../../theme/font"
import colors from "../../theme/colors"


export interface props extends TextInputProps {
    isFouced?: boolean
}

export interface RefTextInput {
    focus: () => void
}


const TextInput = forwardRef((props: props, ref: Ref<RefTextInput>) => {
    const { colorText } = useTheme()
    const tnref = useRef<RNTextInput | null>(null)

    useImperativeHandle(ref, () => ({ focus }));
    function focus() {
        tnref.current?.focus()
    }
    return (
        <RNTextInput
            ref={tnref}
            cursorColor="#777"
            placeholderTextColor="#aaaaaa77"
            {...props}
            style={[{
                borderBottomColor: colors.primary,
                borderBottomWidth: props.isFouced ? 2 : 1,
                color: colorText,
                fontFamily: typogrphy.fontFamily,
                fontSize: typogrphy.fontSize.m,
                paddingVertical: 5,
                paddingHorizontal: 0,
            }, props.style]}
        />
    )
})

export default TextInput