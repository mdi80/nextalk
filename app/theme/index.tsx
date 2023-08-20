import { useColorScheme } from "react-native"
import colors from "./colors"


type useThemeReturnType = {
    colorText: string
    colorBackground: string
    colorScheme: "dark" | "light"
}

const useTheme = (): useThemeReturnType => {

    const colorScheme = (useColorScheme() === 'dark' ? 'dark' : 'light')

    const colorText = (colorScheme === 'dark' ? colors.dark.text : colors.light.text)
    const colorBackground = (colorScheme === 'dark' ? colors.dark.background : colors.light.background)


    return { colorText, colorBackground, colorScheme }
}


export default useTheme