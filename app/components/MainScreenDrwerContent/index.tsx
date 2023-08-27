import { useEffect, useState } from 'react'
import { View } from "react-native"
import Text from "../Text"
import Container from "../screenContainer"
import styles from "./styles"
import useTheme from "../../theme"
import colors from "../../theme/colors"
import { Image } from "expo-image"
import { StatusBar } from "react-native"
import typogrphy from "../../theme/font"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { IUserState } from "../../reducers/auth"
import { TouchableOpacity } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { LayoutAnimation } from 'react-native'
import { ImageURISource } from 'react-native'
import { ImageSourcePropType } from 'react-native'
import { IUserInfo } from '../../db/service'
import { IAppState } from '../../reducers/app'
import DrawerHeader from './HeaderDrawer'

const DrawerContent = () => {
    const { colorScheme } = useTheme()

    return (
        <Container style={{ ...styles.container, backgroundColor: colorScheme === "light" ? colors.light.background : colors.dark.secondBacground }}>
            <DrawerHeader />
        </Container>
    )
}


export default DrawerContent