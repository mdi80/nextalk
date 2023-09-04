import { useEffect, useState } from 'react'
import { ToastAndroid, View } from "react-native"
import Text from "../../Text"
import useTheme from "../../../theme"
import colors from "../../../theme/colors"
import { Image } from "expo-image"
import typogrphy from "../../../theme/font"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { IUserState } from "../../../reducers/auth"
import { TouchableOpacity } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { LayoutAnimation } from 'react-native'
import { ImageSourcePropType } from 'react-native'
import { IUserInfo, updateUserLastActive } from '../../../db/service'
import { IAppState, changeAccount } from '../../../reducers/app'
import { drawerHeaderStyles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParams } from '../../../navigator/types'

const item_hight = 65


const ProfilesList = () => {


    const { allUsersInfo } = useSelector<RootState, IAppState>(state => state.app)
    const { firstname, lastname, phone } = useSelector<RootState, IUserState>(state => state.auth)
    const listLen = allUsersInfo ? allUsersInfo.length + 2 : 1
    const { colorScheme, } = useTheme()

    const [showProfiles, setShowProile] = useState(false)

    const toggleShowProfile = () => {
        if (showProfiles) {
            rotateDegOfShowProfiles.value = withTiming(0, { duration: 100, easing: Easing.linear })
            LayoutAnimation.configureNext({
                duration: 100,
                update: { type: 'easeOut', property: 'opacity' },
            });
            setShowProile(false)

        } else {
            rotateDegOfShowProfiles.value = withTiming(180, { duration: 100, easing: Easing.linear })
            LayoutAnimation.configureNext({
                duration: 100,
                update: { type: 'easeIn', property: 'opacity' },

            });
            setShowProile(true)
        }
    }

    const rotateDegOfShowProfiles = useSharedValue(0)

    const showBtnStlye = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotateDegOfShowProfiles.value}deg` }]
        }
    })

    return (
        <View style={{
            height: showProfiles ? listLen * item_hight : item_hight,
            ...drawerHeaderStyles(colorScheme).profileListContainer
        }}>
            <TouchableOpacity
                onPress={toggleShowProfile}
                activeOpacity={1}
                style={{
                    height: item_hight,
                    backgroundColor: colorScheme === "light" ? colors.primary : colors.dark.background,
                    ...drawerHeaderStyles(colorScheme).profileListHeaderItem
                }}>

                <View>
                    <Text style={drawerHeaderStyles(colorScheme).profileListHeaderItemText}>
                        {firstname} {lastname}
                    </Text>
                    <Text style={drawerHeaderStyles(colorScheme).profileListHeaderItemNumberText}>
                        {phone}
                    </Text>
                </View>
                <View>
                    <Animated.View style={[showBtnStlye]}>
                        <FontAwesome name="angle-down" color="white" size={25} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            {allUsersInfo?.map((user, index) => (
                <ProfileItem
                    active={user.lastactive}
                    key={index}
                    item_hight={item_hight}
                    imageUrl={require("../../../assets/1_main.jpg")}
                    userinfo={user}

                />
            ))}
            <AddAccountBtn />
        </View>


    )
}

interface ProfileItemProps {
    imageUrl: string | ImageSourcePropType | null | undefined
    userinfo: IUserInfo
    item_hight: number
    active: boolean
}

const ProfileItem = ({ imageUrl, userinfo, item_hight, active }: ProfileItemProps) => {

    const imageSize = 40


    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const { colorScheme, } = useTheme()

    const pressed = () => {
        dispatch(changeAccount({ phoneNumber: userinfo.phone })).then(res => {
            navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{ name: 'main' }],
            })
        }).catch(mes => {
            console.error(mes);
            ToastAndroid.show(mes, ToastAndroid.LONG)
        })
    }
    return (
        <TouchableOpacity
            onPress={pressed}
            activeOpacity={0.9}
            style={{
                ...drawerHeaderStyles(colorScheme).profileListItem,
                height: item_hight,
            }}>
            <View>

                <Image
                    source={imageUrl}
                    style={{
                        width: imageSize,
                        height: imageSize,
                        borderRadius: imageSize / 2
                    }} />


                {active &&
                    <FontAwesome
                        name='check-circle'
                        size={15}
                        color={colors.primary}
                        style={drawerHeaderStyles(colorScheme).profileListItemCheckIcon}
                    />
                }
            </View>
            <Text style={{ marginLeft: 20 }}>
                {userinfo.firstname} {userinfo.lastname}
            </Text>

        </TouchableOpacity>
    )
}


const AddAccountBtn = () => {
    const { colorText, colorScheme } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParams, 'home'>>()

    const pressed = () => {
        navigation.getParent()?.navigate("auth", { screen: "phone", params: { canBack: true } })
    }

    return (
        <TouchableOpacity
            onPress={pressed}
            activeOpacity={0.8}
            style={{
                ...drawerHeaderStyles(colorScheme).addAccountBtn,
                height: item_hight,
            }}>
            <AntDesign name="plus" color={colorText} size={25} />
            <Text style={{ marginLeft: 20, }}>
                Add Account
            </Text>
        </TouchableOpacity>

    )
}

export default ProfilesList