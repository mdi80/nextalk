import React from "react"
import { SafeAreaView, StatusBar, ViewStyle } from "react-native"
import useTheme from "../theme"


type StatusBarPropsType = {
    translucent?: boolean
    forcelight?: boolean
}


export const AppStatusBar: React.FC<StatusBarPropsType> = ({ translucent, forcelight }) => {
    const { colorScheme } = useTheme()

    return (
        <StatusBar
            backgroundColor="transparent"
            barStyle={forcelight ?
                "light-content"
                :
                colorScheme === 'dark' ?
                    "light-content"
                    :
                    "dark-content"
            }
            translucent={translucent} />
    )
}
type HideStatusBarProps = {}

export const HideStatusBar: React.FC<HideStatusBarProps> = ({ }) => {

    return (
        <StatusBar
            hidden
            translucent />
    )
}


